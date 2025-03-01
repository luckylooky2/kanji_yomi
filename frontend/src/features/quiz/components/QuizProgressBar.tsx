"use client";

import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";
import { useAtomValue } from "jotai";

import { quizCurrentRoundState } from "@/entities/quiz/store";
import { quizOptionRoundState } from "@/entities/quizOption/store";
import { useQuizUserGuideStep } from "@/shared/hooks/useQuizUserGuideStep";
import { quizUserGuideIndex } from "@/shared/model";
import { theme } from "@/shared/styles/theme";

const QuizProgressBar = () => {
  const maxRound = useAtomValue(quizOptionRoundState);
  const currRound = useAtomValue(quizCurrentRoundState);
  const { currStep } = useQuizUserGuideStep();

  return (
    <ProgressBarLayout
      id="progress-bar"
      role="progress"
      aria-labelledby="progress-rate"
      isGuideSelected={currStep === quizUserGuideIndex.PROGRESS_BAR}
    >
      <ProgressBar variant="determinate" value={(currRound / maxRound) * 100} />
      <ProgressRate id="progress-rate">
        {`${currRound} / ${maxRound}`}
      </ProgressRate>
    </ProgressBarLayout>
  );
};

export default QuizProgressBar;

const ProgressBarLayout = styled.section<{ isGuideSelected?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.small};
  position: relative;
  // padding: 10px 10px;
  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
    z-index: 10000;
    transform: scale(1.1);
    `}
`;

const ProgressBar = styled(LinearProgress)`
  width: 100%;
  height: 20px;
  border-radius: ${theme.radius.large};
`;

const ProgressRate = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: white;
  font-weight: bold;
  pointer-events: none;
`;
