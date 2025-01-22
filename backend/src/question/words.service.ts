import { Injectable } from '@nestjs/common';
import { Word } from './word.entity';
import { Meaning } from './meaning.entity';
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
    @InjectRepository(Meaning) private meaningRepository: Repository<Meaning>,
  ) {}

  async searchWordsByFilter(query: WordsQueryRequest): Promise<WordsQueryDto> {
    const queryBuilder = this.wordRepository
      .createQueryBuilder('word')
      .innerJoinAndSelect('word.meanings', 'meaning')
      .select(['word.id', 'word.word', 'meaning.meaning', 'meaning.difficulty'])
      .addSelect(
        `
    CASE
    WHEN (word.correctCount + word.incorrectCount) = 0 THEN 0
    ELSE word.correctCount * 1.0 / (word.correctCount + word.incorrectCount)
    END`,
        'correctRatio',
      );

    // 문자열 검색
    if (query.search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(
            `CONVERT(word.word USING utf8mb4) LIKE CONVERT(:search USING utf8mb4) COLLATE utf8mb4_bin`,
            { search: `%${query.search}%` },
          ).orWhere(
            `CONVERT(meaning.meaning USING utf8mb4) LIKE CONVERT(:search USING utf8mb4) COLLATE utf8mb4_bin`,
            { search: `%${query.search}%` },
          );
        }),
      );
    }

    // 난이도 필터
    if (query.difficulty.length) {
      queryBuilder.andWhere('meaning.difficulty IN (:...difficulty)', {
        difficulty: query.difficulty,
      });
    }

    // 정답률 필터
    if (query.correctRatio.length) {
      const ratioExpr = ratioCondition(query.correctRatio);
      if (ratioExpr) {
        queryBuilder.andWhere(ratioExpr);
      }
    }

    const result = await queryBuilder.getRawMany();
    // raw의 entity 변환 및 오프셋 필터
    const words = result
      .reduce((acc, row) => {
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
      }, [])
      .slice(query.offset, query.offset + query.limit);

    return plainToInstance(
      WordsQueryDto,
      { words, searchTotalCount: words.length },
      { excludeExtraneousValues: true },
    );
  }
}
