import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";

import {
  quizResultState,
  quizStartTime,
  quizStatusState,
  quizTotalRetriesState,
} from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import {
  calculateAccuracy,
  calculateTime,
  getImageSource,
} from "@/entities/quizResult/lib";
import { theme } from "@/shared/styles/theme";

import QuizResultStatItem from "./QuizResultStatItem";

const QuizResult = () => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const [quizResult, setQuizResult] = useAtom(quizResultState);
  const [correct, totalRetries] = useAtomValue(quizTotalRetriesState);
  const accuracy = calculateAccuracy(correct, totalRetries);
  const startTime = useAtomValue(quizStartTime);

  const handleGoToQuizOption = () => {
    setQuizStatus(QuizStatus.OPTION);
    setQuizResult([]);
  };

  return (
    <QuizResultContainer>
      <h1>Result</h1>
      <QuizResultStat>
        <QuizResultStatItem
          title="Accuracy"
          content={accuracy + "%"}
          option={accuracy}
        />
        <QuizResultStatItem title="Time" content={calculateTime(startTime)} />
      </QuizResultStat>
      <QuizResultGrid>
        {quizResult.length ? (
          <QuizResultGridLayout>
            {quizResult.map((item, index) => {
              const { src, alt } = getImageSource(item.skipped, item.retries);
              return (
                <QuizResultWordItem key={`${item} + ${index}`}>
                  <Image src={src} alt={alt} width="20" height="20" />
                  <strong>{item.word}</strong>
                </QuizResultWordItem>
              );
            })}
          </QuizResultGridLayout>
        ) : (
          <QuizResultGridEmpty>
            Play and learn more words :)
          </QuizResultGridEmpty>
        )}
      </QuizResultGrid>

      <Button variant="contained" onClick={handleGoToQuizOption}>
        Go To Quiz Option
      </Button>
    </QuizResultContainer>
  );
};

export default QuizResult;

const QuizResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const QuizResultStat = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.small};
`;

const QuizResultGrid = styled.section`
  height: 50%;
  border: 3px solid transparent;
  border-radius: ${theme.radius.medium};
  background-color: lightgray;
  padding: ${theme.spacing.medium};
  font-size: ${theme.fontSize.medium};
  overflow-y: auto;
`;

const QuizResultGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const QuizResultGridEmpty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
`;

const QuizResultWordItem = styled.article`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: ${theme.spacing.small} 0;
  gap: ${theme.spacing.small};
`;
