import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { Meaning } from './meaning.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { LoggerMiddleware } from '../middleware/LoggerMiddleware';

// module.ts: 하나의 기능 단위 / 애플리케이션의 구성 요소를 정의하고 관리하는 핵심 역할
@Module({
  imports: [TypeOrmModule.forFeature([Word, Meaning])], // 다른 모듈을 가져와 연결(Word, Meaning 엔티티)
  exports: [TypeOrmModule], // 외부 모듈에서 사용할 수 있도록 내보내기
  providers: [QuestionService], // 서비스나 프로바이더 등록
  controllers: [QuestionController], // 컨트롤러 정의
})
export class QuestionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
