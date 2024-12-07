import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

import {
  timeFormattingFn,
  percentFormattingFn,
  getColorByAccuracy,
} from "@/entities/quizResult/lib";
import { theme } from "@/shared/styles/theme";

interface Props {
  title: string;
  content: number;
  format: "percent" | "time";
  option?: number;
}

const QuizResultStatItem = ({ title, content, format, option }: Props) => {
  const countupRef = useRef(null);
  let countUpAnim;

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current!, content, {
      formattingFn: format === "time" ? timeFormattingFn : percentFormattingFn,
    });
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  useEffect(() => {
    initCountUp();
  }, []);

  return (
    <QuizResultStatItemLayout>
      <span>{title}</span>
      <QuizResultStatContent ref={countupRef} option={option}>
        0
      </QuizResultStatContent>
    </QuizResultStatItemLayout>
  );
};

export default QuizResultStatItem;

const QuizResultStatItemLayout = styled.article`
  display: flex;
  flex-direction: column;
  width: 100px;

  span {
    text-align: center;
  }
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
