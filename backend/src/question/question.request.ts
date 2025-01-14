import { IsArray, IsNumber, IsString } from 'class-validator';
import { IsArrayOfValues } from './decorator/IsArrayOfValues';

export class QuestionByFilterRequest {
  @IsArray()
  @IsString({ each: true })
  @IsArrayOfValues(['N5', 'N4', 'N3', 'N2', 'N1'], {
    message: 'Each difficulty level must be one of: N5, N4, N3, N2, N1',
  })
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
