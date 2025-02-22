import styled from "@emotion/styled";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  quizCurrentKanjiState,
  quizCurrentRetries,
  quizCurrentRoundState,
  quizTimerState,
} from "@/entities/quiz/store";
import { quizStatusState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import { quizResultFilter, quizResultState } from "@/entities/quizResult/store";
import ModalBase from "@/features/modal/components/ModalBase";
import { theme } from "@/shared/styles/theme";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizFinishModal = ({ isOpen, setIsOpen }: Props) => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const [quizTimer, setQuizTimer] = useAtom(quizTimerState);
  const [retries, setRetries] = useAtom(quizCurrentRetries);
  const { data: kanji } = useAtomValue(quizCurrentKanjiState);
  const [currentRound] = useAtom(quizCurrentRoundState);
  const [, setQuizResult] = useAtom(quizResultState);
  const [, setFilter] = useAtom(quizResultFilter);

  const handleQuit = () => {
    setQuizTimer({ ...quizTimer, quizEndTime: dayjs(new Date()) });
    setQuizResult((prev) => [
      ...prev,
      {
        round: currentRound,
        word: kanji!.word,
        meanings: kanji!.meanings,
        skipped: true,
        retries,
        type: "Skipped",
      },
    ]);
    setRetries(0);
    setFilter("All");
    setQuizStatus(QuizStatus.RESULT);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <ModalBase open={isOpen} onClose={handleCancel} title="Finish?">
      <QuitModalLayout>
        <div>Moving to the Quiz result page.</div>
        <Button variant="outlined" onClick={handleQuit}>
          Finish
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
      </QuitModalLayout>
    </ModalBase>
  );
};

export default QuizFinishModal;

// 여기서 align-items 속성을 주면, Button 컴포넌트의 width가 텍스트 크기로 고정된다.
const QuitModalLayout = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.small};
`;
