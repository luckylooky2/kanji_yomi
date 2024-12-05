import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import Chip from "@mui/material/Chip";

import {
  QuizQuestionResponseDTO,
  QuizWordCategory,
} from "@/entities/quiz/types";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";

interface QuizWordProps {
  kanji: QuizQuestionResponseDTO | null;
}

const QuizWord = ({ kanji }: QuizWordProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);

  if (kanji === null) {
    return (
      <QuizWordLayout>
        <CircularProgress />
      </QuizWordLayout>
    );
  }

  const categories: QuizWordCategory[] = [
    { kind: "difficulty", value: kanji.difficulty, color: "primary" },
    // { kind: "topic", value: "Transport", color: "secondary" },
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
      <QuizWordWrapper>{kanji.word}</QuizWordWrapper>
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
  height: 100px;
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
