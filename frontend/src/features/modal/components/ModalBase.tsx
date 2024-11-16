import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";

import { theme } from "@/shared/styles/theme";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const ModalBase = ({ children, open, onClose }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalLayout>{children}</ModalLayout>
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
`;
