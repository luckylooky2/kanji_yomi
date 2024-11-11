"use client";

import { Button } from "@mui/material";
import { useAtom } from "jotai";

import { quizIsStartedState, QuizStatus } from "@/entities/quiz/model";
import QuizOptionSelect from "@/features/landing/components/QuizOptionSelect";
import ToggleRegister from "@/features/myword/components/ToggleRegister";
import ProgressBar from "@/features/quiz/components/ProgressBar";
import QuizContainer from "@/features/quiz/components/QuizContainer";

export default function QuizPage() {
  const [quizStatus, setQuizStatus] = useAtom(quizIsStartedState);

  if (quizStatus === QuizStatus.OPTION) {
    return <QuizOptionSelect />;
  }
  return (
    <>
      <Button
        variant="text"
        color="error"
        onClick={() => {
          // 모달 적용하기
          setQuizStatus(QuizStatus.OPTION);
        }}
      >
        Quit
      </Button>
      <ProgressBar />
      <ToggleRegister />
      <QuizContainer />
    </>
  );
}
