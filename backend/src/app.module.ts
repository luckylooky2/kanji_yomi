import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './question/word.entity';
import { Meaning } from './question/meaning.entity';
import { QuestionModule } from './question/question.module';
import { WordsModule } from './question/words.module';
import 'dotenv/config';

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
      entities: [Word, Meaning],
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuestionModule,
    WordsModule,
  ],
})
export class AppModule {}
