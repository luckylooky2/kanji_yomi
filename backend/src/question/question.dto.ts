import { Expose, Transform } from 'class-transformer';

export class QuestionDTO {
  @Expose()
  id: number;

  @Expose()
  word: string;

  @Expose()
  difficulty: string;

  @Expose()
  @Transform(({ obj }) => {
    const totalAttempts = obj.correctCount + obj.incorrectCount;
    return totalAttempts > 0
      ? Math.round((obj.correctCount / totalAttempts) * 100)
      : 0;
  })
  correctRatio: number;
}

export class AnswerDTO {
  @Expose()
  id: number;

  @Expose()
  result: boolean;

  @Expose()
  meaning: string;
}
