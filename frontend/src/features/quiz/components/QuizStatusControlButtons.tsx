import styled from "@emotion/styled";
import ArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React from "react";

import {
  quizCurrentKanjiState,
  quizCurrentRetries,
  quizCurrentRoundState,
  quizStatusState,
  quizTimerState,
} from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import { quizResultFilter, quizResultState } from "@/entities/quizResult/store";
import { useQuizUserGuideStep } from "@/shared/hooks/useQuizUserGuideStep";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizStatusControlButtons = ({ setIsOpen }: Props) => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const [quizTimer, setQuizTimer] = useAtom(quizTimerState);
  const [retries, setRetries] = useAtom(quizCurrentRetries);
  const { data: kanji } = useAtomValue(quizCurrentKanjiState);
  const [currentRound] = useAtom(quizCurrentRoundState);
  const [, setQuizResult] = useAtom(quizResultState);
  const [, setFilter] = useAtom(quizResultFilter);
  const { currStep } = useQuizUserGuideStep();

  const handleQuit = () => {
    setIsOpen(true);
  };

  const handleFinish = () => {
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
  };

  return (
    <QuizStatusControlButtonsLayout>
      <QuizQuitButton
        id="quit-button"
        variant="text"
        color="error"
        onClick={handleQuit}
        isGuideSelected={currStep === 3}
      >
        <ResponsiveIcon icon={ArrowLeftIcon} /> Quit
      </QuizQuitButton>
      <QuizFinishButton
        id="finish-button"
        variant="text"
        color="error"
        onClick={handleFinish}
        isGuideSelected={currStep === 4}
      >
        Finish <ResponsiveIcon icon={ArrowRightIcon} />
      </QuizFinishButton>
    </QuizStatusControlButtonsLayout>
  );
};

export default QuizStatusControlButtons;

const QuizStatusControlButtonsLayout = styled.section`
  display: flex;
  justify-content: space-between;
`;

const QuizQuitButton = styled(Button)<{ isGuideSelected?: boolean }>`
  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
  z-index: 10000;
  background-color: white;
  transform: scale(1.1);
  `}
`;

const QuizFinishButton = styled(Button)<{ isGuideSelected?: boolean }>`
  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
  z-index: 10000;
  background-color: white;
  transform: scale(1.1);
  `}
`;
