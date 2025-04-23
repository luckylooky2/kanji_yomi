import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

function checkNumberRegex({ value }: { value: string }) {
  const regex = /^\d+$/;
  if (regex.test(value)) {
    return parseInt(value, 10);
  }

  throw new BadRequestException('Invalid number format');
}

class IWordsQueryRequest {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  @IsIn(['N5', 'N4', 'N3', 'N2', 'N1'], { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  difficulty?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsIn(['High', 'Mid', 'Low'], { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  correctRatio?: string[] = [];
}

export class WordsQueryRequest extends IWordsQueryRequest {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(1_000_000)
  @Transform(checkNumberRegex)
  offset?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1_000_000)
  @IsInt()
  @Transform(checkNumberRegex)
  limit?: number = 50;
}

export class WordsQueryCountRequest extends IWordsQueryRequest {}

export class Meaning {
  @IsString()
  meaning: string;

  @IsIn(['N5', 'N4', 'N3', 'N2', 'N1'])
  difficulty: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export class WordsCreateRequest {
  @IsString()
  word: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // class-transformer가 meanings의 타입 변환을 수행하지 못하여 유효성 검사가 실패함
  @Type(() => Meaning)
  meanings: Meaning[];
}

export class WordsEditRequest {
  @IsString()
  word: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Meaning)
  meanings: Meaning[];
}
