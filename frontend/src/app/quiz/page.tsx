"use client";

import { useAtomValue, useSetAtom } from "jotai";

import {
  quizCurrentKanjiState,
  quizCurrentRetries,
  quizCurrentRoundState,
  quizStatusState,
  quizTimerState,
} from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import { quizResultState } from "@/entities/quizResult/store";
import QuizGame from "@/features/quiz/components/QuizGame";
import QuizOptions from "@/features/quizOption/components/QuizOptions";
import QuizResult from "@/features/quizResult/components/QuizResult";
import { useLocale } from "@/shared/hooks/useLocale";
import ErrorComponent from "@/widgets/ErrorComponent/ErrorComponent";
import Loading from "@/widgets/Loading/Loading";

const QuizPage = () => {
  const quizStatus = useAtomValue(quizStatusState);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const refreshKanji = useSetAtom(quizCurrentKanjiState);
  const setQuizTimer = useSetAtom(quizTimerState);
  const setCurrentRetries = useSetAtom(quizCurrentRetries);
  const setQuizResult = useSetAtom(quizResultState);
  const { isLoading, isError, retryHandler } = useLocale();

  function resetQuizState() {
    setCurrentRound(0);
    setCurrentRetries(0);
    setQuizResult([]);
    setQuizTimer({ quizStartTime: null, quizEndTime: null });
    refreshKanji();
  }

  if (isError) {
    return (
      <ErrorComponent retryHandler={retryHandler} message="Network Error" />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (quizStatus === QuizStatus.OPTION) {
    resetQuizState();
    return <QuizOptions />;
  }

  if (quizStatus === QuizStatus.RESULT) {
    return <QuizResult />;
  }

  return <QuizGame />;
};

export default QuizPage;
