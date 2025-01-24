import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { Meaning } from './meaning.entity';
import { LoggerMiddleware } from '../middleware/LoggerMiddleware';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';

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
