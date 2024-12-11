import { Dayjs } from "dayjs";
import { atom } from "jotai";
import { atomWithRefresh } from "jotai/utils";

import { quizOptionDifficultyState } from "@/entities/quizOption/store";
import { QuizService } from "@/features/quiz/api";

import { QuizQuestionResponseDTO, QuizResult, QuizStatus } from "../types";

// Quiz
export const quizStatusState = atom<QuizStatus>(QuizStatus.OPTION);
export const quizCurrentRoundState = atom(0);
// async read atom: 데이터를 가져올 수 있지만, 수정이 불가하다. suspense를 사용할 수는 있다.
// async write atom: 데이터를 가져오고 수정이 가능하지만, suspense를 사용하지 못한다.
// atomWithRefresh: 데이터를 원하시는 시점에 다시 가져올 수 있다. suspense도 사용 가능하다.
export const quizCurrentKanjiState = atomWithRefresh(async (get) => {
  get(quizCurrentRoundState);
  const difficulty = get(quizOptionDifficultyState);
  try {
    const data: QuizQuestionResponseDTO = await QuizService.getQuestion({
      difficulty,
    });
    return { data };
  } catch {
    return { error: { message: "Network Error" } };
  }
});
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
