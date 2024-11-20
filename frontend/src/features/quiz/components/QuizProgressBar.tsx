"use client";

import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";
import { useAtomValue } from "jotai";

import { quizCurrentRoundState } from "@/entities/quiz/store";
import { quizOptionRoundState } from "@/entities/quizOption/store";
import { theme } from "@/shared/styles/theme";

const QuizProgressBar = () => {
  const maxRound = useAtomValue(quizOptionRoundState);
  const currRound = useAtomValue(quizCurrentRoundState);

  return (
    <ProgressBarLayout role="progress" aria-labelledby="progress-rate">
      <ProgressBar
        variant="determinate"
        value={((currRound + 1) / maxRound) * 100}
      />
      <ProgressRate id="progress-rate">
        {`${currRound + 1} / ${maxRound}`}
      </ProgressRate>
    </ProgressBarLayout>
  );
};

export default QuizProgressBar;

const ProgressBarLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.small};
  position: relative;
  padding: 10px 0px;
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
