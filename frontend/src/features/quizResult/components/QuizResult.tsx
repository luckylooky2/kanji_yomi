import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import NextImage from "next/image";
import { useEffect, useState } from "react";

import {
  quizResultState,
  quizStartTimeState,
  quizStatusState,
  quizTotalRetriesState,
} from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import {
  calculateAccuracy,
  findImageSource,
  getImageSourceList,
  getTotalSeconds,
} from "@/entities/quizResult/lib";
import { theme } from "@/shared/styles/theme";
import Loading from "@/widgets/Loading/Loading";

import QuizResultStatItem from "./QuizResultStatItem";

const QuizResult = () => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const [quizResult] = useAtom(quizResultState);
  const [correct, totalRetries] = useAtomValue(quizTotalRetriesState);
  const accuracy = calculateAccuracy(correct, totalRetries);
  const startTime = useAtomValue(quizStartTimeState);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const imageList = getImageSourceList();

  const handleGoToQuizOption = () => {
    setQuizStatus(QuizStatus.OPTION);
  };

  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = imageList.map(({ src }) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(loadPromises);
      setAllImagesLoaded(true);
    };

    preloadImages();
  }, []);

  if (!allImagesLoaded) {
    return (
      <QuizResultContainer>
        <Loading size="50px" />
      </QuizResultContainer>
    );
  }

  return (
    <QuizResultContainer>
      <h1>Result</h1>
      <QuizResultStat>
        <QuizResultStatItem
          title="Accuracy"
          content={accuracy}
          format="percent"
          option={accuracy}
        />
        <QuizResultStatItem
          title="Time"
          content={getTotalSeconds(startTime)}
          format="time"
        />
      </QuizResultStat>
      <QuizResultGridContainer>
        <QuizResultGrid>
          {quizResult.length ? (
            <QuizResultGridLayout>
              {quizResult.map((item, index) => {
                const { src, alt } = findImageSource(
                  item.skipped,
                  item.retries
                );
                return (
                  <QuizResultWordItem key={`${item} + ${index}`}>
                    <NextImage src={src} alt={alt} width="20" height="20" />
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
        <QuizResultLegend>
          {imageList.map(({ src, alt, description }) => (
            <QuizResultWordItem key={`${alt} + ${description}`}>
              <NextImage src={src} alt={alt} width="20" height="20" />
              <span>{description}</span>
            </QuizResultWordItem>
          ))}
        </QuizResultLegend>
      </QuizResultGridContainer>
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
  flex-direction: row;
  justify-content: center;
`;

const QuizResultGridContainer = styled.section`
  height: 60%;
  display: flex;
  flex-direction: column;
`;

const QuizResultGrid = styled.div`
  height: 100%;
  border: 3px solid transparent;
  border-radius: ${theme.radius.medium};
  background-color: lightgray;
  padding: 0 ${theme.spacing.medium};
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

const QuizResultLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.medium};
`;
