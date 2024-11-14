import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
