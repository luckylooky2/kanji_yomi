import {
  Controller,
  Post,
  Body,
  HttpCode,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { AnswerRequest, QuestionByFilterRequest } from './question.request';
import { QuestionService } from './question.service';
import logger from 'src/middleware/Logger';

@Controller('quiz')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/question')
  @HttpCode(200)
  async getRandomQuestionByFilter(@Body() request: QuestionByFilterRequest) {
    try {
      const questionDto = await this.questionService.randomQuestion(request);
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
      const questionDto =
        await this.questionService.getQuestionById(questionId);
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
      const answerDto = await this.questionService.findAnswer(request);
      const resBody = answerDto;
      logger.debug('Answer:', { ...resBody });
      return resBody;
    } catch {
      throw new InternalServerErrorException('Failed to check answer');
    }
  }
}
