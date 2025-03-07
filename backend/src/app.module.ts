import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entity/word.entity';
import { Meaning } from './entity/meaning.entity';
import { QuizModule } from './quiz/quiz.module';
import { WordsModule } from './words/words.module';
import 'dotenv/config';
import { Quiz } from './entity/quiz.entity';
import { QuizDifficulty } from './entity/quizDifficulty.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Word, Meaning, Quiz, QuizDifficulty],
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuizModule,
    WordsModule,
  ],
})
export class AppModule {}
