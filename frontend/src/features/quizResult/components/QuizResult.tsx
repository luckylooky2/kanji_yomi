import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import {
  Button,
  ButtonGroup,
  Divider,
  Popper,
  Tab,
  TableCell,
  Tabs,
} from "@mui/material";
import { saveAs } from "file-saver";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { throttle } from "lodash";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
} from "react";

import { quizTimerState, quizStatusState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import { quizOptionDifficultyState } from "@/entities/quizOption/store";
import {
  accuracyColorFormattingFn,
  calculateAccuracy,
  getTotalSeconds,
  accuracyFormattingFn,
  quizResultLegendList,
  timeFormattingFn,
} from "@/entities/quizResult/lib";
import {
  quizTotalRetriesState,
  quizResultFilteredState,
  quizResultFilter,
  quizResultState,
} from "@/entities/quizResult/store";
import { QuizResultLegendType } from "@/entities/quizResult/type";
import { theme } from "@/shared/styles/theme";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

import QuizResultStatItem from "./QuizResultStatItem";

const QuizResult = () => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const { quizStartTime, quizEndTime } = useAtomValue(quizTimerState);
  const [quizResultFiltered] = useAtom(quizResultFilteredState);
  const [filter, setFilter] = useAtom(quizResultFilter);
  const [quizResult] = useAtom(quizResultState);
  const [correct, totalRetries] = useAtomValue(quizTotalRetriesState);
  const optionDifficulty = useAtomValue(quizOptionDifficultyState);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const accuracy = calculateAccuracy(correct, totalRetries);
  const correctCount = quizResult.filter(
    (item) => item.type === "Correct" || item.type === "Retried"
  ).length;
  const DURATION = { THROTTLE: 1000 };

  const handleGoToQuizOption = () => {
    setQuizStatus(QuizStatus.OPTION);
  };

  function sanitizeCSVCell(cell: string): string {
    const escaped = cell.replace(/"/g, '""');
    const sanitized = /^[=+\-@]/.test(escaped) ? `'${escaped}` : escaped;
    return `"${sanitized}"`;
  }

  const handleDownloadCSV = useCallback(() => {
    if (quizStartTime === null) {
      return;
    }

    const formattedTimestamp = quizStartTime.format("YYMMDD_HHmmss");
    const csvHeader = "Type,Round,Word,Meaning\n";
    const csvContent = quizResult
      .map(({ round, word, meanings, type }) => {
        return [
          sanitizeCSVCell(type),
          sanitizeCSVCell((round + 1).toString()),
          sanitizeCSVCell(word),
          ...meanings.map((v) => sanitizeCSVCell(v.meaning)),
        ].join(",");
      })
      .join("\n");
    const difficulty = [...optionDifficulty].sort().reverse().join("-");
    const blob = new Blob([csvHeader + csvContent], {
      type: "application/octet-stream;charset=utf-8;",
    });
    const uuid = crypto.randomUUID().slice(0, 6);
    const filename = `kanjiyomi_${formattedTimestamp}_${difficulty}_${uuid}.csv`;

    saveAs(blob, filename);
  }, [optionDifficulty, quizResult, quizStartTime]);

  const throttledDownloadCSV = useCallback(
    throttle(handleDownloadCSV, DURATION.THROTTLE, { trailing: false }),
    [handleDownloadCSV]
  );

  useEffect(() => {
    return () => {
      throttledDownloadCSV.cancel();
    };
  }, [throttledDownloadCSV]);

  const handleFilter = (
    _event: SyntheticEvent,
    newValue: "Correct" | "Retried" | "Skipped"
  ) => {
    setFilter(filter === newValue ? "All" : newValue);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsDownloadMenuOpen((previousOpen) => !previousOpen);
  };

  const scoreFormattingFn = (n: number) => `${n} / ${quizResult.length}`;
  const scoreColorFormattingFn = (n: number) => {
    const ratio = Math.floor((n / quizResult.length) * 100);
    if (ratio >= 80) {
      return "green";
    } else if (ratio >= 50) {
      return "orange";
    } else if (ratio >= 0) {
      return "red";
    }
    return "black";
  };

  return (
    <QuizResultContainer>
      <h2>Result</h2>
      <QuizResultStat>
        <QuizResultStatItem
          title="Score"
          content={correctCount}
          formattingFn={scoreFormattingFn}
          colorFormattingFn={scoreColorFormattingFn}
        />
        <QuizResultStatItem
          title="Accuracy"
          content={accuracy}
          formattingFn={accuracyFormattingFn}
          colorFormattingFn={accuracyColorFormattingFn}
        />
        <QuizResultStatItem
          title="Time"
          content={getTotalSeconds(quizStartTime, quizEndTime)}
          formattingFn={timeFormattingFn}
        />
      </QuizResultStat>
      <QuizResultListContainer>
        <QuizResultLegend>
          <CustomTabs
            value={filter}
            onChange={handleFilter}
            aria-label="quiz result filter"
          >
            {quizResultLegendList.map((type, index) => (
              <CustomTab
                key={type + index}
                icon={<ColorCircle type={type} size={15} />}
                label={type}
                value={type}
                iconPosition="start"
                aria-controls="quiz-result-list"
                aria-label={`show ${type} result`}
              />
            ))}
          </CustomTabs>
        </QuizResultLegend>
        <QuizResultList
          id="quiz-result-list"
          aria-label={`${filter} result list`}
        >
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
      <QuizResultButtonGroup>
        <DownloadMenuButton
          variant="outlined"
          onClick={handleClick}
          aria-label="download menu open"
          aria-expanded={isDownloadMenuOpen}
          aria-haspopup="true"
          aria-controls="download-menu"
        >
          <ResponsiveIcon
            icon={isDownloadMenuOpen ? ClearIcon : DownloadIcon}
          />
        </DownloadMenuButton>
        <Popper
          open={isDownloadMenuOpen}
          anchorEl={anchorEl}
          placement="top-start"
          role="menu"
          id="download-menu"
        >
          <DownloadButtonGroup
            variant="outlined"
            orientation="vertical"
            aria-label="download button group"
          >
            <DownloadCSVButton onClick={throttledDownloadCSV}>
              <InsertDriveFileOutlinedIcon />
              Download CSV
            </DownloadCSVButton>
          </DownloadButtonGroup>
        </Popper>
        <OptionButton variant="contained" onClick={handleGoToQuizOption}>
          Back To Option
        </OptionButton>
      </QuizResultButtonGroup>
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
  width: 100%;
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

const QuizResultButtonGroup = styled.div`
  display: flex;
  width: 100%;
  gap: ${theme.spacing.xsmall};
`;

const OptionButton = styled(Button)`
  flex: 1;
`;

const DownloadMenuButton = styled(Button)`
  min-width: 25px;
`;

const DownloadButtonGroup = styled(ButtonGroup)`
  margin-bottom: 5px;
`;

const DownloadCSVButton = styled(Button)`
  display: flex;
  gap: ${theme.spacing.small};
  background-color: white;
  text-transform: none;
`;
