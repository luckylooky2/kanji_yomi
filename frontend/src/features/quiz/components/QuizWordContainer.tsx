"use client";

import styled from "@emotion/styled";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAtomValue, useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { playTTS } from "@/entities/quiz/lib/playTTS";
import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
} from "@/entities/quiz/store";
import { QuizQuestionResponseDTO } from "@/entities/quiz/types";
import { quizOptionDifficultyState } from "@/entities/quizOption/store";
import MywordRegisterToggle from "@/features/myword/components/MywordRegisterToggle";
import { theme } from "@/shared/styles/theme";

import { QuizService } from "../api";

const QuizWordContainer = () => {
  const difficulty = useAtomValue(quizOptionDifficultyState);
  const currentRound = useAtomValue(quizCurrentRoundState);
  const [kanji, setKanji] = useAtom<QuizQuestionResponseDTO | null>(
    quizCurrentKanjiState
  );
  const isFirstRendered = useRef(true);

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

    // 페이지 이동 간의 호출을 막기 위해
    if (isFirstRendered.current) {
      if (kanji === null) {
        fetchQuestion();
      }
    } else {
      fetchQuestion();
    }
    isFirstRendered.current = false;
  }, [currentRound]);

  const handleSpeakWord = () => {
    if (!kanji) {
      return;
    }
    playTTS(kanji.word);
  };

  const handleRedirectDictionary = () => {
    if (!kanji) {
      return;
    }
    window.open(`https://jisho.org/search/${kanji.word}`, "_blank");
  };

  return (
    <QuizWordSection>
      {/* <MywordRegisterToggle /> */}
      <QuizWord>{kanji ? kanji.word : "loading..."}</QuizWord>
      <QuizWordHintLayout>
        <ButtonGroup variant="outlined" aria-label="Hint button group">
          <Button onClick={handleSpeakWord}>
            <VolumeUpIcon />
          </Button>
          <Button onClick={handleRedirectDictionary}>
            <TravelExploreIcon />
          </Button>
        </ButtonGroup>
      </QuizWordHintLayout>
    </QuizWordSection>
  );
};

export default QuizWordContainer;

const QuizWordSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;

const QuizWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100px;
  font-size: 50px;
`;

const QuizWordHintLayout = styled.div`
  display: flex;
  justify-content: center;
`;
