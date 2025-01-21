import styled from "@emotion/styled";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useAtom } from "jotai";

import {
  wordsSearchFilterCorrectRatio,
  wordsSearchFilterCorrectRatioDefaultValues,
  wordsSearchFilterDifficulty,
  wordsSearchFilterDifficultyDefaultValues,
} from "@/entities/words/store";
import {
  WordsSearchFilterCorrectRatioType,
  WordsSearchFilterDifficultyType,
} from "@/entities/words/types";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { correctRatio, difficulties } from "@/shared/model";
import { theme } from "@/shared/styles/theme";
import ResponsiveButton from "@/widgets/Responsive/ResponsiveButton";

interface Props {
  toggleHandler: () => void;
}

const WordsSearchFilter = ({ toggleHandler }: Props) => {
  const [selectedDifficulty, setSelectedDifficulty] = useAtom(
    wordsSearchFilterDifficulty
  );
  const [selectedCorrectRatio, setSelectedCorrectRatio] = useAtom(
    wordsSearchFilterCorrectRatio
  );
  const isMobile = useMediaQuery(theme.breakpoints.mobile);

  const difficultyList: WordsSearchFilterDifficultyType[] = [
    "All",
    ...difficulties,
  ];
  const correctRatioList: WordsSearchFilterCorrectRatioType[] = [
    "All",
    ...correctRatio,
  ];

  function handleDifficultyChange(difficulty: WordsSearchFilterDifficultyType) {
    setSelectedDifficulty((prev) => {
      const isAllSelected = difficulty === "All";
      const isCurrentlyAll = prev["All"];

      if (!isAllSelected && isCurrentlyAll) {
        return {
          ...prev,
          All: false,
          [difficulty]: !prev[difficulty],
        };
      }

      if (isAllSelected) {
        return { ...wordsSearchFilterDifficultyDefaultValues };
      }

      const nextState = {
        ...prev,
        [difficulty]: !prev[difficulty],
      };

      const noSelection = Object.values(nextState).every((value) => !value);

      if (noSelection) {
        return {
          ...nextState,
          All: true,
        };
      }

      return nextState;
    });
  }

  const handleCorrectRatioChange = (
    rate: WordsSearchFilterCorrectRatioType
  ) => {
    setSelectedCorrectRatio((prev) => {
      const isAllSelected = rate === "All";
      const isCurrentlyAll = prev["All"];

      if (!isAllSelected && isCurrentlyAll) {
        return {
          ...prev,
          All: false,
          [rate]: !prev[rate],
        };
      }

      if (isAllSelected) {
        return { ...wordsSearchFilterCorrectRatioDefaultValues };
      }

      const nextState = {
        ...prev,
        [rate]: !prev[rate],
      };

      const noSelection = Object.values(nextState).every((value) => !value);

      if (noSelection) {
        return {
          ...nextState,
          All: true,
        };
      }

      return nextState;
    });
  };

  const resetFilter = () => {
    setSelectedDifficulty({ ...wordsSearchFilterDifficultyDefaultValues });
    setSelectedCorrectRatio({ ...wordsSearchFilterCorrectRatioDefaultValues });
  };

  return (
    <WordsSearchFilterConatiner>
      <WordsSearchFilterOptionLayout isMobile={isMobile}>
        <WordsSearchFilterOption>
          <h3>Difficulty</h3>
          {difficultyList.map((difficulty, index) => (
            <FormControlLabel
              key={index}
              checked={selectedDifficulty[difficulty]}
              control={<Checkbox size={isMobile ? "small" : "medium"} />}
              label={difficulty}
              onChange={() => handleDifficultyChange(difficulty)}
            />
          ))}
        </WordsSearchFilterOption>
        <WordsSearchFilterOption>
          <h3>Correct Rate</h3>
          {correctRatioList.map((rate, index) => (
            <FormControlLabel
              checked={selectedCorrectRatio[rate]}
              key={index}
              control={<Checkbox size={isMobile ? "small" : "medium"} />}
              label={rate}
              onChange={() => handleCorrectRatioChange(rate)}
            />
          ))}
        </WordsSearchFilterOption>
      </WordsSearchFilterOptionLayout>
      <WordsSearchFilterButtonGroup>
        <ResponsiveButton variant="contained" onClick={resetFilter}>
          Reset
        </ResponsiveButton>
        <ResponsiveButton variant="outlined" onClick={toggleHandler}>
          Close
        </ResponsiveButton>
      </WordsSearchFilterButtonGroup>
    </WordsSearchFilterConatiner>
  );
};

export default WordsSearchFilter;

const WordsSearchFilterConatiner = styled.div`
  width: 100%;
  position: absolute;
  border: 1px solid rgba(25, 118, 210, 0.5);
  border-radius: 4px;
  background-color: white;
  left: 100%;
  transform: translateX(-100%);
  top: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  padding: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`;

const WordsSearchFilterOptionLayout = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
  max-height: ${(props) => (props.isMobile ? "100px" : "150px")};
  overflow: auto;
`;

const WordsSearchFilterOption = styled.div``;

const WordsSearchFilterButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
`;
