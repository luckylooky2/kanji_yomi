import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

function checkNumberRegex({ value }: { value: string }) {
  const regex = /^\d+$/;
  if (regex.test(value)) {
    return parseInt(value, 10);
  }

  throw new BadRequestException('Invalid number format');
}

export class WordsQueryRequest {
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
