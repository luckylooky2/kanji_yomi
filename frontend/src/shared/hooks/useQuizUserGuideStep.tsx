import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  quizHintMenuOpenState,
  quizUserGuideShowState,
  quizUserGuideStepState,
} from "@/entities/quiz/store";
import { QuizUserGuideType } from "@/entities/quiz/types";

import { quizUserGuideIndex } from "../model";

import QuizInputUserGuide from "./QuizInputUserGuide";

export function useQuizUserGuideStep() {
  const [userGuideStep, setUserGuideStep] = useAtom(quizUserGuideStepState);
  const [, setIsHintMenuOpen] = useAtom(quizHintMenuOpenState);
  const [, setShowUserGuide] = useAtom(quizUserGuideShowState);

  const quizUserGuideList: (QuizUserGuideType | null)[] = [
    null,
    {
      anchorEl: document.getElementById("answer-input"),
      position: "top",
      content: (
        <div>
          <div>
            The answer should be submitted in <span>Japanese Hiragana</span>{" "}
            only.
          </div>
          <div>&nbsp;• きょう &#40;O&#41;</div>
          <div>&nbsp;• 今日 &#40;X&#41;</div>
          <div>&nbsp;• キョウ &#40;X&#41;</div>
        </div>
      ),
      title: "Input Format",
    },
    {
      anchorEl: document.getElementById("answer-input"),
      position: "top",
      content: <QuizInputUserGuide />,
      title: "Japanese Keyboard Setup",
    },
    {
      anchorEl: document.getElementById("submit-button"),
      position: "top",
      content: (
        <div>
          <div>Press ENTER or SUBMIT BUTTON to submit the answer.</div>
          <br />
          <div>
            If it’s correct, you will proceed to the next question. Otherwise,
            you can enter the answer again.
          </div>
        </div>
      ),
      title: "Submit",
    },
    {
      anchorEl: document.getElementById("skip-button"),
      position: "top",
      content: (
        <div>
          If you don’t know the answer, you can press the SKIP BUTTON to move to
          the next question.
        </div>
      ),
      title: "Skip",
    },
    {
      anchorEl: document.getElementById("progress-bar"),
      position: "bottom",
      content: "Shows the current round and the total rounds.",
      title: "Quiz Rounds",
    },
    {
      anchorEl: document.getElementById("quiz-hint"),
      position: "top",
      content: (
        <div>
          <div>Listen with TTS or check how to read it in the Dictionary.</div>
        </div>
      ),
      title: "Hints",
    },
    {
      anchorEl: document.getElementById("quit-button"),
      position: "bottom",
      content: (
        <div>
          <div>Return to Quiz option page.</div>
          <br />
          <div>The current quiz progress will not be saved.</div>
        </div>
      ),
      title: "Quit",
    },
    {
      anchorEl: document.getElementById("finish-button"),
      position: "bottom",
      content: (
        <div>
          <div>Move immediately to Quiz result page.</div>
          <br />
          <div>You can click without completing all rounds.</div>
        </div>
      ),
      title: "Finish",
    },
  ];

  const setPrevStep = () => {
    setUserGuideStep((prev) => {
      const prevIndex = prev - 1;
      setIsHintMenuOpen(prevIndex === quizUserGuideIndex.HINT_MENU);
      return Math.max(0, prev - 1);
    });
  };

  const setNextStep = () => {
    setUserGuideStep((prev) => {
      const nextIndex = prev + 1;
      setIsHintMenuOpen(nextIndex === quizUserGuideIndex.HINT_MENU);
      return Math.min(quizUserGuideList.length - 1, prev + 1);
    });
  };

  const initializeStep = () => {
    setIsHintMenuOpen(false);
    setUserGuideStep(0);
  };

  const disableShowUserGuide = () => {
    setShowUserGuide(false);
  };

  useEffect(() => {
    return () => {
      initializeStep();
    };
  }, []);

  return {
    currStep: userGuideStep,
    finalStep: quizUserGuideList.length - 1,
    guideContent: quizUserGuideList[userGuideStep],
    setPrevStep,
    setNextStep,
    initializeStep,
    disableShowUserGuide,
  };
}
