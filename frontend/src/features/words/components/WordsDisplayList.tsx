import styled from "@emotion/styled";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useAtom } from "jotai";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import { theme } from "@/shared/styles/theme";
import { WordInfo } from "@/shared/types";

interface Props {
  words: WordInfo[];
  allocateRef: (_index: number) => (_el: HTMLDivElement) => void;
  handleWordClick: (_index: number) => () => void;
}

const WordsDisplayList = ({ words, allocateRef, handleWordClick }: Props) => {
  const [currentWordIndex] = useAtom(wordsCurrentWordIndex);
  const isWordSelected = currentWordIndex !== null;

  return (
    <WordsDisplayListContainer isWordSelected={isWordSelected}>
      <Table>
        <TableBody>
          {words.map((word, index) => (
            <TableRowContainer
              key={word.id}
              onClick={handleWordClick(index)}
              isActive={currentWordIndex === word.id}
            >
              <TableCell component="th" scope="row" ref={allocateRef(index)}>
                <h3>{word.word}</h3>
              </TableCell>
            </TableRowContainer>
          ))}
        </TableBody>
      </Table>
    </WordsDisplayListContainer>
  );
};

export default WordsDisplayList;

const WordsDisplayListContainer = styled.div<{ isWordSelected: boolean }>`
  overflow: auto;
  height: ${({ isWordSelected }) =>
    isWordSelected ? "calc(90% - 200px - 40px)" : "calc(90% - 40px)"};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  scroll-behavior: smooth;
  transition: height 0.1s ease-out;
`;

const TableRowContainer = styled(TableRow)<{ isActive?: boolean }>`
  background-color: ${({ isActive }) =>
    isActive ? "rgba(25, 118, 210, 0.5)" : "white"};
`;
