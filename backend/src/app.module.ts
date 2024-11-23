import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { Question } from './question/question.entity';
import { QuestionModule } from './question/question.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Question, User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    QuestionModule,
  ],
})
export class AppModule {}
