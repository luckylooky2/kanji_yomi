import styled from "@emotion/styled";
import ArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";
import React from "react";

import { quizStatusState, quizTimerState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizStatusControlButtons = ({ setIsOpen }: Props) => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const [quizTimer, setQuizTimer] = useAtom(quizTimerState);

  const handleQuit = () => {
    setIsOpen(true);
  };

  const handleFinish = () => {
    setQuizTimer({ ...quizTimer, quizEndTime: dayjs(new Date()) });
    setQuizStatus(QuizStatus.RESULT);
  };

  return (
    <QuizStatusControlButtonsLayout>
      <Button
        id="scrollTarget"
        variant="text"
        color="error"
        onClick={handleQuit}
      >
        <ResponsiveIcon icon={ArrowLeftIcon} /> Quit
      </Button>
      <Button variant="text" color="error" onClick={handleFinish}>
        Finish <ResponsiveIcon icon={ArrowRightIcon} />
      </Button>
    </QuizStatusControlButtonsLayout>
  );
};

export default QuizStatusControlButtons;

const QuizStatusControlButtonsLayout = styled.section`
  display: flex;
  justify-content: space-between;
`;
