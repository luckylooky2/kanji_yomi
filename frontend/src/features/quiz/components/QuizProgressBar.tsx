"use client";

import LinearProgress from "@mui/material/LinearProgress";
import { useAtomValue } from "jotai";

import { quizCurrentRoundState } from "@/entities/quiz/store";
import { quizOptionRoundState } from "@/entities/quizOption/store";

const QuizProgressBar = () => {
  const maxRound = useAtomValue(quizOptionRoundState);
  const currRound = useAtomValue(quizCurrentRoundState);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={maxRound === Infinity ? 100 : (currRound / maxRound) * 100}
        style={{ flex: "7" }}
      />
      <div style={{ flex: "3", textAlign: "center" }}>
        {`${currRound} / ${maxRound === Infinity ? "∞" : maxRound}`}
      </div>
    </div>
  );
};

export default QuizProgressBar;
