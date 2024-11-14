"use client";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAtomValue, useAtom } from "jotai";
import { useState, useEffect } from "react";

import { quizOptionDifficultyState } from "@/entities/option/store";
import { playTTS } from "@/entities/quiz/lib/playTTS";
import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
  QuizQuestionDTO,
} from "@/entities/quiz/model";
import { API_URL, BASE_OPTIONS } from "@/shared/model";

import AnswerForm from "./AnswerForm";

const QuizContainer = () => {
  const difficulty = useAtomValue(quizOptionDifficultyState);
  const currentRound = useAtomValue(quizCurrentRoundState);
  const [kanji, setKanji] = useAtom<QuizQuestionDTO | null>(
    quizCurrentKanjiState
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: disabled 처리하기
    if ("speechSynthesis" in window) {
      console.log("Web Speech API supported!");
    } else {
      console.log("Web Speech API not supported :-(");
    }
  }, []);

  async function fetchQuestion() {
    setKanji(null);
    const options = {
      method: "POST",
      body: JSON.stringify({ difficulty }),
      ...BASE_OPTIONS,
    };
    try {
      const response = await fetch(`${API_URL}/quiz/question`, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      setKanji(result);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (!kanji) {
      fetchQuestion();
    }
  }, [currentRound]);

  return (
    <>
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
      <AnswerForm random={fetchQuestion} />
    </>
  );
};

export default QuizContainer;
