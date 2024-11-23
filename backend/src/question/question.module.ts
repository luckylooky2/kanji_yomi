import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { LoggerMiddleware } from '../middleware/LoggerMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  exports: [TypeOrmModule],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
