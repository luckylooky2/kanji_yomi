import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

import { QuizWordCategory } from "@/entities/quiz/types";
import WordMenuTrigger from "@/features/wordMenu/components/WordMenuTrigger";
import { useQuizQuestion } from "@/shared/hooks/useQuizQuestion";
import { getDifficultyColor, getMUIColorByCorrectRatio } from "@/shared/lib";
import { theme } from "@/shared/styles/theme";
import { DifficultyType } from "@/shared/types";

import QuizWordCategoryChip from "./QuizWordCategoryChip";

const QuizWord = () => {
  // error가 발생한 경우는 상위 컴포넌트에서 처리되었기 때문에 !를 사용하였다.
  const { data: kanji } = useQuizQuestion();
  const t = useTranslations("game");

  if (!kanji) {
    return <QuizWordLayout />;
  }

  const difficulties = kanji.meanings.map((meaning) => meaning.difficulty);
  const uniqueDifficulties = difficulties.filter(
    (item, index) => difficulties.indexOf(item) === index
  );
  const meaningsCategories: QuizWordCategory[] = uniqueDifficulties.map(
    (difficulty: DifficultyType) => ({
      kind: "difficulty",
      value: difficulty,
      color: getDifficultyColor(difficulty),
    })
  );

  if (kanji.meanings.length >= 2) {
    meaningsCategories.push({
      kind: "multianswer",
      value: t("multiAnswer"),
      color: "default",
    });
  }

  const categories: QuizWordCategory[] = meaningsCategories.concat([
    {
      kind: "correctRatio",
      value: kanji.correctRatio + "%",
      color: getMUIColorByCorrectRatio(kanji.correctRatio),
      variant: "outlined",
    },
  ]);

  return (
    <QuizWordLayout>
      <QuizWordUtilityLayout>
        <QuizWordCategoryLayout>
          {categories.map((category, index) => (
            <QuizWordCategoryChip key={index} category={category} />
          ))}
        </QuizWordCategoryLayout>
      </QuizWordUtilityLayout>
      <QuizWordWrapper>
        <WordMenuTrigger>
          <WordMenuTriggerContainer id="quiz-word">
            {kanji.word}
          </WordMenuTriggerContainer>
        </WordMenuTrigger>
      </QuizWordWrapper>
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

  height: 220px;

  @media (min-width: 480px) {
    height: 110px;
  }
`;

const QuizWordUtilityLayout = styled.div`
  display: flex;
  width: 100%;
`;

const QuizWordCategoryLayout = styled.div`
  display: flex;
  width: 100%;
  gap: ${theme.spacing.small};
`;

const WordMenuTriggerContainer = styled.div`
  padding: 0 20px;
`;
