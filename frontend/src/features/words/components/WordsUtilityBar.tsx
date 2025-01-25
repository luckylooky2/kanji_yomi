import styled from "@emotion/styled";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAtom } from "jotai";
import { MouseEvent } from "react";

import { wordsCurrentWordIndex, wordsView } from "@/entities/words/store";
import { WordsViewType } from "@/entities/words/types";
import { theme } from "@/shared/styles/theme";

const WordsUtilityBar = () => {
  const [view, setView] = useAtom(wordsView);
  const [, setCurrentWordIndex] = useAtom(wordsCurrentWordIndex);

  const handleChange = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    const target = currentTarget as HTMLButtonElement;
    const value = target.value as WordsViewType;
    setView(value);
    setCurrentWordIndex(null);
  };

  // TODO: count API 생성 및 호출

  return (
    <WordsUtilityBarContainer>
      <span>Found 0 items</span>
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
