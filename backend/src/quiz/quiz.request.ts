import {
  ArrayUnique,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsArrayOfValues } from '../decorator/IsArrayOfValues';
import { Transform } from 'class-transformer';

export class QuizStartRequest {
  @IsOptional()
  @IsNumber()
  userId: number | null;

  @IsArray()
  @IsString({ each: true })
  @IsArrayOfValues(['N5', 'N4', 'N3', 'N2', 'N1'], {
    message: 'Each difficulty level must be one of: N5, N4, N3, N2, N1',
  })
  @ArrayUnique()
  difficulty: string[];

  @IsNumber()
  @Transform(({ value }) => Number(value))
  round: number;
}

export class QuestionRequest {
  @IsArray()
  @IsString({ each: true })
  @IsArrayOfValues(['N5', 'N4', 'N3', 'N2', 'N1'], {
    message: 'Each difficulty level must be one of: N5, N4, N3, N2, N1',
  })
  @ArrayUnique()
  difficulty: string[];
}

export class AnswerRequest {
  @IsNumber()
  id: number;

  @IsString()
  word: string;

  @IsString()
  answer: string;
}
