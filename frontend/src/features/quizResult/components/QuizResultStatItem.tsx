import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

import { theme } from "@/shared/styles/theme";

interface Props {
  title: string;
  content: number;
  formattingFn?: (_n: number) => string;
  colorFormattingFn?: (_n: number) => "green" | "orange" | "red" | "black";
}

const QuizResultStatItem = ({
  title,
  content,
  formattingFn = (n: number) => n.toString(),
  colorFormattingFn = () => "black",
}: Props) => {
  const countupRef = useRef(null);
  let countUpAnim;

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current!, content, {
      formattingFn,
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
      <QuizResultStatContent
        ref={countupRef}
        colorFormattingFn={colorFormattingFn}
        contents={content}
      >
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

const QuizResultStatContent = styled.div<{
  colorFormattingFn: (_n: number) => "green" | "orange" | "red" | "black";
  contents: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${theme.fontSize.large};
  font-weight: bold;
  color: ${({ colorFormattingFn, contents }) => colorFormattingFn(contents)};
`;
