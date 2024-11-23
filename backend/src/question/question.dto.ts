import { Expose } from 'class-transformer';

export class QuestionDTO {
  @Expose()
  id: number;

  @Expose()
  word: string;

  @Expose()
  difficulty: string;
}

export class AnswerDTO {
  @Expose()
  id: number;

  @Expose()
  result: boolean;

  @Expose()
  meaning: string;
}
