"use client";

import { useState, useEffect } from "react";
import { database } from "@/shared/model/db";
import { playTTS } from "@/entities/quiz/lib/playTTS";
import { Kanji } from "@/shared/model/db";
import AnswerForm from "./AnswerForm";

const AnswerQuiz = () => {
  const [kanji, setKanji] = useState<Kanji>(["", ""]);
  const [question, answer] = kanji;

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
      <div style={{ fontSize: "50px" }}>{question}</div>
      <div style={{ display: "flex", gap: "5px" }}>
        <button
          onClick={() => {
            playTTS(answer);
          }}
        >
          play word
        </button>
        <button
          onClick={() => {
            window.open(`https://jisho.org/search/${question}`, "_blank");
          }}
        >
          find in dictionary
        </button>
      </div>
      <AnswerForm kanji={kanji} random={random} />
    </>
  );
};

export default AnswerQuiz;
