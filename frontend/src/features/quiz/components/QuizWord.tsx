import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

import { quizCurrentKanjiState } from "@/entities/quiz/store";
import { QuizWordCategory } from "@/entities/quiz/types";
import { getMUIColorByCorrectRatio } from "@/shared/lib";
import { theme } from "@/shared/styles/theme";

import QuizWordCategoryChip from "./QuizWordCategoryChip";
import QuizWordHint from "./QuizWordHint";

const QuizWord = () => {
  // error가 발생한 경우는 상위 컴포넌트에서 처리되었기 때문에 !를 사용하였다.
  const [{ data: kanji }] = useAtom(quizCurrentKanjiState);
  const t = useTranslations("game");

  const difficulties = kanji!.meanings.map((meaning) => meaning.difficulty);
  const uniqueDifficulties = difficulties.filter(
    (item, index) => difficulties.indexOf(item) === index
  );
  const meaningsCategories: QuizWordCategory[] = uniqueDifficulties.map(
    (difficulty: string) => ({
      kind: "difficulty",
      value: difficulty,
      color: "primary",
    })
  );

  if (kanji!.meanings.length >= 2) {
    meaningsCategories.push({
      kind: "multianswer",
      value: t("multiAnswer"),
      color: "secondary",
    });
  }

  const categories: QuizWordCategory[] = meaningsCategories.concat([
    {
      kind: "correctRatio",
      value: kanji!.correctRatio + "%",
      color: getMUIColorByCorrectRatio(kanji!.correctRatio),
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
        <QuizWordHint />
      </QuizWordUtilityLayout>
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

const QuizWordUtilityLayout = styled.div`
  display: flex;
  width: 100%;
`;

const QuizWordCategoryLayout = styled.div`
  display: flex;
  width: 100%;
  gap: ${theme.spacing.small};
`;
