import styled from "@emotion/styled";
import Grid from "@mui/material/Grid2";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";
import { WordInfo } from "@/shared/types";

import WordsCurrentWord from "./WordsCurrentWord";

interface Props {
  words: WordInfo[];
}

const WordsGrid = ({ words }: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  const [currentWordIndex, setCurrentWordIndex] = useAtom(
    wordsCurrentWordIndex
  );
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const isWordSelected = currentWordIndex !== null;

  useEffect(() => {
    setTimeout(() => {
      if (isWordSelected && itemRefs.current[currentWordIndex]) {
        itemRefs.current[currentWordIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 200);
  }, [currentWordIndex]);

  if (words.length === 0) {
    return (
      <WordsNotFound>
        <h3>No words found :(</h3>
      </WordsNotFound>
    );
  }

  return (
    <>
      <WordsSearchResultGrid
        container
        spacing={2}
        columns={24}
        isWordSelected={isWordSelected}
      >
        {words.map((item, index) => (
          <WordItem
            size={isMobile ? 12 : 8}
            key={item.id}
            ref={(el: HTMLDivElement) => {
              if (itemRefs.current) {
                itemRefs.current[index] = el;
              }
            }}
            isActive={currentWordIndex === item.id}
            onClick={() => {
              const nextIndex = index === currentWordIndex ? null : index;
              setCurrentWordIndex(nextIndex);
              setTimeout(() => {}, 1000);
            }}
          >
            <h3>{item.word}</h3>
          </WordItem>
        ))}
      </WordsSearchResultGrid>
      {isWordSelected && <WordsCurrentWord word={words[currentWordIndex]} />}
    </>
  );
};

export default WordsGrid;

const WordsSearchResultGrid = styled(Grid)<{ isWordSelected: boolean }>`
  overflow: auto;
  height: ${({ isWordSelected }) =>
    isWordSelected ? "calc(90% - 200px)" : "90%"};
  padding: ${theme.spacing.medium};
  scroll-behavior: smooth;
  transition: height 0.1s ease-out;
`;

const WordItem = styled(Grid)<{ isActive?: boolean }>`
  background: #fff;
  border: 1px solid #ddd;
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

const WordsNotFound = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    color: gray;
  }
`;
