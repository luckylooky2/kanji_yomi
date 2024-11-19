import { Dayjs } from "dayjs";
import { atom } from "jotai";

import { QuizQuestionResponseDTO, QuizResult, QuizStatus } from "../types";

// Quiz
export const quizStatusState = atom<QuizStatus>(QuizStatus.OPTION);
export const quizCurrentRoundState = atom(0);
export const quizCurrentKanjiState = atom<QuizQuestionResponseDTO | null>(null);
export const quizStartTime = atom<Dayjs | null>(null);

// QuizResult
export const quizResultState = atom<QuizResult[]>([]);
export const quizTotalRetriesState = atom((get) => {
  const quizResult = get(quizResultState);
  let [correct, totalRetries] = [0, 0];
  for (const { skipped, retries } of quizResult) {
    if (skipped) {
      totalRetries += retries;
    } else {
      correct++;
      totalRetries += retries + 1;
    }
  }
  return [correct, totalRetries];
});
