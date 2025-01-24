import styled from "@emotion/styled";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useAtom } from "jotai";

import {
  wordsSearchFilterCorrectRatio,
  wordsSearchFilterCorrectRatioDefaultValues as correctRatioDefaultValues,
  wordsSearchFilterDifficulty,
  wordsSearchFilterDifficultyDefaultValues as difficultyDefaultValues,
} from "@/entities/words/store";
import {
  WordsSearchFilterCorrectRatioType,
  WordsSearchFilterDifficultyType,
} from "@/entities/words/types";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useResponsiveSize } from "@/shared/hooks/useResponsiveSize";
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
  const size = useResponsiveSize();

  const difficultyList = [
    "All" as WordsSearchFilterDifficultyType,
    ...difficulties,
  ];
  const correctRatioList = [
    "All" as WordsSearchFilterCorrectRatioType,
    ...correctRatio,
  ];

  function createHandleCheckboxChange<
    T extends
      | WordsSearchFilterDifficultyType
      | WordsSearchFilterCorrectRatioType
  >(
    setter: (
      _updater: (_prev: Record<T, boolean>) => Record<T, boolean>
    ) => void,
    value: T,
    defaultState: Record<T, boolean>
  ) {
    return () => {
      setter((prev) => {
        const isAllSelected = value === "All";
        const isCurrentlyAll = prev["All" as T];

        if (!isAllSelected && isCurrentlyAll) {
          return {
            ...prev,
            All: false,
            [value]: !prev[value],
          };
        }

        if (isAllSelected) {
          return { ...defaultState };
        }

        const nextState = {
          ...prev,
          [value]: !prev[value],
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
  }

  const resetFilter = () => {
    setSelectedDifficulty({ ...difficultyDefaultValues });
    setSelectedCorrectRatio({ ...correctRatioDefaultValues });
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
              control={<Checkbox size={size} />}
              label={difficulty}
              onChange={createHandleCheckboxChange<WordsSearchFilterDifficultyType>(
                setSelectedDifficulty,
                difficulty,
                difficultyDefaultValues
              )}
            />
          ))}
        </WordsSearchFilterOption>
        <WordsSearchFilterOption>
          <h3>Correct Ratio</h3>
          {correctRatioList.map((ratio, index) => (
            <FormControlLabel
              checked={selectedCorrectRatio[ratio]}
              key={index}
              control={<Checkbox size={size} />}
              label={ratio}
              onChange={createHandleCheckboxChange<WordsSearchFilterCorrectRatioType>(
                setSelectedCorrectRatio,
                ratio,
                correctRatioDefaultValues
              )}
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
