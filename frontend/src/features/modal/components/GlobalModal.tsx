"use client";

import { useAtom } from "jotai";

import { GlobalModalIsOpenState } from "@/entities/modal/store";
import ModalBase from "@/features/modal/components/ModalBase";

interface Props {
  children: React.ReactNode;
}

const GlobalModal = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useAtom(GlobalModalIsOpenState);
  return (
    <ModalBase
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      {children}
    </ModalBase>
  );
};

export default GlobalModal;
