import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../entity/word.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { LoggerMiddleware } from '../middleware/LoggerMiddleware';
import { Quiz } from 'src/entity/quiz.entity';
import { QuizDifficulty } from 'src/entity/quizDifficulty.entity';
import { Meaning } from 'src/entity/meaning.entity';

// module.ts: 하나의 기능 단위 / 애플리케이션의 구성 요소를 정의하고 관리하는 핵심 역할
@Module({
  imports: [TypeOrmModule.forFeature([Word, Meaning, Quiz, QuizDifficulty])], // 다른 모듈을 가져와 연결(Word, Meaning 엔티티)
  exports: [TypeOrmModule], // 외부 모듈에서 사용할 수 있도록 내보내기
  providers: [QuizService], // 서비스나 프로바이더 등록
  controllers: [QuizController], // 컨트롤러 정의
})
export class QuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
