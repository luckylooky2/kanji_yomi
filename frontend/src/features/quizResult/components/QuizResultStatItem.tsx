import styled from "@emotion/styled";

import { getColorByAccuracy } from "@/entities/quizResult/lib";
import { theme } from "@/shared/styles/theme";

interface Props {
  title: string;
  content: string;
  option?: number;
}

const QuizResultStatItem = ({ title, content, option }: Props) => {
  return (
    <QuizResultStatItemLayout>
      <QuizResultStatTitle>&nbsp;{title}&nbsp;</QuizResultStatTitle>
      <QuizResultStatContent option={option}>{content}</QuizResultStatContent>
    </QuizResultStatItemLayout>
  );
};

export default QuizResultStatItem;

const QuizResultStatItemLayout = styled.div`
  height: 60px;
  width: 140px;
  border: 3px solid gray;
  border-radius: ${theme.radius.medium};
  position: relative;
`;

const QuizResultStatTitle = styled.h4`
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

interface QuizResultStatContentProps {
  option?: number;
}

const QuizResultStatContent = styled.div<QuizResultStatContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  font-size: ${theme.fontSize.large};
  font-weight: bold;
  color: ${(props) => getColorByAccuracy(props.option)};
`;
