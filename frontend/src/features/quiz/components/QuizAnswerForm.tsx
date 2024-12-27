import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import throttle from "lodash/throttle";
import React, { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  quizCurrentRoundState,
  quizStatusState,
  quizCurrentKanjiState,
  quizResultState,
  quizAnswerResultState,
} from "@/entities/quiz/store";
import {
  AnswerInputType,
  AnswerStatus,
  QuizResult,
  QuizStatus,
} from "@/entities/quiz/types";
import { quizOptionRoundState } from "@/entities/quizOption/store";
import { theme } from "@/shared/styles/theme";

import "../../../../public/styles/utils.css";

const QuizAnswerForm = () => {
  const {
    register,
    handleSubmit,
    reset: resetInput,
  } = useForm<AnswerInputType>();
  const [, setStatus] = useState(AnswerStatus.BEFORE);
  const setCurrentRound = useSetAtom(quizCurrentRoundState);
  const setQuizStatus = useSetAtom(quizStatusState);
  const [, inquireAnswer] = useAtom(quizAnswerResultState);
  const maxRound = useAtomValue(quizOptionRoundState);
  const [quizResult, setQuizResult] = useAtom(quizResultState);
  const { data: kanji, error: errorCurrentKanji } = useAtomValue(
    quizCurrentKanjiState
  );
  const [shake, setShake] = useState(false);
  const timeId = useRef<NodeJS.Timeout | null>(null);
  // 화면 전환시 초기화됨에 주의
  const retries = useRef(0);

  const getNextQuestion = (result: QuizResult) => {
    setQuizResult((prev) => [...prev, result]);
    retries.current = 0;
    resetInput();
    setCurrentRound((prev) => {
      if (prev + 1 === maxRound) {
        setQuizStatus(QuizStatus.RESULT);
      }
      return prev + 1;
    });
  };

  const onSubmit = async ({ answer }: AnswerInputType) => {
    if (!answer) {
      toast.info("Please fill in the answer.");
      return;
    }

    // answer은 이 컴포넌트에 강하게 결합되어 있어, 상태값으로 사용할 경우 동기적으로 answer이 전달이 불가능하다.
    const { data: answerResult, error: errorInquireAnswer } =
      await inquireAnswer(answer);

    if (errorInquireAnswer) {
      toast.error("Network Error: Please try again.");
      return;
    }

    if (answerResult?.result) {
      getNextQuestion({
        word: kanji!.word,
        meaning: answerResult.meaning,
        skipped: false,
        retries: retries.current,
      });
    } else {
      triggerShake();
      retries.current++;
    }
  };

  const throttledOnSubmit = useMemo(() => throttle(onSubmit, 500), [kanji]);

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
    getNextQuestion({
      word: kanji!.word,
      meaning: null,
      skipped: true,
      retries: retries.current,
    });
  };

  return (
    <QuizAnswerSection>
      <form onSubmit={handleSubmit(throttledOnSubmit)}>
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
        onClick={handleSubmit(throttledOnSubmit)}
        disabled={!!errorCurrentKanji}
      >
        submit
      </Button>
      <Button onClick={handleSkip} disabled={!!errorCurrentKanji}>
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
