import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { wordsCurrentWordIndex, wordsView } from "@/entities/words/store";
import { useFetchWords } from "@/shared/hooks/useFetchWords";

import WordsDisplayGrid from "./WordsDisplayGrid";
import WordsDisplayList from "./WordsDisplayList";

const WordsDisplay = () => {
  const [currentWordIndex, setCurrentWordIndex] = useAtom(
    wordsCurrentWordIndex
  );
  const [view] = useAtom(wordsView);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const { words, isError } = useFetchWords();
  const t = useTranslations();
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
  }, [currentWordIndex, view]);

  const handleWordClick = (index: number) => () => {
    const nextIndex = index === currentWordIndex ? null : index;
    setCurrentWordIndex(nextIndex);
  };

  const allocateRef = (index: number) => (el: HTMLDivElement) => {
    if (itemRefs.current) {
      itemRefs.current[index] = el;
    }
  };

  if (isError || !words) {
    return (
      <WordsNotFound>
        <h3>Failed to fetch words :(</h3>
      </WordsNotFound>
    );
  }

  if (words.length === 0) {
    return (
      <WordsNotFound>
        <h3>{t("not-found")} :(</h3>
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
