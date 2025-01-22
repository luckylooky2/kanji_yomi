import { Expose, Type } from 'class-transformer';
import { QuestionDTO } from './question.dto';

export class WordsQueryDto {
  @Expose()
  @Type(() => QuestionDTO)
  words: QuestionDTO[];

  @Expose()
  searchTotalCount: number;
}
