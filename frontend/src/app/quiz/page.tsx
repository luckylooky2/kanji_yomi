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
import QuizOptionSelect from "@/features/landing/components/QuizOptionSelect";
import { useModal } from "@/features/modal/hooks/useModal";
import MywordRegisterToggle from "@/features/myword/components/MywordRegisterToggle";
import QuizAnswerForm from "@/features/quiz/components/QuizAnswerForm";
import QuizProgressBar from "@/features/quiz/components/QuizProgressBar";
import QuizQuitModal from "@/features/quiz/components/QuizQuitModal";
import QuizResult from "@/features/quiz/components/QuizResult";
import QuizWordContainer from "@/features/quiz/components/QuizWordContainer";
import PageWithBottomNav from "@/widgets/navigation/PageWithBottomNav";

function QuizPageBase() {
  const quizStatus = useAtomValue(quizIsStartedState);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setCurrentKanji = useSetAtom(quizCurrentKanjiState);
  const { isOpen, setIsOpen } = useModal();

  function resetState() {
    setCurrentRound(0);
    setCurrentKanji(null);
  }

  if (quizStatus === QuizStatus.OPTION) {
    resetState();
    return <QuizOptionSelect />;
  }

  if (quizStatus === QuizStatus.RESULT) {
    return <QuizResult />;
  }

  return (
    <>
      <QuizQuitModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        <Button
          variant="text"
          color="error"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
      </div>
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
