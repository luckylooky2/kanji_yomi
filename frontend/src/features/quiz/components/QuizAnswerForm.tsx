import Button from "@mui/material/Button";
import { useSetAtom, useAtomValue } from "jotai";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import { quizOptionRoundState } from "@/entities/option/store";
import {
  quizCurrentRoundState,
  quizIsStartedState,
  quizCurrentKanjiState,
} from "@/entities/quiz/store";
import {
  AnswerInputType,
  AnswerStatus,
  QuizQuestionResponseDTO,
  QuizStatus,
} from "@/entities/quiz/types";

import "../../../app/ui/utils.css";
import { QuizService } from "../api";

const QuizAnswerForm = () => {
  const {
    register,
    handleSubmit,
    reset: resetInput,
  } = useForm<AnswerInputType>();
  const [, setStatus] = useState(AnswerStatus.BEFORE);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setQuizStatus = useSetAtom(quizIsStartedState);
  const maxRound = useAtomValue(quizOptionRoundState);
  const kanji = useAtomValue<QuizQuestionResponseDTO | null>(
    quizCurrentKanjiState
  );
  const [shake, setShake] = useState(false);
  const timeId = useRef<NodeJS.Timeout | null>(null);

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
    if (!kanji || !answer) {
      return;
    }

    try {
      const data = await QuizService.getAnswer({
        word: kanji.word,
        answer: answer,
      });
      if (data.result) {
        getNextQuestion();
      } else {
        triggerShake();
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", gap: "5px" }}
      >
        <input
          {...register("answer")}
          className={shake ? "shake" : ""}
          autoComplete="off"
          autoFocus
        />
      </form>
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        submit
      </Button>
      <Button onClick={getNextQuestion}>skip</Button>
    </>
  );
};

export default QuizAnswerForm;