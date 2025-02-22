import { useAtom } from "jotai";

import { quizUserGuideStepState } from "@/entities/quiz/store";
import { QuizUserGuideType } from "@/entities/quiz/types";

export function useQuizUserGuideStep() {
  const [userGuideStep, setUserGuideStep] = useAtom(quizUserGuideStepState);

  const quizUserGuideList: (QuizUserGuideType | null)[] = [
    null,
    {
      anchorEl: document.getElementById("progress-bar"),
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      transformOrigin: { vertical: "top", horizontal: "center" },
      arrowPosition: "top",
      content: "This is Content.",
      title: "Round",
    },
    {
      anchorEl: document.getElementById("answer-input"),
      anchorOrigin: { vertical: "top", horizontal: "center" },
      transformOrigin: { vertical: "bottom", horizontal: "center" },
      arrowPosition: "bottom",
      content:
        "This is Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc.This is Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc.This is Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nunc.",
      title: "Input",
    },
    {
      anchorEl: document.getElementById("quit-button"),
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      transformOrigin: { vertical: "top", horizontal: "center" },
      arrowPosition: "top",
      content: "This is Content.",
      title: "Quit",
    },
    {
      anchorEl: document.getElementById("finish-button"),
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      transformOrigin: { vertical: "top", horizontal: "center" },
      arrowPosition: "top",
      content: "This is Content.",
      title: "Finish",
    },
  ];

  return {
    currStep: userGuideStep,
    finalStep: quizUserGuideList.length - 1,
    guideContent: quizUserGuideList[userGuideStep],
    setPrevStep: () => setUserGuideStep((prev) => Math.max(0, prev - 1)),
    setNextStep: () =>
      setUserGuideStep((prev) =>
        Math.min(quizUserGuideList.length - 1, prev + 1)
      ),
    initializeStep: () => setUserGuideStep(0),
  };
}
