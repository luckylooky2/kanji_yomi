import { BadRequestException, Injectable } from '@nestjs/common';
import { Word } from '../entity/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  WordsCreateResponseDTO,
  WordsDeleteResponseDTO,
  WordsEditResponseDTO,
  WordsQueryCountDTO,
  WordsQueryDto,
} from './words.dto';
import { plainToInstance } from 'class-transformer';
import {
  WordsCreateRequest,
  WordsEditRequest,
  WordsQueryRequest,
} from './words.request';
import { makeQuestionDTO, ratioCondition } from 'src/utils/utils';
import { QuestionDTO } from 'src/quiz/quiz.dto';
import { Meaning } from 'src/entity/meaning.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    @InjectRepository(Meaning) private meaningRepository: Repository<Meaning>,
  ) {}

  private async joinAndSelectById(id: number) {
    return await this.wordRepository
      .createQueryBuilder('word')
      .innerJoinAndSelect('word.meanings', 'meaning')
      .where('word.id = :id', { id: id })
      .getOne();
  }

  private getQueryBuilderByFilter(query: WordsQueryRequest) {
    return this.wordRepository
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
      .orderBy('word.id', 'ASC')
      .clone();
  }

  async searchWordsByFilter(query: WordsQueryRequest): Promise<WordsQueryDto> {
    const subQuery = this.getQueryBuilderByFilter(query)
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
      { words, count: words.length },
      { excludeExtraneousValues: true },
    );
  }

  async searchWordsCountByFilter(
    query: WordsQueryRequest,
  ): Promise<WordsQueryCountDTO> {
    const queryBuilder = this.getQueryBuilderByFilter(query);
    const totalCount = await queryBuilder
      .select('COUNT(DISTINCT word.id)', 'count')
      .getRawOne()
      .then((result) => parseInt(result.count, 10));

    return plainToInstance(
      WordsQueryCountDTO,
      { totalCount },
      { excludeExtraneousValues: true },
    );
  }

  async getWordById(questionId: number): Promise<QuestionDTO> {
    const wordById = await this.joinAndSelectById(questionId);

    if (!wordById) {
      throw new BadRequestException('No matching meaning found');
    }

    const questionDAO = makeQuestionDTO(wordById);

    return plainToInstance(QuestionDTO, questionDAO, {
      excludeExtraneousValues: true,
    });
  }

  async createNewWord(
    word: WordsCreateRequest,
  ): Promise<WordsCreateResponseDTO> {
    const existingWord = await this.wordRepository.findOne({
      where: { word: word.word.normalize('NFC') },
    });

    if (existingWord) {
      throw new BadRequestException('Word already exists');
    }

    const newWord = this.wordRepository.create(word);
    // NFC 정규화를 하지 않아도 answer 로직에서 정규화하여 비교
    newWord.word = newWord.word.normalize('NFC');
    // Word 테이블 뿐만 아니라 Meaning 테이블에도 엔티티가 자동으로 추가됨
    await this.wordRepository.save(newWord);

    return { id: newWord.id };
  }

  async editWord(
    wordId: number,
    newWord: WordsEditRequest,
  ): Promise<WordsEditResponseDTO> {
    const existingWord = await this.joinAndSelectById(wordId);

    if (!existingWord) {
      throw new BadRequestException('No matching word found');
    }

    const exMeanings = existingWord.meanings
      .slice()
      .sort((a, b) => a.meaning.localeCompare(b.meaning));
    const newMeanings = newWord.meanings
      .slice()
      .sort((a, b) => a.meaning.localeCompare(b.meaning));

    const isMeaningChanged =
      newMeanings.length !== exMeanings.length ||
      !newMeanings.every(
        (meaning, index) =>
          meaning.meaning === exMeanings[index].meaning &&
          meaning.difficulty === exMeanings[index].difficulty,
      );
    const isWordChanged = newWord.word !== existingWord.word;

    // 의미 정보 업데이트
    if (isMeaningChanged) {
      await this.meaningRepository.delete({ word: { id: wordId } });

      const newMeanings = newWord.meanings.map((meaning) =>
        this.meaningRepository.create({
          ...meaning,
          word: existingWord, // 관계 설정
        }),
      );

      await this.meaningRepository.save(newMeanings);
      // 없으면 단어와 의미 둘 다 변경이 되었을 때, wordId(FK)가 NULL로 설정됨
      existingWord.meanings = newMeanings;
    }

    // 단어 정보 업데이트
    if (isWordChanged) {
      existingWord.word = newWord.word;
      // 없으면 단어 변경 사항이 저장이 되지 않음
      await this.wordRepository.save(existingWord);
    }

    return { id: wordId };
  }

  async deleteWord(wordId: number): Promise<WordsDeleteResponseDTO> {
    const existingWord = await this.wordRepository.findOne({
      where: { id: wordId },
    });

    if (!existingWord) {
      throw new BadRequestException('No matching word found');
    }

    await this.wordRepository.delete({ id: wordId });

    return { id: wordId };
  }
}
