import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  quizCurrentRoundState,
  quizStatusState,
  quizCurrentKanjiState,
  quizResultState,
} from "@/entities/quiz/store";
import {
  AnswerInputType,
  AnswerStatus,
  QuizAnswerResponseDTO,
  QuizStatus,
} from "@/entities/quiz/types";
import { quizOptionRoundState } from "@/entities/quizOption/store";
import { theme } from "@/shared/styles/theme";

import "../../../../public/styles/utils.css";
import { QuizService } from "../api";

const QuizAnswerForm = () => {
  const {
    register,
    handleSubmit,
    reset: resetInput,
  } = useForm<AnswerInputType>();
  const [, setStatus] = useState(AnswerStatus.BEFORE);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setQuizStatus = useSetAtom(quizStatusState);
  const maxRound = useAtomValue(quizOptionRoundState);
  const [quizResult, setQuizResult] = useAtom(quizResultState);
  const { data: kanji, error } = useAtomValue(quizCurrentKanjiState);
  const [shake, setShake] = useState(false);
  const timeId = useRef<NodeJS.Timeout | null>(null);
  const retries = useRef(0);

  const getNextQuestion = () => {
    resetInput();
    setCurrentRound((prev) => {
      if (prev + 1 === maxRound) {
        setQuizStatus(QuizStatus.RESULT);
      }
      return prev + 1;
    });
  };

  // handleSubmit이 data(input 값을) 인자로 호출
  const onSubmit = async ({ answer }: AnswerInputType) => {
    if (error || !answer) {
      return;
    }

    try {
      const data: QuizAnswerResponseDTO = await QuizService.getAnswer({
        word: kanji.word,
        answer: answer,
      });
      if (data.result) {
        setQuizResult([
          ...quizResult,
          {
            word: kanji.word,
            meaning: data.meaning,
            skipped: false,
            retries: retries.current,
          },
        ]);
        retries.current = 0;
        getNextQuestion();
      } else {
        triggerShake();
        retries.current++;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const triggerShake = () => {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    setShake(true);
    setStatus(AnswerStatus.WRONG);

    const id = setTimeout(() => {
      setShake(false);
      setStatus(AnswerStatus.BEFORE);
      timeId.current = null;
    }, 500);
    timeId.current = id;
  };

  const handlePullUpScrollToTarget = () => {
    setTimeout(() => {
      // 바로 실행하면 동작하지 않음
      document
        .getElementById("scrollTarget")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleSkip = () => {
    if (!kanji) {
      return;
    }

    setQuizResult([
      ...quizResult,
      {
        word: kanji.word,
        meaning: null,
        skipped: true,
        retries: retries.current,
      },
    ]);
    retries.current = 0;
    getNextQuestion();
  };

  return (
    <QuizAnswerSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("answer")}
          className={shake ? "shake" : ""}
          autoComplete="off"
          autoFocus
          placeholder="Type in Hiragana"
          onFocus={handlePullUpScrollToTarget}
        />
      </form>
      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={!!error}
      >
        submit
      </Button>
      <Button onClick={handleSkip} disabled={!!error}>
        skip
      </Button>
    </QuizAnswerSection>
  );
};

export default QuizAnswerForm;

const QuizAnswerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;
