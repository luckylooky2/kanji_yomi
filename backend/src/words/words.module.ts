import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../entity/word.entity';
import { LoggerMiddleware } from '../middleware/LoggerMiddleware';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { Meaning } from 'src/entity/meaning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, Meaning])],
  exports: [TypeOrmModule],
  providers: [WordsService],
  controllers: [WordsController],
})
export class WordsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
