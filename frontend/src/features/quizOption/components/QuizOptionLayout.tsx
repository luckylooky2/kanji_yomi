import styled from "@emotion/styled";
import { ReactNode } from "react";

import { theme } from "@/shared/styles/theme";

interface Props {
  title: string;
  children: ReactNode;
  spacing?: "small" | "medium" | "large";
}

const QuizOptionLayout = ({ title, children, spacing = "small" }: Props) => {
  return (
    <QuizOptionWrapper aria-labelledby="option-title" spacing={spacing}>
      <h3 id="option-title">{title}</h3>
      <QuizOptionItem>{children}</QuizOptionItem>
    </QuizOptionWrapper>
  );
};

export default QuizOptionLayout;

const QuizOptionWrapper = styled.article<{
  spacing: "small" | "medium" | "large";
}>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => theme.spacing[props.spacing]}};

  div {
    justify-content: center;
  }
`;

const QuizOptionItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
