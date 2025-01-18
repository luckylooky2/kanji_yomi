"use client";

import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";

import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
  quizResultState,
  quizStatusState,
  quizTimerState,
} from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import { useModal } from "@/features/modal/hooks/useModal";
import QuizAnswerForm from "@/features/quiz/components/QuizAnswerForm";
import QuizProgressBar from "@/features/quiz/components/QuizProgressBar";
import QuizQuitModal from "@/features/quiz/components/QuizQuitModal";
import QuizStatusControlButtons from "@/features/quiz/components/QuizStatusControlButtons";
import QuizWordContainer from "@/features/quiz/components/QuizWordContainer";
import QuizOptions from "@/features/quizOption/components/QuizOptions";
import QuizResult from "@/features/quizResult/components/QuizResult";
import { theme } from "@/shared/styles/theme";

const QuizPage = () => {
  const quizStatus = useAtomValue(quizStatusState);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setQuizResult = useSetAtom(quizResultState);
  const refreshKanji = useSetAtom(quizCurrentKanjiState);
  const setQuizTimer = useSetAtom(quizTimerState);
  const { isOpen, setIsOpen } = useModal();

  function resetQuizState() {
    setCurrentRound(0);
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
      <QuizQuitModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <QuizStatusControlButtons setIsOpen={setIsOpen} />
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
