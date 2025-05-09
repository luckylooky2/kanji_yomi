import styled from "@emotion/styled";
import HelpIcon from "@mui/icons-material/Help";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState, useRef, MouseEvent, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  quizCurrentRoundState,
  quizStatusState,
  quizTimerState,
  quizCurrentRetries,
  quizAnswerInputState,
} from "@/entities/quiz/store";
import { AnswerStatus, QuizStatus } from "@/entities/quiz/types";
import { quizOptionRoundState } from "@/entities/quizOption/store";
import { quizResultFilter, quizResultState } from "@/entities/quizResult/store";
import { useDelayFetching } from "@/shared/hooks/useDelayFetching";
import { useQuizQuestion } from "@/shared/hooks/useQuizQuestion";
import { useQuizUserGuideStep } from "@/shared/hooks/useQuizUserGuideStep";
import { useQuizStartFinish } from "@/shared/hooks/useStartFinishQuiz";
import { quizUserGuideIndex } from "@/shared/model";
import { theme } from "@/shared/styles/theme";

import "../../../../public/styles/utils.css";
import { QuizService } from "../api";

import { usePopup } from "./QuizAnswerStatusPopupProvider";

const QuizAnswerForm = () => {
  const maxRound = useAtomValue(quizOptionRoundState);
  const [userAnswer, setUserAnswer] = useAtom(quizAnswerInputState);
  const setQuizStatus = useSetAtom(quizStatusState);
  const [, setRetries] = useAtom(quizCurrentRetries);
  const [, setFilter] = useAtom(quizResultFilter);
  const [, setQuizResult] = useAtom(quizResultState);
  const [currentRound, setCurrentRound] = useAtom(quizCurrentRoundState);
  const [quizTimer, setQuizTimer] = useAtom(quizTimerState);
  const [shake, setShake] = useState(false);
  const [, setStatus] = useState(AnswerStatus.BEFORE);
  const timeId = useRef<NodeJS.Timeout | null>(null);
  const { currStep, setNextStep } = useQuizUserGuideStep();
  const t = useTranslations("game");
  const {
    data: kanji,
    isError,
    isFetching: isQuestionFetching,
  } = useQuizQuestion();
  const { handleSubmit } = useForm();
  const popup = usePopup();
  const { fetchQuizFinish, isQuizFinishFetchingDelay, isQuizFinishFetching } =
    useQuizStartFinish();
  const { refetch, isFetching: isAnswerFetching } = useQuery({
    queryKey: ["quizAnswer"],
    queryFn: queryFn,
    retry: false,
    enabled: false,
  });
  const isQuestionFetchingDelay = useDelayFetching(isQuestionFetching);
  const isAnswerFetchingDelay = useDelayFetching(isAnswerFetching);

  async function queryFn() {
    if (!kanji) {
      return;
    }

    return QuizService.getAnswer({
      id: kanji.id,
      word: kanji.word,
      answer: userAnswer,
    }).catch(() => {
      throw new Error("Failed to fetch answer: Please try again later");
    });
  }

  const handleQuizFinish = async () => {
    if (isQuizFinishFetching) {
      return;
    }

    // 비동기 작업을 수행
    await fetchQuizFinish();

    // 비동기 작업이 끝난 후 상태 업데이트
    setQuizStatus(QuizStatus.RESULT);
    setFilter("All");
    setQuizTimer({ ...quizTimer, quizEndTime: dayjs(new Date()) });
  };

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
    setUserAnswer("");
    setCurrentRound((prev) => {
      if (prev === maxRound) {
        handleQuizFinish();
        return prev;
      }
      return prev + 1;
    });
  };

  const onSubmit = async () => {
    if (!userAnswer) {
      // 답을 입력하지 않은 경우
      popup.info(t("popup-noinput"));
      return;
    }

    if (isAnswerFetching) {
      return;
    }

    const { data: answerResult, isError, error } = await refetch();

    if (isError) {
      toast.error(error.message);
      return;
    }

    if (answerResult.result) {
      popup.success(t("popup-correct"));
      getNextQuestion(false);
    } else {
      // 틀린 경우
      popup.error(t("popup-incorrect"));
      triggerShake();
      setRetries((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (isQuestionFetching) {
      return;
    }

    getNextQuestion(true);
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
    }, 1500);
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

  const handleStartUserGuide = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNextStep();
  };

  const handleUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  return (
    <QuizAnswerSection>
      <QuizAnswerWrapper onSubmit={handleSubmit(onSubmit)}>
        <QuizAnswerInput
          id="answer-input"
          className={shake ? "shake" : ""}
          autoComplete="off"
          value={userAnswer}
          placeholder={`${t("placeholder")} きょう, あした`}
          onChange={handleUserAnswer}
          onFocus={handlePullUpScrollToTarget}
          isGuideSelected={
            currStep === quizUserGuideIndex.ANSWER_INPUT ||
            currStep === quizUserGuideIndex.HOW_TO_SET_HIRAGANA
          }
        />
        <QuizStartUserGuideButton onClick={handleStartUserGuide}>
          <HelpIcon />
        </QuizStartUserGuideButton>
      </QuizAnswerWrapper>
      <QuizAnswerSubmitButton
        id="submit-button"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={
          isError ||
          isQuizFinishFetchingDelay ||
          isQuestionFetchingDelay ||
          isAnswerFetchingDelay
        }
        isGuideSelected={currStep === quizUserGuideIndex.SUBMIT_BUTTON}
      >
        {isQuizFinishFetchingDelay ||
        isAnswerFetchingDelay ||
        isQuestionFetchingDelay ? (
          <CircularProgress size={24.5} />
        ) : (
          t("submit")
        )}
      </QuizAnswerSubmitButton>
      <QuizAnswerSkipButton
        id="skip-button"
        variant="outlined"
        onClick={handleSkip}
        disabled={
          isError ||
          isQuizFinishFetchingDelay ||
          isQuestionFetchingDelay ||
          isAnswerFetchingDelay
        }
        isGuideSelected={currStep === quizUserGuideIndex.SKIP_BUTTON}
      >
        {isQuizFinishFetchingDelay ||
        isQuestionFetchingDelay ||
        isAnswerFetchingDelay ? (
          <CircularProgress size={24.5} />
        ) : (
          t("skip")
        )}
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

const QuizAnswerWrapper = styled.form`
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
