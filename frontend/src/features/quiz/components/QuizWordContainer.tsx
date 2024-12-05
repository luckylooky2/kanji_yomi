"use client";

import styled from "@emotion/styled";
import ReplayIcon from "@mui/icons-material/Replay";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import dayjs from "dayjs";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { playTTS } from "@/entities/quiz/lib/playTTS";
import {
  quizCurrentKanjiState,
  quizCurrentRoundState,
  quizStartTime,
} from "@/entities/quiz/store";
import { QuizQuestionResponseDTO } from "@/entities/quiz/types";
import { quizOptionDifficultyState } from "@/entities/quizOption/store";
// import MywordRegisterToggle from "@/features/myword/components/MywordRegisterToggle";
import { theme } from "@/shared/styles/theme";
import ErrorBoundary from "@/widgets/ErrorBoundary/ErrorBoundary";

import { QuizService } from "../api";

import QuizWord from "./QuizWord";

const QuizWordContainer = () => {
  const difficulty = useAtomValue(quizOptionDifficultyState);
  const currentRound = useAtomValue(quizCurrentRoundState);
  const [kanji, setKanji] = useAtom<QuizQuestionResponseDTO | null>(
    quizCurrentKanjiState
  );
  const setStartTime = useSetAtom(quizStartTime);
  const isFirstRendered = useRef(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // TODO: disabled 처리하기
    if ("speechSynthesis" in window) {
      console.log("Web Speech API supported!");
    } else {
      console.log("Web Speech API not supported :-(");
    }
    setStartTime(dayjs(new Date()));
  }, []);

  async function fetchQuestion() {
    setKanji(null);
    try {
      const data = await QuizService.getQuestion({ difficulty });
      setKanji(data);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(new Error("Network Error"));
      }
    }
  }

  useEffect(() => {
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

  const QuizWordFallback = () => {
    return (
      <ErrorComponentContainer>
        <div>
          <Image src="/warning.png" width="30" height="30" alt="Error" />
          {error?.message}
        </div>
        <IconButton aria-label="retry" onClick={fetchQuestion}>
          <ReplayIcon />
        </IconButton>
      </ErrorComponentContainer>
    );
  };

  return (
    <QuizWordSection>
      {/* <MywordRegisterToggle /> */}
      <ErrorBoundary fallback={<QuizWordFallback />} error={error}>
        <QuizWord kanji={kanji} />
      </ErrorBoundary>
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

const QuizWordHintLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  gap: ${theme.spacing.small};
  font-size: 25px;

  @media (min-width: 480px) {
    height: 250px;
  }

  div {
    display: flex;
    gap: ${theme.spacing.small};
  }
`;
