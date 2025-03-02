import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { quizCurrentRoundState, quizTimerState } from "@/entities/quiz/store";
import { quizOptionDifficultyState } from "@/entities/quizOption/store";
import { QuizService } from "@/features/quiz/api";

import { WordInfo } from "../types";

export const useQuizQuestion = () => {
  const [difficulty] = useAtom(quizOptionDifficultyState);
  const [currentRound] = useAtom(quizCurrentRoundState);
  const [{ quizStartTime }] = useAtom(quizTimerState);

  const queryFn = async () => {
    return QuizService.getQuestion({ difficulty }).catch(() => {
      throw new Error("Failed to fetch question");
    });
  };

  return useQuery<WordInfo>({
    queryKey: ["quizQuestion", currentRound, quizStartTime],
    queryFn,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
};
