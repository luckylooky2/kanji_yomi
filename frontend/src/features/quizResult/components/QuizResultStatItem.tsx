import styled from "@emotion/styled";

import { getColorByAccuracy } from "@/entities/quizResult/lib";
import { theme } from "@/shared/styles/theme";
import CustomDivider from "@/widgets/custom/CustomDivider";

interface Props {
  title: string;
  content: string;
  option?: number;
}

const QuizResultStatItem = ({ title, content, option }: Props) => {
  return (
    <QuizResultStatItemLayout>
      <CustomDivider>{title}</CustomDivider>
      <QuizResultStatContent option={option}>{content}</QuizResultStatContent>
    </QuizResultStatItemLayout>
  );
};

export default QuizResultStatItem;

const QuizResultStatItemLayout = styled.article`
  display: flex;
  flex-direction: column;
`;

const QuizResultStatContent = styled.div<{ option?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${theme.fontSize.large};
  font-weight: bold;
  color: ${(props) => getColorByAccuracy(props.option)};
`;
