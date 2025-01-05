import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import { useAtom } from "jotai";

import { quizCurrentKanjiState } from "@/entities/quiz/store";
import { QuizWordCategory } from "@/entities/quiz/types";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";

const QuizWord = () => {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  // error가 발생한 경우는 상위 컴포넌트에서 처리되었기 때문에 !를 사용하였다.
  const [{ data: kanji }] = useAtom(quizCurrentKanjiState);

  const getMUIColorByCorrectRatio = (ratio: number) => {
    if (ratio >= 80) {
      return "success";
    } else if (ratio >= 50) {
      return "warning";
    } else {
      return "error";
    }
  };

  const categories: QuizWordCategory[] = [
    { kind: "difficulty", value: kanji!.difficulty, color: "primary" },
    {
      kind: "correctRatio",
      value: "Correct: " + kanji!.correctRatio + "%",
      color: getMUIColorByCorrectRatio(kanji!.correctRatio),
    },
  ];

  return (
    <QuizWordLayout>
      <QuizWordCategoryLayout>
        {categories.map((category, index) => (
          <Chip
            key={index}
            variant="outlined"
            color={category.color}
            size={isMobile ? "small" : "medium"}
            label={category.value}
            aria-label={category.value}
          />
        ))}
      </QuizWordCategoryLayout>
      <QuizWordWrapper>{kanji!.word}</QuizWordWrapper>
    </QuizWordLayout>
  );
};

export default QuizWord;

const QuizWordLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 130px;
  font-size: 50px;

  @media (min-width: 480px) {
    height: 250px;
  }
`;

const QuizWordWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuizWordCategoryLayout = styled.div`
  display: flex;
  width: 100%;
  gap: ${theme.spacing.small};
`;
