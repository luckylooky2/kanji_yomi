"use client";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAtomValue, useAtom } from "jotai";
import { useEffect } from "react";

import { playTTS } from "@/entities/quiz/lib/playTTS";
import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
} from "@/entities/quiz/store";
import { QuizQuestionResponseDTO } from "@/entities/quiz/types";
import { quizOptionDifficultyState } from "@/entities/quizOption/store";

import { QuizService } from "../api";

const QuizContainer = () => {
  const difficulty = useAtomValue(quizOptionDifficultyState);
  const currentRound = useAtomValue(quizCurrentRoundState);
  const [kanji, setKanji] = useAtom<QuizQuestionResponseDTO | null>(
    quizCurrentKanjiState
  );

  useEffect(() => {
    // TODO: disabled 처리하기
    if ("speechSynthesis" in window) {
      console.log("Web Speech API supported!");
    } else {
      console.log("Web Speech API not supported :-(");
    }
  }, []);

  useEffect(() => {
    async function fetchQuestion() {
      setKanji(null);
      try {
        const data = await QuizService.getQuestion({ difficulty });
        setKanji(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuestion();
  }, [currentRound]);

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100px",
        }}
      >
        <div style={{ fontSize: "50px" }}>
          {kanji ? kanji.word : "loading..."}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup variant="outlined" aria-label="Hint button group">
          <Button
            onClick={() => {
              if (!kanji) {
                return;
              }
              playTTS(kanji.word);
            }}
          >
            <VolumeUpIcon />
          </Button>
          <Button
            onClick={() => {
              if (!kanji) {
                return;
              }
              window.open(`https://jisho.org/search/${kanji.word}`, "_blank");
            }}
          >
            <TravelExploreIcon />
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
};

export default QuizContainer;
