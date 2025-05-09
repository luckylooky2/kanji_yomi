import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import {
  quizUserGuideShowState,
  quizUserGuideStepState,
} from "@/entities/quiz/store";
import { QuizUserGuideType } from "@/entities/quiz/types";
import {
  wordMenuAnchorPositionState,
  wordMenuSelectedWordState,
} from "@/entities/wordMenu/store";
import QuizInputUserGuide from "@/features/quiz/components/QuizInputUserGuide";

import { quizUserGuideIndex } from "../model";

export function useQuizUserGuideStep() {
  const [userGuideStep, setUserGuideStep] = useAtom(quizUserGuideStepState);
  const [, setAnchorPosition] = useAtom(wordMenuAnchorPositionState);
  const [, setShowUserGuide] = useAtom(quizUserGuideShowState);
  const [, setSelectedWord] = useAtom(wordMenuSelectedWordState);
  const t = useTranslations("guide");

  const getQuizWordCoord = () => {
    const quizWordRect = document
      .getElementById("quiz-word")
      ?.getClientRects()[0];
    return {
      top: quizWordRect ? (quizWordRect.top + quizWordRect.bottom) / 2 : 0,
      left: quizWordRect ? quizWordRect.left : 0,
    };
  };

  const getCurrentWord = () => {
    return document.getElementById("quiz-word")?.textContent ?? "";
  };

  const quizUserGuideList: (QuizUserGuideType | null)[] = [
    null,
    {
      anchorEl: document.getElementById("answer-input"),
      position: "top",
      content: (
        <div>
          <div>
            {t("step1-content1")} <span>{t("step1-content2")}</span>
            {t("step1-content3")}
          </div>
          <div>&nbsp;• きょう &#40;O&#41;</div>
          <div>&nbsp;• 今日 &#40;X&#41;</div>
          <div>&nbsp;• キョウ &#40;X&#41;</div>
        </div>
      ),
      title: t("step1-title"),
    },
    {
      anchorEl: document.getElementById("answer-input"),
      position: "top",
      content: <QuizInputUserGuide />,
      title: t("step2-title"),
    },
    {
      anchorEl: document.getElementById("submit-button"),
      position: "top",
      content: (
        <div>
          <div>{t("step3-content1")}</div>
          <br />
          <div>{t("step3-content2")}</div>
        </div>
      ),
      title: t("step3-title"),
    },
    {
      anchorEl: document.getElementById("skip-button"),
      position: "top",
      content: <div>{t("step4-content1")}</div>,
      title: t("step4-title"),
    },
    {
      anchorEl: document.getElementById("progress-bar"),
      position: "bottom",
      content: t("step5-content1"),
      title: t("step5-title"),
    },
    {
      anchorEl: document.getElementById("quiz-word"),
      position: "top",
      content: t("step6-content1"),
      title: t("step6-title"),
    },
    {
      anchorEl: document.getElementById("quit-button"),
      position: "bottom",
      content: (
        <div>
          <div>{t("step7-content1")}</div>
          <br />
          <div>{t("step7-content2")}</div>
        </div>
      ),
      title: t("step7-title"),
    },
    {
      anchorEl: document.getElementById("finish-button"),
      position: "bottom",
      content: (
        <div>
          <div>{t("step8-content1")}</div>
          <br />
          <div>{t("step8-content2")}</div>
        </div>
      ),
      title: t("step8-title"),
    },
  ];

  const setPrevStep = () => {
    setUserGuideStep((prev) => {
      const prevIndex = prev - 1;
      setAnchorPosition(
        prevIndex === quizUserGuideIndex.HINT_MENU ? getQuizWordCoord() : null
      );
      setSelectedWord(getCurrentWord());
      return Math.max(0, prev - 1);
    });
  };

  const setNextStep = () => {
    setUserGuideStep((prev) => {
      const nextIndex = prev + 1;
      setAnchorPosition(
        nextIndex === quizUserGuideIndex.HINT_MENU ? getQuizWordCoord() : null
      );
      setSelectedWord(getCurrentWord());
      return Math.min(quizUserGuideList.length - 1, prev + 1);
    });
  };

  const initializeStep = () => {
    setUserGuideStep(0);
    setAnchorPosition(null);
  };

  const disableShowUserGuide = () => {
    setShowUserGuide(false);
    setAnchorPosition(null);
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
