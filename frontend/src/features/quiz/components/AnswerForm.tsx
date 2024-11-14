import Button from "@mui/material/Button";
import { useSetAtom, useAtomValue } from "jotai";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { quizOptionRoundState } from "@/entities/option/store";
import {
  AnswerInputType,
  quizCurrentRoundState,
  AnswerStatus,
  quizIsStartedState,
  QuizStatus,
  QuizQuestionDTO,
  quizCurrentKanjiState,
  QuizAnswerDTO,
} from "@/entities/quiz/model";
import "../../../app/ui/utils.css";
import useEventAPI from "@/shared/hooks/useEventAPI";
import { API_URL, BASE_OPTIONS } from "@/shared/model";

interface Props {
  random: () => void;
}

const AnswerForm = ({ random }: Props) => {
  const { register, handleSubmit, reset } = useForm<AnswerInputType>();
  const [, setStatus] = useState(AnswerStatus.BEFORE);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setQuizStatus = useSetAtom(quizIsStartedState);
  const maxRound = useAtomValue(quizOptionRoundState);
  const kanji = useAtomValue<QuizQuestionDTO | null>(quizCurrentKanjiState);
  const [shake, setShake] = useState(false);
  const timeId = useRef<NodeJS.Timeout | null>(null);
  const { fetchData } = useEventAPI(`${API_URL}/quiz/answer`);

  const getNextQuestion = () => {
    random();
    reset();
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

    const response: QuizAnswerDTO = await fetchData({
      method: "POST",
      body: JSON.stringify({ word: kanji.word, answer: answer }),
      ...BASE_OPTIONS,
    });

    if (response.result) {
      getNextQuestion();
    } else {
      triggerShake();
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

export default AnswerForm;
