import styled from "@emotion/styled";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { MouseEvent } from "react";

import {
  wordsCurrentWordIndex,
  wordsSearchFilterState,
  wordsView,
} from "@/entities/words/store";
import { WordsViewType } from "@/entities/words/types";
import { theme } from "@/shared/styles/theme";

import { WordsService } from "../api";

const WordsUtilityBar = () => {
  const [view, setView] = useAtom(wordsView);
  const [, setCurrentWordIndex] = useAtom(wordsCurrentWordIndex);
  const [{ searchInput, difficulty, correctRatio }] = useAtom(
    wordsSearchFilterState
  );
  const { data, isLoading } = useQuery({
    queryKey: ["wordsCount", searchInput, difficulty, correctRatio],
    queryFn: async function () {
      return await WordsService.searchWordsCount(
        searchInput,
        difficulty,
        correctRatio
      );
    },
  });

  const handleChange = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    const target = currentTarget as HTMLButtonElement;
    const value = target.value as WordsViewType;
    setView(value);
    setCurrentWordIndex(null);
  };

  return (
    <WordsUtilityBarContainer>
      <span>Found {isLoading ? "..." : data.totalCount} items.</span>
      <WordsViewButtonGroup value={view} exclusive onChange={handleChange}>
        <ToggleButton value="grid" aria-label="grid">
          <GridViewSharpIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="list" aria-label="list">
          <TableRowsSharpIcon fontSize="small" />
        </ToggleButton>
      </WordsViewButtonGroup>
    </WordsUtilityBarContainer>
  );
};

export default WordsUtilityBar;

const WordsUtilityBarContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.small};

  .Mui-selected {
    background-color: #1976d2 !important;
    color: white !important;
  }
`;

const WordsViewButtonGroup = styled(ToggleButtonGroup)`
  height: 30px;
  z-index: 1;
`;
