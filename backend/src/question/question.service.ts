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

    const isCorrect = answerDAO.meaning === request.answer;

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
