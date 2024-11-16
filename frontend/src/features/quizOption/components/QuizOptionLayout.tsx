import styled from "@emotion/styled";
import { ReactNode } from "react";

import { theme } from "@/shared/styles/theme";

interface Props {
  title: string;
  children: ReactNode;
}

const QuizOptionLayout = ({ title, children }: Props) => {
  return (
    <QuizOptionWrapper aria-labelledby="option-title">
      <h3 id="option-title">{title}</h3>
      <QuizOptionItem>{children}</QuizOptionItem>
    </QuizOptionWrapper>
  );
};

export default QuizOptionLayout;

const QuizOptionWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;

const QuizOptionItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
