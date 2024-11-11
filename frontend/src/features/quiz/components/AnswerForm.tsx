import Button from "@mui/material/Button";
import { useSetAtom, useAtomValue } from "jotai";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import { quizOptionRoundState } from "@/entities/option/store";
import {
  AnswerInputType,
  quizCurrentRoundState,
  AnswerStatus,
} from "@/entities/quiz/model";
import { Kanji } from "@/shared/model/db";
import "../../../app/ui/utils.css";

interface Props {
  kanji: Kanji;
  random: () => void;
}

const AnswerForm = ({ kanji, random }: Props) => {
  const { register, handleSubmit, reset } = useForm<AnswerInputType>();
  const [, setStatus] = useState(AnswerStatus.BEFORE);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const maxRound = useAtomValue(quizOptionRoundState);
  const [shake, setShake] = useState(false);
  const timeId = useRef<NodeJS.Timeout | null>(null);

  // handleSubmit이 data(input 값을) 인자로 호출
  const onSubmit = ({ answer }: AnswerInputType) => {
    if (answer === kanji[1]) {
      random();
      reset();
      setCurrentRound((prev) => {
        if (prev + 1 === maxRound) {
          console.log(123);
        }
        return prev + 1;
      });
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
      <Button
        variant="contained"
        style={{ flex: 1 }}
        onClick={handleSubmit(onSubmit)}
      >
        submit
      </Button>
      <Button
        style={{ flex: 1 }}
        onClick={() => {
          random();
          reset();
        }}
      >
        skip
      </Button>
    </>
  );
};

export default AnswerForm;
