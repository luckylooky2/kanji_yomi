import styled from "@emotion/styled";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";

import { quizStatusState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";

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
        <KeyboardDoubleArrowLeftIcon /> Quit
      </Button>
      <Button
        variant="text"
        color="error"
        onClick={() => {
          setQuizStatus(QuizStatus.RESULT);
        }}
      >
        Finish <KeyboardDoubleArrowRightIcon />
      </Button>
    </QuizStatusControlButtonsLayout>
  );
};

export default QuizStatusControlButtons;

const QuizStatusControlButtonsLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;
