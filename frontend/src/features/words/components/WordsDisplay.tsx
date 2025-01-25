import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { wordsCurrentWordIndex, wordsView } from "@/entities/words/store";
import { useFecthWords } from "@/shared/hooks/useFetchWords";
import Loading from "@/widgets/Loading/Loading";

import WordsDisplayGrid from "./WordsDisplayGrid";
import WordsDisplayList from "./WordsDisplayList";

const WordsDisplay = () => {
  const [currentWordIndex, setCurrentWordIndex] = useAtom(
    wordsCurrentWordIndex
  );
  const [view] = useAtom(wordsView);
  const { words, isLoading } = useFecthWords();
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const isWordSelected = currentWordIndex !== null;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isWordSelected && itemRefs.current[currentWordIndex]) {
        itemRefs.current[currentWordIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [currentWordIndex]);

  if (isLoading || !words) {
    return <Loading />;
  }

  const handleWordClick = (index: number) => () => {
    const nextIndex = index === currentWordIndex ? null : index;
    setCurrentWordIndex(nextIndex);
  };

  const allocateRef = (index: number) => (el: HTMLDivElement) => {
    if (itemRefs.current) {
      itemRefs.current[index] = el;
    }
  };

  if (words.length === 0) {
    return (
      <WordsNotFound>
        <h3>No words found :(</h3>
      </WordsNotFound>
    );
  }

  const DisplayComponent =
    view === "list" ? WordsDisplayList : WordsDisplayGrid;

  return (
    <DisplayComponent
      allocateRef={allocateRef}
      handleWordClick={handleWordClick}
    />
  );
};

export default WordsDisplay;

const WordsNotFound = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    color: gray;
  }
`;
