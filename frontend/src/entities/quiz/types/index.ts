import { Dayjs } from "dayjs";

import { MeaningInfo, MUIChipColorType, WordInfo } from "@/shared/types";

export type QuizQuestionRequestDTO = {
  difficulty: string[];
};

export type QuizQuestionResponseDTO = WordInfo;

export type QuizAnswerRequestDTO = {
  id: number;
  word: string;
  answer: string;
};

export type QuizAnswerResponseDTO = {
  id: number;
  word: string;
  result: boolean;
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
  meanings: MeaningInfo[];
  skipped: boolean;
  retries: number;
};

export interface QuizWordCategory {
  kind: string;
  value: string;
  color: MUIChipColorType;
}

export interface QuizHintSpeakSetting {
  selectedVoice: string;
  lang: string;
  rate: number; // 빠르기, 0.1 ~ 10
  pitch: number; // 음높이, 0 ~ 2
  volume: number; // 음량, 0 ~ 1
}

export type QuizTimer = Record<"quizStartTime" | "quizEndTime", Dayjs | null>;
