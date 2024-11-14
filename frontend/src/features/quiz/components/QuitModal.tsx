import { Button, ButtonGroup } from "@mui/material";
import { useSetAtom } from "jotai";

import { quizIsStartedState, QuizStatus } from "@/entities/quiz/model";
import ModalBase from "@/features/modal/components/ModalBase";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuitModal = ({ isOpen, setIsOpen }: Props) => {
  const setQuizStatus = useSetAtom(quizIsStartedState);

  return (
    <ModalBase open={isOpen} onClose={() => setIsOpen(false)}>
      <h3>Quit?</h3>
      <ButtonGroup>
        <Button
          onClick={() => {
            setIsOpen(false);
            setQuizStatus(QuizStatus.OPTION);
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          No
        </Button>
      </ButtonGroup>
    </ModalBase>
  );
};

export default QuitModal;
