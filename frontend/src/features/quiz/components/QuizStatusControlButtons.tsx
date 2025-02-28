import styled from "@emotion/styled";
import ArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

import { useModal } from "@/features/modal/hooks/useModal";
import { useQuizUserGuideStep } from "@/shared/hooks/useQuizUserGuideStep";
import { quizUserGuideIndex } from "@/shared/model";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

import QuizFinishModal from "./QuizFinishModal";
import QuizQuitModal from "./QuizQuitModal";

const QuizStatusControlButtons = () => {
  const { isOpen: isQuitModalOpen, setIsOpen: setIsQuitModalOpen } = useModal();
  const { isOpen: isFinishModalOpen, setIsOpen: setIsFinishModalOpen } =
    useModal();
  const { currStep } = useQuizUserGuideStep();
  const t = useTranslations("game");

  const handleQuit = () => {
    setIsQuitModalOpen(true);
  };

  const handleFinish = () => {
    setIsFinishModalOpen(true);
  };

  return (
    <>
      <QuizQuitModal isOpen={isQuitModalOpen} setIsOpen={setIsQuitModalOpen} />
      <QuizFinishModal
        isOpen={isFinishModalOpen}
        setIsOpen={setIsFinishModalOpen}
      />
      <QuizStatusControlButtonsLayout>
        <QuizQuitButton
          id="quit-button"
          variant="text"
          color="error"
          onClick={handleQuit}
          isGuideSelected={currStep === quizUserGuideIndex.QUIT_BUTTON}
        >
          <ResponsiveIcon icon={ArrowLeftIcon} /> {t("quit")}
        </QuizQuitButton>
        <QuizFinishButton
          id="finish-button"
          variant="text"
          color="error"
          onClick={handleFinish}
          isGuideSelected={currStep === quizUserGuideIndex.FINISH_BUTTON}
        >
          {t("finish")} <ResponsiveIcon icon={ArrowRightIcon} />
        </QuizFinishButton>
      </QuizStatusControlButtonsLayout>
    </>
  );
};

export default QuizStatusControlButtons;

const QuizStatusControlButtonsLayout = styled.section`
  display: flex;
  justify-content: space-between;
`;

const QuizQuitButton = styled(Button)<{ isGuideSelected?: boolean }>`
  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
  z-index: 10000;
  background-color: white;
  transform: scale(1.1);
  `}
`;

const QuizFinishButton = styled(Button)<{ isGuideSelected?: boolean }>`
  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
  z-index: 10000;
  background-color: white;
  transform: scale(1.1);
  `}
`;
