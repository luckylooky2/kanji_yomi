"use client";

import styled from "@emotion/styled";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { useEffect } from "react";

import {
  quizCurrentKanjiState,
  quizStartTimeState,
} from "@/entities/quiz/store";
// import MywordRegisterToggle from "@/features/myword/components/MywordRegisterToggle";
import { theme } from "@/shared/styles/theme";
import ResponsiveIcon from "@/widgets/ResponsiveIcon/ResponsiveIcon";

import QuizWord from "./QuizWord";

const QuizWordContainer = () => {
  const setStartTime = useSetAtom(quizStartTimeState);
  const [{ error }, refreshKanji] = useAtom(quizCurrentKanjiState);

  useEffect(() => {
    setStartTime(dayjs(new Date()));
  }, []);

  if (error) {
    return (
      <ErrorComponentContainer>
        <div>
          <Image src="/warning.png" width="30" height="30" alt="Error" />
          {error?.message}
        </div>
        <IconButton aria-label="retry" onClick={() => refreshKanji()}>
          <ResponsiveIcon icon={ReplayIcon} />
        </IconButton>
      </ErrorComponentContainer>
    );
  }

  return (
    <QuizWordSection>
      {/* <MywordRegisterToggle /> */}
      <QuizWord />
    </QuizWordSection>
  );
};

export default QuizWordContainer;

const QuizWordSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const ErrorComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 130px;
  gap: ${theme.spacing.small};
  font-size: 25px;

  @media (min-width: 480px) {
    height: 280px;
  }

  div {
    display: flex;
    gap: ${theme.spacing.small};
  }
`;
