import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import { useFetchWords } from "@/shared/hooks/useFetchWords";
import { theme } from "@/shared/styles/theme";

import WordsDeleteModal from "./WordsDeleteModal";
import WordsEditModal from "./WordsEditModal";

interface Props {
  disabled: boolean;
}

export type WordsInputType = {
  word: string;
  meaning1: string;
  difficulty1: string;
  meaning2: string;
  difficulty2: string;
  meaning3: string;
  difficulty3: string;
};
export type CRUDModeType = "추가" | "수정" | "삭제";

export const INITIAL_INPUT: WordsInputType = {
  word: "",
  meaning1: "",
  difficulty1: "",
  meaning2: "",
  difficulty2: "",
  meaning3: "",
  difficulty3: "",
};

const WordsToolbar = ({ disabled }: Props) => {
  const [CRUDMode, setCRUDMode] = useState<CRUDModeType>();
  const [currentWordIndex] = useAtom(wordsCurrentWordIndex);
  const { words } = useFetchWords();
  const [input, setInput] = useState(INITIAL_INPUT);

  const isEditModalOpen = CRUDMode === "수정" || CRUDMode === "추가";
  const isDeleteModalOpen = CRUDMode === "삭제";

  const handleClickOpen = (mode: CRUDModeType) => {
    if (currentWordIndex !== null && mode === "수정") {
      const { word, meanings } = words[currentWordIndex];
      const newInput = meanings.reduce((acc, meaning, index) => {
        const key = index + 1;
        return {
          ...acc,
          [`meaning${key}`]: meaning.meaning,
          [`difficulty${key}`]: meaning.difficulty || "",
        };
      }, {});

      setInput({
        ...input,
        word,
        ...newInput,
      });
    } else {
      setInput(INITIAL_INPUT);
    }
  };

  const handleModalClose = () => {
    setCRUDMode(undefined);
  };

  return (
    <WordsCRUDButtonContainer>
      <Button
        variant="contained"
        onClick={() => {
          setCRUDMode("추가");
          handleClickOpen("추가");
        }}
      >
        추가
      </Button>
      <Button
        variant="outlined"
        disabled={disabled}
        onClick={() => {
          setCRUDMode("수정");
          handleClickOpen("수정");
        }}
      >
        수정
      </Button>
      <Button
        variant="outlined"
        disabled={disabled}
        onClick={() => {
          setCRUDMode("삭제");
        }}
      >
        삭제
      </Button>
      {isEditModalOpen && (
        <WordsEditModal
          open={isEditModalOpen}
          handleModalClose={() => {
            setInput(INITIAL_INPUT);
            handleModalClose();
          }}
          CRUDMode={CRUDMode}
          input={input}
          setInput={setInput}
        />
      )}
      {isDeleteModalOpen && (
        <WordsDeleteModal
          open={isDeleteModalOpen}
          handleModalClose={handleModalClose}
          CRUDMode={CRUDMode}
        />
      )}
    </WordsCRUDButtonContainer>
  );
};

export default WordsToolbar;

const WordsCRUDButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${theme.spacing.small};
  gap: ${theme.spacing.small};
`;
