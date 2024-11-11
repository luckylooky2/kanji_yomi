"use client";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState, useEffect } from "react";

import { playTTS } from "@/entities/quiz/lib/playTTS";
import { database } from "@/shared/model/db";
import { Kanji } from "@/shared/model/db";

import AnswerForm from "./AnswerForm";

const QuizContainer = () => {
  const [kanji, setKanji] = useState<Kanji>(["", ""]);
  const [word, answer] = kanji;

  const random = () => {
    const rand = Math.floor(Math.random() * 1000) % database.length;
    setKanji(database[rand]);
  };

  useEffect(() => {
    random();
  }, []);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      console.log("Web Speech API supported!");
    } else {
      console.log("Web Speech API not supported :-(");
    }
  }, []);

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
        <div style={{ fontSize: "50px" }}>{word}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup variant="outlined" aria-label="Hint button group">
          <Button
            onClick={() => {
              playTTS(answer);
            }}
          >
            <VolumeUpIcon />
          </Button>
          <Button
            onClick={() => {
              window.open(`https://jisho.org/search/${word}`, "_blank");
            }}
          >
            <TravelExploreIcon />
          </Button>
        </ButtonGroup>
      </div>
      <AnswerForm kanji={kanji} random={random} />
    </>
  );
};

export default QuizContainer;
