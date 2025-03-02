"use client";

import styled from "@emotion/styled";

import { useQuizQuestion } from "@/shared/hooks/useQuizQuestion";
import ErrorComponent from "@/widgets/ErrorComponent/ErrorComponent";
// import MywordRegisterToggle from "@/features/myword/components/MywordRegisterToggle";

import QuizWord from "./QuizWord";

const QuizWordContainer = () => {
  const { error, refetch } = useQuizQuestion();

  if (error) {
    return (
      <ErrorComponent retryHandler={() => refetch()} message={error?.message} />
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
