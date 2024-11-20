import styled from "@emotion/styled";
import { ReactNode } from "react";

import { theme } from "@/shared/styles/theme";
import CustomDivider from "@/widgets/custom/CustomDivider";

interface Props {
  title: string;
  children: ReactNode;
  spacing?: "small" | "medium" | "large";
}

const QuizOptionLayout = ({ title, children, spacing = "small" }: Props) => {
  return (
    <QuizOptionWrapper aria-labelledby="option-title" spacing={spacing}>
      <CustomDivider>{title}</CustomDivider>
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
  gap: ${(props) => theme.spacing[props.spacing]};
  padding: ${theme.spacing.medium};
  border-radius: ${theme.radius.large};

  div {
    justify-content: center;
  }
`;

const QuizOptionItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
