import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import { WordsService } from "@/features/words/api";
import { useFetchWords } from "@/shared/hooks/useFetchWords";

import { CRUDModeType } from "./WordsToolbar";

interface WordsDeleteModalProps {
  open: boolean;
  handleModalClose: () => void;
  CRUDMode: CRUDModeType | undefined;
}

const WordsDeleteModal = ({
  open,
  handleModalClose,
  CRUDMode,
}: WordsDeleteModalProps) => {
  const [currentWordIndex] = useAtom(wordsCurrentWordIndex);
  const { words } = useFetchWords();
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Dialog open={open} onClose={handleModalClose}>
      <DialogTitle>{CRUDMode}</DialogTitle>
      <DialogContent>
        <div style={{ fontSize: "24px", textAlign: "center" }}>
          <strong>{words[currentWordIndex!].word}</strong>
        </div>
        <div>단어를 삭제하시겠습니까?</div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleModalClose}>
          취소
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={async () => {
            try {
              await WordsService.deleteWord(words[currentWordIndex!].id);
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

export default WordsDeleteModal;
