import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TuneIcon from "@mui/icons-material/Tune";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button, ButtonGroup, Popper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

import { quizCurrentKanjiState } from "@/entities/quiz/store";
import { useTTS } from "@/shared/hooks/useTTS";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

import QuizWordHintSpeakSetting from "./QuizWordHintSpeakSetting";

const QuizWordHint = () => {
  const [{ data: kanji }] = useAtom(quizCurrentKanjiState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isSpeakSettingOpen, setIsSpeakSettingOpen] = useState(false);
  const { playTTS, loadVoices } = useTTS();

  const handleSpeakWord = () => {
    if (!kanji) {
      return;
    }
    const hintWord = kanji.meanings[0].meaning;
    playTTS(hintWord);
  };

  const handleRedirectDictionary = () => {
    if (!kanji) {
      return;
    }
    const hintWord = kanji.meanings[0].meaning;
    window.open(`https://jisho.org/search/${hintWord}`, "_blank");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen((previousOpen) => !previousOpen);
    setIsSpeakSettingOpen(false);
  };

  useEffect(() => {
    loadVoices();
  }, []);

  return (
    <QuizWordHintLayout>
      <QuizWordHintMenuButton variant="text" onClick={handleClick}>
        <ResponsiveIcon icon={isMenuOpen ? ClearIcon : MenuIcon} />
      </QuizWordHintMenuButton>
      <Popper open={isMenuOpen} anchorEl={anchorEl} placement="bottom">
        <QuizWordHintButtonGroup
          variant="outlined"
          orientation="vertical"
          aria-label="Hint button group"
        >
          <QuizWordHintButton onClick={handleSpeakWord}>
            <ResponsiveIcon icon={VolumeUpIcon} />
          </QuizWordHintButton>
          <QuizWordHintButton
            onClick={() => setIsSpeakSettingOpen(!isSpeakSettingOpen)}
            variant={isSpeakSettingOpen ? "contained" : "outlined"}
          >
            <ResponsiveIcon icon={TuneIcon} />
          </QuizWordHintButton>
          {isSpeakSettingOpen && <QuizWordHintSpeakSetting />}
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
  position: relative;
  margin-top: 5px;
`;

const QuizWordHintMenuButton = styled(Button)`
  padding: 0;
`;

const QuizWordHintButton = styled(Button)``;
