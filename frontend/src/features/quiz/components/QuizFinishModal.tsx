import styled from "@emotion/styled";
import { Button, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

import {
  quizCurrentRetries,
  quizCurrentRoundState,
  quizTimerState,
} from "@/entities/quiz/store";
import { quizStatusState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import { quizResultFilter, quizResultState } from "@/entities/quizResult/store";
import ModalBase from "@/features/modal/components/ModalBase";
import { useQuizQuestion } from "@/shared/hooks/useQuizQuestion";
import { useQuizStartFinish } from "@/shared/hooks/useStartFinishQuiz";
import { theme } from "@/shared/styles/theme";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const QuizFinishModal = ({ isOpen, setIsOpen }: Props) => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const [quizTimer, setQuizTimer] = useAtom(quizTimerState);
  const [retries, setRetries] = useAtom(quizCurrentRetries);
  const { data: kanji } = useQuizQuestion();
  const [currentRound] = useAtom(quizCurrentRoundState);
  const [, setQuizResult] = useAtom(quizResultState);
  const [, setFilter] = useAtom(quizResultFilter);
  const t = useTranslations("game");
  const { fetchQuizFinish, isQuizFinishFetchingDelay, isQuizFinishFetching } =
    useQuizStartFinish();

  const handleFinish = async () => {
    if (kanji === undefined || isQuizFinishFetching) {
      return;
    }

    const { error } = await fetchQuizFinish();

    if (error) {
      toast.error(error.message);
      return;
    }

    setQuizTimer({ ...quizTimer, quizEndTime: dayjs(new Date()) });
    setQuizResult((prev) => [
      ...prev,
      {
        round: currentRound,
        word: kanji.word,
        meanings: kanji.meanings,
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
    <ModalBase
      open={isOpen}
      onClose={handleCancel}
      title={`${t("finish-modal-title")}`}
    >
      <QuitModalLayout>
        <div>{t("finish-modal-content")}</div>
        <Button
          variant="outlined"
          onClick={handleFinish}
          disabled={isQuizFinishFetchingDelay}
        >
          {isQuizFinishFetchingDelay ? (
            <CircularProgress size={24.5} />
          ) : (
            t("modal-ok")
          )}
        </Button>
        <Button
          variant="contained"
          onClick={handleCancel}
          disabled={isQuizFinishFetchingDelay}
        >
          {isQuizFinishFetchingDelay ? (
            <CircularProgress size={24.5} />
          ) : (
            t("modal-cancel")
          )}
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
