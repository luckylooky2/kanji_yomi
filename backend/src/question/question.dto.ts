import { Expose } from 'class-transformer';
import { MeaningDTO } from './question';

export class QuestionDTO {
  @Expose()
  id: number;

  @Expose()
  word: string;

  @Expose()
  meanings: MeaningDTO[];

  @Expose()
  correctRatio: number;
}

export class AnswerDTO {
  @Expose()
  id: number;

  @Expose()
  word: string;

  @Expose()
  result: boolean;
}
