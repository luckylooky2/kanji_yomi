"use client";

import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";

import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
  quizStatusState,
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
import PageWithBottomNav from "@/widgets/navigation/PageWithBottomNav";

function QuizPageBase() {
  const quizStatus = useAtomValue(quizStatusState);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setCurrentKanji = useSetAtom(quizCurrentKanjiState);
  const { isOpen, setIsOpen } = useModal();

  function resetQuizState() {
    setCurrentRound(0);
    setCurrentKanji(null);
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
}

export default function QuizPage() {
  return (
    <PageWithBottomNav path="quiz">
      <QuizPageBase />
    </PageWithBottomNav>
  );
}

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
