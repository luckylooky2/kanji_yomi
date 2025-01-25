import styled from "@emotion/styled";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useAtom } from "jotai";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import { useFecthWords } from "@/shared/hooks/useFetchWords";
import { useScroll } from "@/shared/hooks/useScroll";
import { theme } from "@/shared/styles/theme";

interface Props {
  allocateRef: (_index: number) => (_el: HTMLDivElement) => void;
  handleWordClick: (_index: number) => () => void;
}

const WordsDisplayList = ({ allocateRef, handleWordClick }: Props) => {
  const { words, fetchNextPage } = useFecthWords();
  const { scrollRef } = useScroll(fetchNextPage);
  const [currentWordIndex] = useAtom(wordsCurrentWordIndex);
  const isWordSelected = currentWordIndex !== null;

  if (!words) {
    return;
  }

  return (
    <WordsDisplayListContainer isWordSelected={isWordSelected} ref={scrollRef}>
      <Table>
        <TableBody>
          {words.map((word, index) => (
            <TableRowContainer
              key={word.id}
              onClick={handleWordClick(index)}
              isActive={currentWordIndex === index}
            >
              <TableCell component="th" scope="row" ref={allocateRef(index)}>
                <h2>{word.word}</h2>
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
