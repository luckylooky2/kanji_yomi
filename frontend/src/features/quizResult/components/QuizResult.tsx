import styled from "@emotion/styled";
import { Button, Divider, Tab, TableCell, Tabs } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { SyntheticEvent } from "react";

import {
  quizTimerState,
  quizStatusState,
  quizTotalRetriesState,
  quizResultFilteredState,
  quizResultFilter,
  quizResultState,
} from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import {
  calculateAccuracy,
  getTotalSeconds,
  percentFormattingFn,
  quizResultLegendList,
  timeFormattingFn,
} from "@/entities/quizResult/lib";
import { QuizResultLegendType } from "@/entities/quizResult/type";
import { theme } from "@/shared/styles/theme";

import QuizResultStatItem from "./QuizResultStatItem";

const QuizResult = () => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const [quizResultFiltered] = useAtom(quizResultFilteredState);
  const [correct, totalRetries] = useAtomValue(quizTotalRetriesState);
  const { quizStartTime, quizEndTime } = useAtomValue(quizTimerState);
  const [filter, setFilter] = useAtom(quizResultFilter);
  const [quizResult] = useAtom(quizResultState);

  const accuracy = calculateAccuracy(correct, totalRetries);
  const correctCount = quizResult.filter(
    (item) => item.type === "Correct" || item.type === "Retried"
  ).length;

  const handleGoToQuizOption = () => {
    setQuizStatus(QuizStatus.OPTION);
  };

  const handleFilter = (
    _event: SyntheticEvent,
    newValue: "Correct" | "Retried" | "Skipped"
  ) => {
    setFilter(filter === newValue ? "All" : newValue);
  };

  const scoreFormattingFn = (n: number) => `${n} / ${quizResult.length}`;

  return (
    <QuizResultContainer>
      <h2>Result</h2>
      <QuizResultStat>
        <QuizResultStatItem
          title="Score"
          content={correctCount}
          formattingFn={scoreFormattingFn}
        />
        <QuizResultStatItem
          title="Accuracy"
          content={accuracy}
          formattingFn={percentFormattingFn}
          colorOption
        />
        <QuizResultStatItem
          title="Time"
          content={getTotalSeconds(quizStartTime, quizEndTime)}
          formattingFn={timeFormattingFn}
        />
      </QuizResultStat>
      <QuizResultListContainer>
        <QuizResultLegend>
          <CustomTabs value={filter} onChange={handleFilter}>
            {quizResultLegendList.map((type, index) => (
              <CustomTab
                key={type + index}
                icon={<ColorCircle type={type} size={15} />}
                label={type}
                value={type}
                iconPosition="start"
              />
            ))}
          </CustomTabs>
        </QuizResultLegend>
        <QuizResultList>
          {quizResultFiltered.length ? (
            quizResultFiltered.map((item, index) => (
              <QuizResultListItem key={index}>
                <QuizResultListCellLayout component="div">
                  <QuizResultListCell>
                    <QuizResultListCellHeader>
                      <ColorCircle type={item.type} size={20}>
                        {item.round + 1}
                      </ColorCircle>
                      <h3>{item.word}</h3>
                    </QuizResultListCellHeader>
                    <Divider orientation="vertical" />
                    <h3>{item.meanings.map((v) => v.meaning).join(", ")}</h3>
                  </QuizResultListCell>
                </QuizResultListCellLayout>
              </QuizResultListItem>
            ))
          ) : (
            <QuizResultListEmpty>
              Play and learn more words :)
            </QuizResultListEmpty>
          )}
        </QuizResultList>
      </QuizResultListContainer>
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
  height: 95%;

  h2 {
    margin-top: 30px;
  }
`;

const QuizResultStat = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const QuizResultListContainer = styled.section`
  height: 60%;
  display: flex;
  flex-direction: column;
  widht: 100%;
`;

const QuizResultList = styled.div`
  height: 100%;
  border: 3px solid transparent;
  border-radius: ${theme.radius.medium};
  font-size: ${theme.fontSize.medium};
  width: 100%;
  overflow-y: auto;
`;

const QuizResultListItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const QuizResultListCellLayout = styled(TableCell)`
  display: flex;
  gap: ${theme.spacing.medium};
  width: 95%;
  border: 1px solid #ddd;
  border-radius: ${theme.radius.medium};
  margin-bottom: ${theme.spacing.small};
`;

const QuizResultListCell = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;
  gap: ${theme.spacing.medium};

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

const QuizResultListCellHeader = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
`;

const QuizResultListEmpty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
`;

const QuizResultLegend = styled.div`
  display: flex;
  justify-content: start;
  gap: ${theme.spacing.medium};
  height: 30px;
  margin-bottom: ${theme.spacing.small};
`;

const ColorCircle = styled.div<{
  type: QuizResultLegendType | "All";
  size: number;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ type }) => {
    if (type === "Correct") {
      return "rgb(76, 175, 80)";
    } else if (type === "Retried") {
      return "rgb(255, 213, 79)";
    } else if (type === "Skipped") {
      return "rgb(255, 107, 107)";
    }
    return "rgb(128, 128, 128)";
  }};
  opacity: 0.8;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const CustomTabs = styled(Tabs)`
min-height: 30px;            
width: 100%;

.MuiTabs-flexContainer {
  gap: ${theme.spacing.small};
`;

const CustomTab = styled(Tab)`
  padding: 0;
  min-height: 30px;
  font-size: 12px;
  text-transform: none;
  min-width: 0px;
  padding: 0 ${theme.spacing.xsmall};
`;
