import styled from "@emotion/styled";
import { Button, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useAtom } from "jotai";

import {
  wordsSearchFilterCorrectRate,
  wordsSearchFilterCorrectRateDefaultValues,
  wordsSearchFilterDifficulty,
  wordsSearchFilterDifficultyDefaultValues,
} from "@/entities/words/store";
import {
  WordsSearchFilterCorrectRate,
  WordsSearchFilterDifficulty,
} from "@/entities/words/types";
import { correctRate, difficulties } from "@/shared/model";
import { theme } from "@/shared/styles/theme";

interface Props {
  toggleHandler: () => void;
}

const WordsSearchFilter = ({ toggleHandler }: Props) => {
  const [selectedDifficulty, setSelectedDifficulty] = useAtom(
    wordsSearchFilterDifficulty
  );
  const [selectedCorrectRate, setSelectedCorrectRate] = useAtom(
    wordsSearchFilterCorrectRate
  );

  const difficultyList: WordsSearchFilterDifficulty[] = [
    "All",
    ...difficulties,
  ];
  const correctRateList: WordsSearchFilterCorrectRate[] = [
    "All",
    ...correctRate,
  ];

  function handleDifficultyChange(difficulty: WordsSearchFilterDifficulty) {
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

  const handleCorrectRateChange = (rate: WordsSearchFilterCorrectRate) => {
    setSelectedCorrectRate((prev) => {
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
        return { ...wordsSearchFilterCorrectRateDefaultValues };
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
    setSelectedCorrectRate({ ...wordsSearchFilterCorrectRateDefaultValues });
  };

  return (
    <WordsSearchFilterConatiner>
      <WordsSearchFilterOptionLayout>
        <WordsSearchFilterOption>
          <h3>Difficulty</h3>
          {difficultyList.map((difficulty, index) => (
            <FormControlLabel
              key={index}
              checked={selectedDifficulty[difficulty]}
              control={<Checkbox />}
              label={difficulty}
              onChange={() => handleDifficultyChange(difficulty)}
            />
          ))}
        </WordsSearchFilterOption>
        <WordsSearchFilterOption>
          <h3>Correct Rate</h3>
          {correctRateList.map((rate, index) => (
            <FormControlLabel
              checked={selectedCorrectRate[rate]}
              key={index}
              control={<Checkbox />}
              label={rate}
              onChange={() => handleCorrectRateChange(rate)}
            />
          ))}
        </WordsSearchFilterOption>
      </WordsSearchFilterOptionLayout>
      <WordsSearchFilterButtonGroup>
        <Button variant="contained" onClick={resetFilter}>
          Reset
        </Button>
        <Button variant="outlined" onClick={toggleHandler}>
          Close
        </Button>
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
  margin-top: ${theme.spacing.small};
  padding: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`;

const WordsSearchFilterOptionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
`;

const WordsSearchFilterOption = styled.div``;

const WordsSearchFilterButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
`;
