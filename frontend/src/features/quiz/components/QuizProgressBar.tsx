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
        value={maxRound === Infinity ? 100 : (currRound / maxRound) * 100}
      />
      <ProgressRate id="progress-rate">
        {`${currRound} / ${maxRound === Infinity ? "∞" : maxRound}`}
      </ProgressRate>
    </ProgressBarLayout>
  );
};

export default QuizProgressBar;

const ProgressBarLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.small};
`;

const ProgressBar = styled(LinearProgress)`
  flex: 7;
`;

const ProgressRate = styled.div`
  flex: 3;
  text-align: center;
`;
