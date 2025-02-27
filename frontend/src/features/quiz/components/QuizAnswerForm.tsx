import styled from "@emotion/styled";
import HelpIcon from "@mui/icons-material/Help";
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
import { useQuizUserGuideStep } from "@/shared/hooks/useQuizUserGuideStep";
import { quizUserGuideIndex } from "@/shared/model";
import { theme } from "@/shared/styles/theme";

import "../../../../public/styles/utils.css";
import { useTranslations } from "next-intl";

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
  const { currStep, setNextStep } = useQuizUserGuideStep();
  const t = useTranslations("game");

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
        .getElementById("quit-button")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleSkip = () => {
    getNextQuestion(true);
  };

  const handleStartUserGuide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNextStep();
  };

  return (
    <QuizAnswerSection>
      <QuizAnswerFormWrapper onSubmit={handleSubmit(throttledOnSubmit)}>
        <QuizAnswerInput
          {...register("answer")}
          id="answer-input"
          className={shake ? "shake" : ""}
          autoComplete="off"
          placeholder={`${t("placeholder")} きょう, あした`}
          onFocus={handlePullUpScrollToTarget}
          isGuideSelected={
            currStep === quizUserGuideIndex.ANSWER_INPUT ||
            currStep === quizUserGuideIndex.HOW_TO_SET_HIRAGANA
          }
        />
        <QuizStartUserGuideButton onClick={handleStartUserGuide}>
          <HelpIcon />
        </QuizStartUserGuideButton>
      </QuizAnswerFormWrapper>
      <QuizAnswerSubmitButton
        id="submit-button"
        variant="contained"
        onClick={handleSubmit(throttledOnSubmit)}
        disabled={!!errorCurrentKanji}
        isGuideSelected={currStep === quizUserGuideIndex.SUBMIT_BUTTON}
      >
        {t("submit")}
      </QuizAnswerSubmitButton>
      <QuizAnswerSkipButton
        id="skip-button"
        variant="outlined"
        onClick={handleSkip}
        disabled={!!errorCurrentKanji}
        isGuideSelected={currStep === quizUserGuideIndex.SKIP_BUTTON}
      >
        {t("skip")}
      </QuizAnswerSkipButton>
    </QuizAnswerSection>
  );
};

export default QuizAnswerForm;

const QuizAnswerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;

const QuizAnswerFormWrapper = styled.form`
  display: flex;
  gap: ${theme.spacing.xsmall};
`;

const QuizAnswerInput = styled.input<{ isGuideSelected?: boolean }>`
  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
    z-index: 10000;
    background-color: white;
    transform: scale(1.1);
    `}
`;

const QuizAnswerSubmitButton = styled(Button)<{ isGuideSelected?: boolean }>`
  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
  z-index: 10000;
  transform: scale(1.1);
  `}
`;

const QuizAnswerSkipButton = styled(Button)<{ isGuideSelected?: boolean }>`
  background-color: white;

  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
  z-index: 10000;
  transform: scale(1.1);
  `}
`;

const QuizStartUserGuideButton = styled(Button)`
  min-width: 0;
`;
