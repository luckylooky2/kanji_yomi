import {
  Controller,
  Post,
  Body,
  HttpCode,
  Param,
  InternalServerErrorException,
  Patch,
} from '@nestjs/common';
import {
  AnswerRequest,
  QuestionRequest,
  QuizStartRequest,
} from './quiz.request';
import { QuizService } from './quiz.service';
import logger from 'src/middleware/Logger';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/start')
  @HttpCode(200)
  async startQuiz(@Body() request: QuizStartRequest) {
    try {
      const quizDto = await this.quizService.startQuiz(request);
      const resBody = quizDto;
      logger.debug('Quiz:', { ...resBody });
      return resBody;
    } catch {
      throw new InternalServerErrorException('Failed to start quiz');
    }
  }

  @Patch('/finish/:id')
  @HttpCode(200)
  async finishQuiz(@Param('id') id: string) {
    if (!id) {
      throw new Error('Invalid ID');
    }

    try {
      const quizDto = await this.quizService.finishQuiz(id);
      const resBody = quizDto;
      logger.debug('Quiz/finish:', { ...resBody });
      return resBody;
    } catch (error) {
      const statusCode = error.getStatus();
      if (statusCode >= 400 && statusCode < 500) {
        throw error;
      }

      console.log(error);
      throw new InternalServerErrorException(
        'Failed to finish quiz', // 500
      );
    }
  }

  @Post('/question')
  @HttpCode(200)
  async getRandomQuestionByFilter(@Body() request: QuestionRequest) {
    try {
      const questionDto = await this.quizService.randomQuestion(request);
      const resBody = questionDto;
      logger.debug('Question:', { ...resBody });
      return resBody;
    } catch {
      throw new InternalServerErrorException('Failed to get question');
    }
  }

  @Post('/question/:id')
  @HttpCode(200)
  async getQuestion(@Param('id') id: string) {
    const questionId = parseInt(id, 10);
    if (isNaN(questionId)) {
      throw new Error('Invalid ID');
    }

    try {
      const questionDto = await this.quizService.getQuestionById(questionId);
      const resBody = questionDto;
      logger.debug('Question/:id:', { ...resBody });
      return resBody;
    } catch {
      throw new InternalServerErrorException('Failed to get question by ID');
    }
  }

  @Post('/answer')
  @HttpCode(200)
  async checkAnswer(@Body() request: AnswerRequest) {
    try {
      const answerDto = await this.quizService.findAnswer(request);
      const resBody = answerDto;
      logger.debug('Answer:', { ...resBody });
      return resBody;
    } catch {
      throw new InternalServerErrorException('Failed to check answer');
    }
  }
}
