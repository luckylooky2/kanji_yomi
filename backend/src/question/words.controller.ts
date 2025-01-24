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
import { WordsQueryRequest } from './words.request';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  private validateAllowedParams(query: WordsQueryRequest) {
    const allowedParams = [
      'search',
      'difficulty',
      'correctRatio',
      'offset',
      'limit',
    ];

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
    this.validateAllowedParams(query);
    const wordsDto = await this.wordsService.searchWordsByFilter(query);
    const resBody = wordsDto || {};
    logger.debug('/words:', { ...resBody });
    return resBody;
  }

  @Get('/count')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWordsCountByFilter(@Query() query: WordsQueryRequest) {
    this.validateAllowedParams(query);

    const wordsCountDto =
      await this.wordsService.searchWordsCountByFilter(query);
    const resBody = wordsCountDto || {};
    logger.debug('/words/count:', { ...resBody });
    return resBody;
  }
}
