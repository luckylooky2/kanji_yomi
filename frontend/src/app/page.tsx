"use client";

import Button from "@mui/material/Button";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";

import { quizCurrentRoundState } from "@/entities/quiz/store";

export default function Home() {
  const [isLanding, setIsLanding] = useState(false);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);

  const openOptionSelect = useCallback(() => {
    setIsLanding(false);
  }, []);

  setCurrentRound(0);

  return isLanding ? (
    <div>
      <Button variant="contained" onClick={openOptionSelect}>
        시작하기
      </Button>
    </div>
  ) : (
    <></>
  );
}
