import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button, ButtonGroup, Popper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useState } from "react";

import { playTTS } from "@/entities/quiz/lib/playTTS";
import { quizCurrentKanjiState } from "@/entities/quiz/store";
import ResponsiveIcon from "@/widgets/ResponsiveIcon/ResponsiveIcon";

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
      <QuizWordHintMenuButton variant="text" onClick={handleClick}>
        <ResponsiveIcon icon={isOpen ? ClearIcon : MenuIcon} />
      </QuizWordHintMenuButton>
      <Popper open={isOpen} anchorEl={anchorEl} placement="bottom">
        <QuizWordHintButtonGroup
          variant="outlined"
          orientation="vertical"
          aria-label="Hint button group"
        >
          <QuizWordHintButton onClick={handleSpeakWord}>
            <ResponsiveIcon icon={VolumeUpIcon} />
          </QuizWordHintButton>
          <QuizWordHintButton onClick={handleRedirectDictionary}>
            <ResponsiveIcon icon={TravelExploreIcon} />
          </QuizWordHintButton>
        </QuizWordHintButtonGroup>
      </Popper>
    </QuizWordHintLayout>
  );
};

export default QuizWordHint;

const QuizWordHintLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const QuizWordHintButtonGroup = styled(ButtonGroup)`
  margin-top: 10px;
`;

const QuizWordHintMenuButton = styled(Button)`
  padding: 0;
`;

const QuizWordHintButton = styled(Button)`
  background-color: white;
`;
