import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  quizHintMenuOpenState,
  quizUserGuideStepState,
} from "@/entities/quiz/store";
import { QuizUserGuideType } from "@/entities/quiz/types";

import { quizUserGuideIndex } from "../model";

export function useQuizUserGuideStep() {
  const [userGuideStep, setUserGuideStep] = useAtom(quizUserGuideStepState);
  const [, setIsHintMenuOpen] = useAtom(quizHintMenuOpenState);

  const quizUserGuideList: (QuizUserGuideType | null)[] = [
    null,
    {
      anchorEl: document.getElementById("answer-input"),
      position: "top",
      content:
        "This is Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc.This is Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc.This is Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc.",
      title: "Input",
    },
    {
      anchorEl: document.getElementById("submit-button"),
      position: "top",
      content: "This is Content.",
      title: "Submit",
    },
    {
      anchorEl: document.getElementById("skip-button"),
      position: "top",
      content: "This is Content.",
      title: "Skip",
    },
    {
      anchorEl: document.getElementById("progress-bar"),
      position: "bottom",
      content: "This is Content.",
      title: "Round",
    },
    {
      anchorEl: document.getElementById("quiz-hint"),
      position: "top",
      content: "This is Content.",
      title: "Menu",
    },
    {
      anchorEl: document.getElementById("quit-button"),
      position: "bottom",
      content: "This is Content.",
      title: "Quit",
    },
    {
      anchorEl: document.getElementById("finish-button"),
      position: "bottom",
      content: "This is Content.",
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
  };
}
