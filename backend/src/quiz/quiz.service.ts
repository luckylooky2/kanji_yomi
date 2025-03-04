import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import {
  AnswerRequest,
  QuestionRequest,
  QuizStartRequest,
} from './quiz.request';
import {
  AnswerDTO,
  FinishDTO,
  MeaningDTO,
  QuestionDTO,
  StartDTO,
} from './quiz.dto';
import { Word } from '../entity/word.entity';
import { calculateCorrectRatio, compareNFCSafe } from 'src/utils/utils';
import { Quiz } from 'src/entity/quiz.entity';
import { QuizDifficulty } from 'src/entity/quizDifficulty.entitiy';
import { Meaning } from 'src/entity/meaning.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    @InjectRepository(Meaning) private meaningRepository: Repository<Meaning>,
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizDifficulty)
    private quizDifficultyRepository: Repository<QuizDifficulty>,
  ) {}

  private makeQuestionDTO(word: Word): QuestionDTO {
    const meanings: MeaningDTO[] = word.meanings.map((meaning) => ({
      meaning: meaning.meaning,
      difficulty: meaning.difficulty,
    }));

    return {
      id: word.id,
      word: word.word,
      meanings,
      correctRatio: calculateCorrectRatio(
        word.correctCount,
        word.incorrectCount,
      ),
    };
  }

  async startQuiz(request: QuizStartRequest): Promise<StartDTO> {
    // 1. Quiz 엔티티 생성
    const quiz = this.quizRepository.create({
      startTimestamp: new Date(),
      userId: request.userId,
      round: request.round,
    });

    // 2. Quiz 저장 (ID가 생성됨)
    await this.quizRepository.save(quiz);

    // 3. QuizDifficulty 엔티티 생성 및 저장
    const quizDifficulties = request.difficulty.map((level) => {
      return this.quizDifficultyRepository.create({
        difficulty: level,
        quiz: quiz, // Quiz와 연결
      });
    });

    await this.quizDifficultyRepository.save(quizDifficulties);

    // 4. 결과 반환
    return plainToInstance(
      StartDTO,
      { id: quiz.id },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async finishQuiz(id: string): Promise<FinishDTO> {
    const quiz = await this.quizRepository.findOne({ where: { id: id } });

    if (!quiz) {
      throw new NotFoundException('The requested quiz was not found');
    }

    if (quiz.endTimestamp) {
      throw new BadRequestException('The quiz has already ended');
    }

    quiz.endTimestamp = new Date();
    await this.quizRepository.save(quiz);

    return plainToInstance(
      FinishDTO,
      { endTimestamp: quiz.endTimestamp },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async randomQuestion(request: QuestionRequest): Promise<QuestionDTO> {
    if (request.difficulty.length === 0) {
      throw new BadRequestException('The value of fields should not be empty');
    }

    const randomDifficulty =
      request.difficulty[Math.floor(Math.random() * request.difficulty.length)];

    // word.id를 선택하면 TypeORM이 자동으로 word_id라는 별칭을 부여
    // DISTINCT를 사용하면 TypeORM이 자동으로 별칭을 붙이지 않고 원래 컬럼명(id) 그대로 반환
    const subQuery = this.meaningRepository
      .createQueryBuilder('meaning')
      .select('DISTINCT meaning.wordId AS id')
      .where('meaning.difficulty = :difficulty', {
        difficulty: randomDifficulty,
      });

    const mainQuery = this.wordRepository
      .createQueryBuilder('word')
      .innerJoinAndSelect('word.meanings', 'meaning')
      .innerJoin(
        `(${subQuery.getQuery()})`,
        'limited_words',
        'word.id = limited_words.id',
      )
      .setParameters(subQuery.getParameters());

    const words = await mainQuery.getMany();
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    if (!randomWord) {
      throw new Error('No matching meaning found');
    }

    const questionDAO = this.makeQuestionDTO(randomWord);

    return plainToInstance(QuestionDTO, questionDAO, {
      excludeExtraneousValues: true,
    });
  }

  async getQuestionById(questionId: number): Promise<QuestionDTO> {
    const wordById = await this.wordRepository
      .createQueryBuilder('word')
      .innerJoinAndSelect('word.meanings', 'meaning')
      .where('word.id = :id', { id: questionId })
      .getOne();

    if (!wordById) {
      throw new Error('No matching meaning found');
    }

    const questionDAO = this.makeQuestionDTO(wordById);

    return plainToInstance(QuestionDTO, questionDAO, {
      excludeExtraneousValues: true,
    });
  }

  async findAnswer(request: AnswerRequest): Promise<AnswerDTO> {
    if (!request.id || !request.word || !request.answer) {
      throw new BadRequestException('The value of fields should not be empty');
    }

    const targetWord = await this.wordRepository
      .createQueryBuilder('word')
      .innerJoinAndSelect('word.meanings', 'meaning')
      .where('word.id = :id', { id: request.id })
      .getOne();
    const meanings = targetWord.meanings;

    // 빈 배열이라면 잘못된 id
    if (meanings.length === 0) {
      throw new NotFoundException(
        'The requested word was not found in the database',
      );
    }
    if (!compareNFCSafe(request.word, targetWord.word)) {
      throw new BadRequestException(
        'The value of request word field is invalid',
      );
    }

    // 탁음이나 요음이 들어간 문자는 인코딩 또는 입력 방식의 차이로 NFC 정규화(조합하여 하나의 문자로 만듦)가 필요함
    const isCorrect = meanings.some((meaning) =>
      compareNFCSafe(meaning.meaning, request.answer),
    );

    const answerDAO = {
      id: targetWord.id,
      word: targetWord.word,
      result: isCorrect,
    };

    if (isCorrect) {
      targetWord.correctCount++;
    } else {
      targetWord.incorrectCount++;
    }

    await this.wordRepository.save(targetWord);

    return plainToInstance(AnswerDTO, answerDAO, {
      excludeExtraneousValues: true,
    });
  }
}
