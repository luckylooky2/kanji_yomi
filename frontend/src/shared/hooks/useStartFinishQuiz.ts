import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { QuizStartResponseDTO } from "@/entities/quiz/types";
import {
  quizOptionDifficultyState,
  quizOptionRoundState,
} from "@/entities/quizOption/store";
import { QuizService } from "@/features/quiz/api";

import { useDelayFetching } from "./useDelayFetching";

export function useQuizStartFinish() {
  const [difficulty] = useAtom(quizOptionDifficultyState);
  const [round] = useAtom(quizOptionRoundState);

  const {
    data: quizId,
    refetch: fetchQuizStart,
    isFetching: isQuizStartFetching,
  } = useQuery<QuizStartResponseDTO>({
    queryKey: ["quizId"],
    queryFn: async () => {
      return QuizService.startQuiz({
        difficulty: difficulty,
        round: round,
      }).catch(() => {
        throw new Error("Failed to start quiz: Please try again later");
      });
    },
    retry: false,
    enabled: false,
  });

  const { refetch: fetchQuizFinish, isFetching: isQuizFinishFetching } =
    useQuery({
      queryKey: ["quizFinish"],
      queryFn: async () => {
        if (quizId === undefined) {
          return;
        }

        return QuizService.finishQuiz(quizId.id).catch(() => {
          throw new Error("Failed to finish quiz: Please try again later");
        });
      },
      retry: false,
      enabled: false,
    });

  const isQuizStartFetchingDelay = useDelayFetching(isQuizStartFetching);
  const isQuizFinishFetchingDelay = useDelayFetching(isQuizFinishFetching);

  return {
    quizId,
    fetchQuizStart,
    isQuizStartFetchingDelay,
    isQuizStartFetching,
    fetchQuizFinish,
    isQuizFinishFetchingDelay,
    isQuizFinishFetching,
  };
}
