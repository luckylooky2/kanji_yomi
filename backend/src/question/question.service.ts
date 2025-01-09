import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AnswerRequest, QuestionByFilterRequest } from './question.request';
import { AnswerDTO, QuestionDTO } from './question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async randomQuestion(request: QuestionByFilterRequest): Promise<QuestionDTO> {
    if (request.difficulty.length === 0) {
      throw new BadRequestException('The value of fields should not be empty');
    }

    const randomDifficulty =
      request.difficulty[Math.floor(Math.random() * request.difficulty.length)];

    const randomQuestionDAO = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.difficulty = :difficulty', {
        difficulty: randomDifficulty,
      })
      .orderBy('RAND()')
      .getOne();

    return plainToInstance(QuestionDTO, randomQuestionDAO, {
      excludeExtraneousValues: true,
    });
  }

  async findAnswer(request: AnswerRequest): Promise<AnswerDTO> {
    if (!request.word || !request.answer) {
      throw new BadRequestException('The value of fields should not be empty');
    }

    const answerDAO = await this.questionRepository.findOne({
      where: { word: request.word },
    });

    if (!answerDAO) {
      throw new NotFoundException(
        'The requested word was not found in the database',
      );
    }

    // 탁음이나 요음이 들어간 문자는 인코딩 또는 입력 방식의 차이로 NFC 정규화(조합하여 하나의 문자로 만듦)가 필요함
    const isCorrect =
      answerDAO.meaning.normalize('NFC') === request.answer.normalize('NFC');

    if (isCorrect) {
      answerDAO.correctCount++;
    } else {
      answerDAO.incorrectCount++;
    }

    await this.questionRepository.save(answerDAO);

    return plainToInstance(
      AnswerDTO,
      { ...answerDAO, result: isCorrect },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
