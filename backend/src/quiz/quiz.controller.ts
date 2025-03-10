import {
  Controller,
  Post,
  Body,
  HttpCode,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import {
  AnswerRequest,
  QuestionRequest,
  QuizStartRequest,
} from './quiz.request';
import { QuizService } from './quiz.service';
import logger from 'src/middleware/Logger';
import { handleClientError } from 'src/utils/utils';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/start')
  @HttpCode(200)
  async startQuiz(@Body() request: QuizStartRequest) {
    const logPrefix = 'Quiz/start: ';

    try {
      const quizDto = await this.quizService.startQuiz(request);
      const resBody = quizDto;
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to start quiz');
    }
  }

  @Patch('/finish/:id')
  @HttpCode(200)
  async finishQuiz(@Param('id') id: string) {
    const logPrefix = 'Quiz/finish: ';

    if (!id) {
      throw new BadRequestException('Finish Quiz: Invalid Param ID');
    }

    try {
      const quizDto = await this.quizService.finishQuiz(id);
      const resBody = quizDto;
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to finish quiz');
    }
  }

  @Post('/question')
  @HttpCode(200)
  async getRandomQuestionByFilter(@Body() request: QuestionRequest) {
    const logPrefix = 'Quiz/question: ';

    try {
      const questionDto = await this.quizService.randomQuestion(request);
      const resBody = questionDto;
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to get question');
    }
  }

  @Post('/answer')
  @HttpCode(200)
  async checkAnswer(@Body() request: AnswerRequest) {
    const logPrefix = 'Quiz/answer: ';

    try {
      const answerDto = await this.quizService.findAnswer(request);
      const resBody = answerDto;
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to check answer');
    }
  }
}
