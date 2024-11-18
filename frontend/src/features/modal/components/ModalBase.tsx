import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";

import { theme } from "@/shared/styles/theme";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
}

const ModalBase = ({ children, open, onClose, title }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalLayout>
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </ModalLayout>
    </Modal>
  );
};

export default ModalBase;

const ModalLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  background-color: white;
  padding: ${theme.spacing.medium};
  border-radius: ${theme.radius.small};
`;

const ModalTitle = styled.h3`
  display: inline-block;
  height: 50px;
  line-height: 50px;
  margin-left: ${theme.spacing.medium};
`;
