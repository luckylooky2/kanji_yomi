import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

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
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  offset?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 50;
}
