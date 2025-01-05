import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button, ButtonGroup, Popper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useState } from "react";

import { playTTS } from "@/entities/quiz/lib/playTTS";
import { quizCurrentKanjiState } from "@/entities/quiz/store";

const QuizWordHint = () => {
  const [{ data: kanji }] = useAtom(quizCurrentKanjiState);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSpeakWord = () => {
    if (!kanji) {
      return;
    }
    playTTS(kanji.word);
  };

  const handleRedirectDictionary = () => {
    if (!kanji) {
      return;
    }
    window.open(`https://jisho.org/search/${kanji.word}`, "_blank");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen((previousOpen) => !previousOpen);
  };

  return (
    <QuizWordHintLayout>
      <Button variant="text" onClick={handleClick}>
        {isOpen ? <RemoveIcon /> : <AddIcon />}
      </Button>
      <Popper open={isOpen} anchorEl={anchorEl} placement="top">
        <QuizButtonGroup
          variant="outlined"
          orientation="vertical"
          aria-label="Hint button group"
        >
          <Button onClick={handleSpeakWord}>
            <VolumeUpIcon />
          </Button>
          <Button onClick={handleRedirectDictionary}>
            <TravelExploreIcon />
          </Button>
        </QuizButtonGroup>
      </Popper>
    </QuizWordHintLayout>
  );
};

export default QuizWordHint;

const QuizWordHintLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const QuizButtonGroup = styled(ButtonGroup)`
  margin-bottom: 10px;
`;
