import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import logger from 'src/middleware/Logger';
import { WordsService } from './words.service';
import { WordsQueryCountRequest, WordsQueryRequest } from './words.request';
import { handleClientError } from 'src/utils/utils';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  private validateAllowedParams(
    query: WordsQueryRequest,
    allowedParams: string[],
  ) {
    for (const key in query) {
      if (!allowedParams.includes(key)) {
        throw new BadRequestException(`Invalid query parameter: ${key}`);
      }
    }
  }

  @Get('/')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWordsByFilter(@Query() query: WordsQueryRequest) {
    const logPrefix = 'Words: ';

    const allowedParams = [
      'search',
      'difficulty',
      'correctRatio',
      'offset',
      'limit',
    ];
    this.validateAllowedParams(query, allowedParams);

    try {
      const wordsDto = await this.wordsService.searchWordsByFilter(query);
      const resBody = wordsDto;

      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to get words');
    }
  }

  @Get('/count')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWordsCountByFilter(@Query() query: WordsQueryCountRequest) {
    const logPrefix = 'Words/count: ';
    const allowedParams = ['search', 'difficulty', 'correctRatio'];
    this.validateAllowedParams(query, allowedParams);

    try {
      const wordsCountDto =
        await this.wordsService.searchWordsCountByFilter(query);
      const resBody = wordsCountDto;
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to get words count');
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async getWordById(@Param('id') id: string) {
    const logPrefix = 'Words/:id: ';
    const questionId = parseInt(id, 10);
    if (isNaN(questionId)) {
      throw new BadRequestException('Get Word: Invalid Param ID');
    }

    try {
      const questionDto = await this.wordsService.getWordById(questionId);
      const resBody = questionDto;
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to get word by ID');
    }
  }

}
