import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import throttle from "lodash/throttle";
import React, { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  quizCurrentRoundState,
  quizStatusState,
  quizCurrentKanjiState,
  quizAnswerResultState,
  quizTimerState,
  quizCurrentRetries,
} from "@/entities/quiz/store";
import {
  AnswerInputType,
  AnswerStatus,
  QuizStatus,
} from "@/entities/quiz/types";
import { quizOptionRoundState } from "@/entities/quizOption/store";
import { quizResultFilter, quizResultState } from "@/entities/quizResult/store";
import { theme } from "@/shared/styles/theme";

import "../../../../public/styles/utils.css";

const QuizAnswerForm = () => {
  const maxRound = useAtomValue(quizOptionRoundState);
  const [currentRound, setCurrentRound] = useAtom(quizCurrentRoundState);
  const setQuizStatus = useSetAtom(quizStatusState);
  const [, inquireAnswer] = useAtom(quizAnswerResultState);
  const { data: kanji, error: errorCurrentKanji } = useAtomValue(
    quizCurrentKanjiState
  );
  const [quizTimer, setQuizTimer] = useAtom(quizTimerState);
  const [, setRetries] = useAtom(quizCurrentRetries);
  const [, setFilter] = useAtom(quizResultFilter);
  const [, setQuizResult] = useAtom(quizResultState);
  const [shake, setShake] = useState(false);
  const [, setStatus] = useState(AnswerStatus.BEFORE);
  const {
    register,
    handleSubmit,
    reset: resetInput,
  } = useForm<AnswerInputType>();
  const timeId = useRef<NodeJS.Timeout | null>(null);

  const getNextQuestion = (isSkipped: boolean) => {
    setRetries((prevRetries) => {
      setQuizResult((prevQuizResult) => [
        ...prevQuizResult,
        {
          round: currentRound,
          word: kanji!.word,
          meanings: kanji!.meanings,
          skipped: isSkipped,
          retries: prevRetries,
          type: isSkipped
            ? "Skipped"
            : prevRetries === 0
            ? "Correct"
            : "Retried",
        },
      ]);
      return 0;
    });
    resetInput();
    setCurrentRound((prev) => {
      if (prev + 1 === maxRound) {
        setQuizStatus(QuizStatus.RESULT);
        setFilter("All");
        setQuizTimer({ ...quizTimer, quizEndTime: dayjs(new Date()) });
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
      getNextQuestion(false);
    } else {
      triggerShake();
      setRetries((prev) => prev + 1);
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
    getNextQuestion(true);
  };

  return (
    <QuizAnswerSection>
      <form onSubmit={handleSubmit(throttledOnSubmit)}>
        <input
          {...register("answer")}
          className={shake ? "shake" : ""}
          autoComplete="off"
          placeholder="Type in Hiragana. ex) きょう, あした"
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
      <Button
        variant="outlined"
        onClick={handleSkip}
        disabled={!!errorCurrentKanji}
      >
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
