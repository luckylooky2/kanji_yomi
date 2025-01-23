import { Injectable } from '@nestjs/common';
import { Word } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { WordsQueryDto } from './words.dto';
import { plainToInstance } from 'class-transformer';
import { WordsQueryRequest } from './words.request';
import { ratioCondition } from 'src/utils/utils';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
  ) {}

  async searchWordsByFilter(query: WordsQueryRequest): Promise<WordsQueryDto> {
    const subQuery = this.wordRepository
      .createQueryBuilder('word')
      .select('DISTINCT word.id') // word.id만 고유하게 선택
      .innerJoin('word.meanings', 'meaning')
      .where(
        new Brackets((qb) => {
          if (query.search) {
            const searchKeyword = `%${query.search.trim()}%`;
            qb.where(
              `CONVERT(word.word USING utf8mb4) LIKE CONVERT(:search USING utf8mb4) COLLATE utf8mb4_bin`,
              { search: searchKeyword },
            ).orWhere(
              `CONVERT(meaning.meaning USING utf8mb4) LIKE CONVERT(:search USING utf8mb4) COLLATE utf8mb4_bin`,
              { search: searchKeyword },
            );
          }
        }),
      )
      .andWhere(
        query.difficulty.length
          ? 'meaning.difficulty IN (:...difficulty)'
          : '1=1',
        { difficulty: query.difficulty },
      )
      .andWhere(
        query.correctRatio.length ? ratioCondition(query.correctRatio) : '1=1',
      )
      .offset(query.offset)
      .limit(query.limit);

    const mainQuery = this.wordRepository
      .createQueryBuilder('word')
      .innerJoinAndSelect('word.meanings', 'meaning')
      .innerJoin(
        `(${subQuery.getQuery()})`,
        'limited_words',
        'word.id = limited_words.id',
      )
      .addSelect(
        `
    CASE
    WHEN (word.correctCount + word.incorrectCount) = 0 THEN 0
    ELSE word.correctCount * 1.0 / (word.correctCount + word.incorrectCount)
    END`,
        'correctRatio',
      )
      .setParameters(subQuery.getParameters());

    const result = await mainQuery.getRawMany();
    const words = result.reduce((acc, row) => {
      let wordEntity = acc.find((e) => e.id === row.word_id);

      if (!wordEntity) {
        wordEntity = {
          id: row.word_id,
          word: row.word_word,
          correctCount: row.word_correctCount,
          incorrectCount: row.word_incorrectCount,
          meanings: [],
          correctRatio: parseFloat(row.correctRatio),
        };
        acc.push(wordEntity);
      }

      wordEntity.meanings.push({
        id: row.meaning_id,
        meaning: row.meaning_meaning,
        difficulty: row.meaning_difficulty,
        wordId: row.meaning_wordId,
      });

      return acc;
    }, []);

    return plainToInstance(
      WordsQueryDto,
      { words, searchTotalCount: words.length },
      { excludeExtraneousValues: true },
    );
  }
}
