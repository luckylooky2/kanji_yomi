import {
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

  @Get('/')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWordsByFilter(@Query() query: WordsQueryRequest) {
    const wordsDto = await this.wordsService.searchWordsByFilter(query);
    const resBody = wordsDto || {};
    logger.debug('Words:', { ...resBody });
    return resBody;
  }
}
