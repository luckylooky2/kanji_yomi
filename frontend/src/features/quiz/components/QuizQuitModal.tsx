import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

import { quizStatusState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import ModalBase from "@/features/modal/components/ModalBase";
import { theme } from "@/shared/styles/theme";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizQuitModal = ({ isOpen, setIsOpen }: Props) => {
  const setQuizStatus = useSetAtom(quizStatusState);
  const t = useTranslations("game");

  const handleQuit = () => {
    setIsOpen(false);
    setQuizStatus(QuizStatus.OPTION);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <ModalBase
      open={isOpen}
      onClose={handleCancel}
      title={`${t("quit-modal-title")}`}
    >
      <QuitModalLayout>
        <div>{t("quit-modal-content")}</div>
        <Button variant="outlined" onClick={handleQuit}>
          {t("modal-ok")}
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          {t("modal-cancel")}
        </Button>
      </QuitModalLayout>
    </ModalBase>
  );
};

export default QuizQuitModal;

// 여기서 align-items 속성을 주면, Button 컴포넌트의 width가 텍스트 크기로 고정된다.
const QuitModalLayout = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.small};
`;
