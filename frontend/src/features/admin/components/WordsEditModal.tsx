import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import { WordsCreateNewWordRequestDTO } from "@/entities/words/types";
import { WordsService } from "@/features/words/api";
import { useFetchWords } from "@/shared/hooks/useFetchWords";
import { DifficultyType, MeaningInfo } from "@/shared/types";

import DifficultyFormControls from "./DifficultyFormControls";
import { CRUDModeType, INITIAL_INPUT, WordsInputType } from "./WordsToolbar";

interface WordsEditModalProps {
  open: boolean;
  handleModalClose: () => void;
  CRUDMode: CRUDModeType | undefined;
  input: typeof INITIAL_INPUT;
  setInput: Dispatch<SetStateAction<typeof INITIAL_INPUT>>;
}

const WordsEditModal = ({
  open,
  handleModalClose,
  CRUDMode,
  input,
  setInput,
}: WordsEditModalProps) => {
  const [currentWordIndex] = useAtom(wordsCurrentWordIndex);
  const { words } = useFetchWords();
  const queryClient = useQueryClient();
  const router = useRouter();

  const convertToDTO = (
    input: typeof INITIAL_INPUT
  ): WordsCreateNewWordRequestDTO => {
    const { word, ...rest } = input;

    // meaning과 difficulty 값을 추출하여 배열로 변환
    const meanings: MeaningInfo[] = [];
    for (let i = 1; i <= 3; i++) {
      const meaning = rest[`meaning${i}` as keyof typeof rest];
      const difficulty = rest[`difficulty${i}` as keyof typeof rest];

      if (meaning || difficulty) {
        meanings.push({ meaning, difficulty: difficulty as DifficultyType });
      }
    }

    return { word, meanings };
  };

  const validateCreate = (inputs: WordsCreateNewWordRequestDTO): boolean => {
    return Boolean(
      inputs.meanings.length &&
        inputs.meanings.every(
          (meaning) => meaning.meaning && meaning.difficulty
        )
    );
  };

  const handleInputChange =
    (property: keyof WordsInputType) =>
    ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setInput({ ...input, [property]: target.value });
    };

  return (
    <Dialog open={open} onClose={handleModalClose}>
      <DialogTitle>{CRUDMode}</DialogTitle>
      <DialogContent>
        <WordsTextField
          required
          margin="dense"
          id="word"
          name="word"
          label="단어"
          type="text"
          value={input.word}
          onChange={handleInputChange("word")}
          fullWidth
          variant="standard"
        />
        <WordsTextField
          required
          margin="dense"
          id="meaning1"
          name="meaning1"
          label="의미1"
          value={input.meaning1}
          onChange={handleInputChange("meaning1")}
          type="text"
          fullWidth
          variant="standard"
        />
        <DifficultyFormControls
          value={input.difficulty1}
          onChange={handleInputChange("difficulty1")}
          name="row-radio-buttons-difficulty1"
          ariaLabel="row-radio-buttons-difficulty1"
        />
        <WordsTextField
          margin="dense"
          id="meaning2"
          name="meaning2"
          label="의미2"
          value={input.meaning2}
          onChange={handleInputChange("meaning2")}
          type="text"
          fullWidth
          variant="standard"
        />
        <DifficultyFormControls
          value={input.difficulty2}
          onChange={handleInputChange("difficulty2")}
          name="row-radio-buttons-difficulty2"
          ariaLabel="row-radio-buttons-difficulty2"
        />
        <WordsTextField
          margin="dense"
          id="meaning3"
          name="meaning3"
          value={input.meaning3}
          onChange={handleInputChange("meaning3")}
          label="의미3"
          type="text"
          fullWidth
          variant="standard"
        />
        <DifficultyFormControls
          value={input.difficulty3}
          onChange={handleInputChange("difficulty3")}
          name="row-radio-buttons-difficulty3"
          ariaLabel="row-radio-buttons-difficulty3"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleModalClose}>
          취소
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={!validateCreate(convertToDTO(input))}
          onClick={async () => {
            const inputs = convertToDTO(input);
            if (!validateCreate(inputs)) {
              return;
            }

            try {
              if (CRUDMode === "추가") {
                await WordsService.createNewWord(inputs);
              }

              if (CRUDMode === "수정") {
                await WordsService.updateWord({
                  ...inputs,
                  id: words[currentWordIndex!].id,
                });
              }
              queryClient.invalidateQueries({ queryKey: ["words"] });
              handleModalClose();
            } catch {
              router.push("/admin/login");
            }
          }}
        >
          {CRUDMode}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordsEditModal;

const WordsTextField = styled(TextField)`
  .MuiInput-input {
    font-size: 24px;
  }
`;
