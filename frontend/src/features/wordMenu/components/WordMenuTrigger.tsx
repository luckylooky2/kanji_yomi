"use client";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { MouseEvent, ReactNode, useEffect } from "react";

import {
  wordMenuAnchorPositionState,
  wordMenuSelectedWordState,
} from "@/entities/wordMenu/store";

interface Props {
  children: ReactNode;
}

const WordMenuTrigger = ({ children }: Props) => {
  const [anchorPosition, setAnchorPosition] = useAtom(
    wordMenuAnchorPositionState
  );
  const [, setSelectedWord] = useAtom(wordMenuSelectedWordState);
  const isActive = anchorPosition !== null;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorPosition({
      top: event.clientY,
      left: event.clientX,
    });
    const target = event.target as HTMLDivElement;
    setSelectedWord(target.textContent);
  };

  useEffect(() => {
    return () => setAnchorPosition(null);
  }, []);

  return (
    <WordMenuTriggerContainer onClick={handleClick} $isActive={isActive}>
      {children}
    </WordMenuTriggerContainer>
  );
};

export default WordMenuTrigger;

const activeStyles = css`
  background-color: #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
`;

const WordMenuTriggerContainer = styled.div<{ $isActive: boolean }>`
  &:hover,
  &:focus {
    ${activeStyles}
  }
`;
