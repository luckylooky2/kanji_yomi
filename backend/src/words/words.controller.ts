import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import logger from 'src/middleware/Logger';
import { WordsService } from './words.service';
import {
  WordsCreateRequest,
  WordsQueryCountRequest,
  WordsQueryRequest,
} from './words.request';
import { handleClientError } from 'src/utils/utils';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles';
import { RolesGuard } from 'src/auth/roles.guard';

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

  // 새로운 단어 추가
  @Post('/')
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createNewWord(@Body() query: WordsCreateRequest) {
    const logPrefix = 'New Words: ';

    try {
      const resBody = await this.wordsService.createNewWord(query);
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to create new word');
    }
  }

  // 단어 수정
  @Put('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editWord(@Param('id') id: string, @Body() query: WordsCreateRequest) {
    const logPrefix = 'Edit Words: ';
    const wordId = parseInt(id, 10);
    if (isNaN(wordId)) {
      throw new BadRequestException('Edit Word: Invalid Param ID');
    }

    try {
      const resBody = await this.wordsService.editWord(wordId, query);
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to edit word');
    }
  }

  // 단어 삭제
  @Delete('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteWord(@Param('id') id: string) {
    const logPrefix = 'Delete Words: ';
    const wordId = parseInt(id, 10);
    if (isNaN(wordId)) {
      throw new BadRequestException('Delete Word: Invalid Param ID');
    }

    try {
      const resBody = await this.wordsService.deleteWord(wordId);
      logger.debug(logPrefix, { ...resBody });
      return resBody;
    } catch (error) {
      logger.error(logPrefix, error);
      handleClientError(error, 'Failed to delete word');
    }
  }
}
