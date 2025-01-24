import styled from "@emotion/styled";
import Grid from "@mui/material/Grid2";
import { useAtom } from "jotai";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";
import { WordInfo } from "@/shared/types";

interface Props {
  words: WordInfo[];
  allocateRef: (_index: number) => (_el: HTMLDivElement) => void;
  handleWordClick: (_index: number) => () => void;
}

const WordsDisplayGrid = ({ words, allocateRef, handleWordClick }: Props) => {
  const [currentWordIndex] = useAtom(wordsCurrentWordIndex);
  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  const isWordSelected = currentWordIndex !== null;

  return (
    <WordsDisplayGridContainer
      container
      spacing={2}
      columns={24}
      isWordSelected={isWordSelected}
      alignContent="flex-start"
      tabIndex={0}
    >
      {words.map((word, index) => (
        <WordItem
          size={isMobile ? 12 : 8}
          key={word.id}
          ref={allocateRef(index)}
          isActive={currentWordIndex === word.id}
          onClick={handleWordClick(index)}
        >
          <h3>{word.word}</h3>
        </WordItem>
      ))}
    </WordsDisplayGridContainer>
  );
};

export default WordsDisplayGrid;

const WordsDisplayGridContainer = styled(Grid)<{ isWordSelected: boolean }>`
  overflow: auto;
  height: ${({ isWordSelected }) =>
    isWordSelected ? "calc(90% - 200px - 40px)" : "calc(90% - 40px)"};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  scroll-behavior: smooth;
  transition: height 0.1s ease-out;
`;

const WordItem = styled(Grid)<{ isActive?: boolean }>`
  background: #fff;
  border: 1px solid #ddd;
  height: 60px;
  border-style: solid;
  border-radius: 8px;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(25, 118, 210, 0.5)" : "white"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-weight: bold;

  h3 {
    text-align: center;
  }
`;
