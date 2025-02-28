"use client";

import styled from "@emotion/styled";
import { useAtom } from "jotai";

import { quizCurrentKanjiState } from "@/entities/quiz/store";
import ErrorComponent from "@/widgets/ErrorComponent/ErrorComponent";
// import MywordRegisterToggle from "@/features/myword/components/MywordRegisterToggle";

import QuizWord from "./QuizWord";

const QuizWordContainer = () => {
  const [{ error }, refreshKanji] = useAtom(quizCurrentKanjiState);

  if (error) {
    return (
      <ErrorComponent
        retryHandler={() => refreshKanji()}
        message={error?.message}
      />
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
