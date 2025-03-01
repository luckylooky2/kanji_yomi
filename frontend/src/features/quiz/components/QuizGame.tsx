import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  quizUserGuideShowState,
  quizUserGuideStepState,
} from "@/entities/quiz/store";
import QuizAnswerForm from "@/features/quiz/components/QuizAnswerForm";
import QuizProgressBar from "@/features/quiz/components/QuizProgressBar";
import QuizStatusControlButtons from "@/features/quiz/components/QuizStatusControlButtons";
import QuizUserGuidePopover from "@/features/quiz/components/QuizUserGuidePopover";
import QuizWordContainer from "@/features/quiz/components/QuizWordContainer";
import { quizUserGuideIndex } from "@/shared/model";
import { theme } from "@/shared/styles/theme";

import QuizAnswerStatusPopupProvider from "./QuizAnswerStatusPopupProvider";

const QuizGame = () => {
  const [showUserGuide] = useAtom(quizUserGuideShowState);
  const [, setUserGuideStep] = useAtom(quizUserGuideStepState);

  useEffect(() => {
    if (showUserGuide) {
      setUserGuideStep(quizUserGuideIndex.ANSWER_INPUT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizGameContainer>
      <QuizUserGuidePopover />
      <QuizStatusControlButtons />
      <QuizProgressBar />
      <QuizWordContainer />
      <QuizAnswerStatusPopupProvider>
        <QuizAnswerForm />
      </QuizAnswerStatusPopupProvider>
    </QuizGameContainer>
  );
};

export default QuizGame;

const QuizGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
  justify-content: center;
  height: 100%;

  @media (min-width: 480px) {
    gap: ${theme.spacing.large};
  }
`;
