import { Expose, Type } from 'class-transformer';
import { QuestionDTO } from '../quiz/quiz.dto';

export class WordsQueryDto {
  @Expose()
  @Type(() => QuestionDTO)
  words: QuestionDTO[];

  @Expose()
  count: number;
}

export class WordsQueryCountDTO {
  @Expose()
  totalCount: number;
}
