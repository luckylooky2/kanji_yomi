import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalBase;
