"use client";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Button } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";

import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
  quizIsStartedState,
} from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import { useModal } from "@/features/modal/hooks/useModal";
import MywordRegisterToggle from "@/features/myword/components/MywordRegisterToggle";
import QuizAnswerForm from "@/features/quiz/components/QuizAnswerForm";
import QuizProgressBar from "@/features/quiz/components/QuizProgressBar";
import QuizQuitModal from "@/features/quiz/components/QuizQuitModal";
import QuizWordContainer from "@/features/quiz/components/QuizWordContainer";
import QuizOption from "@/features/quizOption/components/QuizOption";
import QuizResult from "@/features/quizResult/components/QuizResult";
import PageWithBottomNav from "@/widgets/navigation/PageWithBottomNav";

function QuizPageBase() {
  const quizStatus = useAtomValue(quizIsStartedState);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setCurrentKanji = useSetAtom(quizCurrentKanjiState);
  const { isOpen, setIsOpen } = useModal();

  function resetQuizState() {
    setCurrentRound(0);
    setCurrentKanji(null);
  }

  if (quizStatus === QuizStatus.OPTION) {
    resetQuizState();
    return <QuizOption />;
  }

  if (quizStatus === QuizStatus.RESULT) {
    return <QuizResult />;
  }

  return (
    <>
      <QuizQuitModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        variant="text"
        color="error"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </Button>
      <QuizProgressBar />
      <MywordRegisterToggle />
      <QuizWordContainer />
      <QuizAnswerForm />
    </>
  );
}

export default function QuizPage() {
  return (
    <PageWithBottomNav path="quiz">
      <QuizPageBase />
    </PageWithBottomNav>
  );
}
