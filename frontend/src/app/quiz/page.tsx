"use client";

import styled from "@emotion/styled";
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
import QuizAnswerForm from "@/features/quiz/components/QuizAnswerForm";
import QuizProgressBar from "@/features/quiz/components/QuizProgressBar";
import QuizStatusControlButtons from "@/features/quiz/components/QuizStatusControlButtons";
import QuizUserGuidePopover from "@/features/quiz/components/QuizUserGuidePopover";
import QuizWordContainer from "@/features/quiz/components/QuizWordContainer";
import QuizOptions from "@/features/quizOption/components/QuizOptions";
import QuizResult from "@/features/quizResult/components/QuizResult";
import { theme } from "@/shared/styles/theme";

const QuizPage = () => {
  const quizStatus = useAtomValue(quizStatusState);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const refreshKanji = useSetAtom(quizCurrentKanjiState);
  const setQuizTimer = useSetAtom(quizTimerState);
  const setCurrentRetries = useSetAtom(quizCurrentRetries);
  const setQuizResult = useSetAtom(quizResultState);

  function resetQuizState() {
    setCurrentRound(0);
    setCurrentRetries(0);
    setQuizResult([]);
    setQuizTimer({ quizStartTime: null, quizEndTime: null });
    refreshKanji();
  }

  if (quizStatus === QuizStatus.OPTION) {
    resetQuizState();
    return <QuizOptions />;
  }

  if (quizStatus === QuizStatus.RESULT) {
    return <QuizResult />;
  }

  return (
    <QuizQuestionContainer>
      <QuizUserGuidePopover />
      <QuizStatusControlButtons />
      <QuizProgressBar />
      <QuizWordContainer />
      <QuizAnswerForm />
    </QuizQuestionContainer>
  );
};

export default QuizPage;

const QuizQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
  justify-content: center;
  height: 100%;

  @media (min-width: 480px) {
    gap: ${theme.spacing.large};
  }
`;
