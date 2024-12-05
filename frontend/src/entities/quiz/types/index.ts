export type QuizQuestionRequestDTO = {
  difficulty: string[];
};

export type QuizQuestionResponseDTO = {
  id: number;
  word: string;
  difficulty: string;
};

export type QuizAnswerRequestDTO = {
  word: string;
  answer: string;
};

export type QuizAnswerResponseDTO = {
  id: number;
  result: boolean;
  meaning: string;
};

export enum AnswerStatus {
  BEFORE = "0",
  CORRECT = "1",
  WRONG = "2",
}

export type AnswerInputType = {
  answer: string;
};

export enum QuizStatus {
  OPTION = "0",
  ONGOING = "1",
  RESULT = "2",
}

export type QuizResult = {
  word: string;
  meaning: string | null;
  skipped: boolean;
  retries: number;
};

export interface QuizWordCategory {
  kind: string;
  value: string;
  color:
    | "primary"
    | "secondary"
    | "default"
    | "error"
    | "info"
    | "success"
    | "warning";
}
