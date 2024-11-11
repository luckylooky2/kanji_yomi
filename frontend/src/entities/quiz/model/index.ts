import { atom } from "jotai";

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

export const quizCurrentRoundState = atom(0);
export const quizIsStartedState = atom<QuizStatus>(QuizStatus.OPTION);
