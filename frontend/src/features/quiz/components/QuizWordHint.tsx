import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TuneIcon from "@mui/icons-material/Tune";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button, ButtonGroup, Popper } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";

import { quizHintMenuOpenState } from "@/entities/quiz/store";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useQuizQuestion } from "@/shared/hooks/useQuizQuestion";
import { useQuizUserGuideStep } from "@/shared/hooks/useQuizUserGuideStep";
import { useTTS } from "@/shared/hooks/useTTS";
import { quizUserGuideIndex } from "@/shared/model";
import { theme } from "@/shared/styles/theme";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

import QuizWordHintSpeakSetting from "./QuizWordHintSpeakSetting";

const QuizWordHint = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(quizHintMenuOpenState);
  const [isSpeakSettingOpen, setIsSpeakSettingOpen] = useState(false);
  const { playTTS } = useTTS();
  const { currStep } = useQuizUserGuideStep();
  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  const { data: kanji } = useQuizQuestion();

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

  const handleClick = () => {
    setIsMenuOpen((previousOpen) => !previousOpen);
    setIsSpeakSettingOpen(false);
  };

  return (
    <QuizWordHintLayout id="quiz-hint">
      <QuizWordHintMenuButton variant="text" onClick={handleClick}>
        <ResponsiveIcon icon={isMenuOpen ? ClearIcon : MenuIcon} />
      </QuizWordHintMenuButton>
      <QuizWordHintPopper
        open={isMenuOpen}
        anchorEl={document.getElementById("quiz-hint")}
        placement="bottom"
        isGuideSelected={currStep === quizUserGuideIndex.HINT_MENU}
      >
        <QuizWordHintButtonGroup
          variant="outlined"
          orientation="vertical"
          aria-label="Hint button group"
          isMobile={isMobile}
        >
          <Button onClick={handleSpeakWord}>
            <ResponsiveIcon icon={VolumeUpIcon} />
          </Button>
          <Button
            onClick={() => setIsSpeakSettingOpen(!isSpeakSettingOpen)}
            variant={isSpeakSettingOpen ? "contained" : "outlined"}
          >
            <ResponsiveIcon icon={TuneIcon} />
          </Button>
          {isSpeakSettingOpen && <QuizWordHintSpeakSetting />}
          <Button onClick={handleRedirectDictionary}>
            <ResponsiveIcon icon={TravelExploreIcon} />
          </Button>
        </QuizWordHintButtonGroup>
      </QuizWordHintPopper>
    </QuizWordHintLayout>
  );
};

export default QuizWordHint;

const QuizWordHintLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const QuizWordHintButtonGroup = styled(ButtonGroup)<{ isMobile: boolean }>`
  position: relative;

  .MuiButtonBase-root {
    padding: auto 0;
    height: ${({ isMobile }) => (isMobile ? "28px" : "32px")};
  }
`;

const QuizWordHintMenuButton = styled(Button)`
  padding: 0;
`;

const QuizWordHintPopper = styled(Popper)<{ isGuideSelected?: boolean }>`
  .MuiButtonGroup-root {
    background-color: white;
  }

  ${({ isGuideSelected }) =>
    isGuideSelected &&
    `
    z-index: 10000;
    transform: scale(1.1);
    `}
`;
