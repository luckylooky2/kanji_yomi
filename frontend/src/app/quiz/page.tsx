"use client";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Button } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";

import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
  quizIsStartedState,
  QuizStatus,
} from "@/entities/quiz/model";
import QuizOptionSelect from "@/features/landing/components/QuizOptionSelect";
import { useModal } from "@/features/modal/hooks/useModal";
import ToggleRegister from "@/features/myword/components/ToggleRegister";
import ProgressBar from "@/features/quiz/components/ProgressBar";
import QuitModal from "@/features/quiz/components/QuitModal";
import QuizContainer from "@/features/quiz/components/QuizContainer";
import QuizResult from "@/features/quiz/components/QuizResult";

export default function QuizPage() {
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
      <QuitModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
      <ProgressBar />
      <ToggleRegister />
      <QuizContainer />
    </>
  );
}
