import styled from "@emotion/styled";
import ArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";
import React from "react";

import { quizStatusState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import ResponsiveIcon from "@/widgets/ResponsiveIcon/ResponsiveIcon";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizStatusControlButtons = ({ setIsOpen }: Props) => {
  const setQuizStatus = useSetAtom(quizStatusState);

  return (
    <QuizStatusControlButtonsLayout>
      <Button
        id="scrollTarget"
        variant="text"
        color="error"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <ResponsiveIcon icon={ArrowLeftIcon} /> Quit
      </Button>
      <Button
        variant="text"
        color="error"
        onClick={() => {
          setQuizStatus(QuizStatus.RESULT);
        }}
      >
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
