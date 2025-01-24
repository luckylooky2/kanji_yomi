import { Expose, Type } from 'class-transformer';

export class QuestionDTO {
  @Expose()
  id: number;

  @Expose()
  word: string;

  @Expose()
  @Type(() => MeaningDTO)
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

export class MeaningDTO {
  @Expose()
  meaning: string;

  @Expose()
  difficulty: string;
}
