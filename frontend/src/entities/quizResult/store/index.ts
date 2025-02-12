import { atom } from "jotai";

import { QuizResult } from "@/entities/quiz/types";
import { QuizResultLegendType } from "@/entities/quizResult/type";

export const quizResultState = atom<QuizResult[]>([]);
export const quizResultFilter = atom<QuizResultLegendType | "All">("All");
export const quizResultFilteredState = atom((get) => {
  const quizResult = get(quizResultState);
  const filter = get(quizResultFilter);

  if (filter === "All") {
    return quizResult;
  }

  return quizResult.filter(({ type }) => filter === type);
});

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
