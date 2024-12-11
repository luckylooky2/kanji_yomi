import styled from "@emotion/styled";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button, ButtonGroup } from "@mui/material";
import { useAtom } from "jotai";

import { playTTS } from "@/entities/quiz/lib/playTTS";
import { quizCurrentKanjiState } from "@/entities/quiz/store";

const QuizWordHint = () => {
  const [{ data: kanji }] = useAtom(quizCurrentKanjiState);

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

  return (
    <QuizWordHintLayout>
      <ButtonGroup variant="outlined" aria-label="Hint button group">
        <Button onClick={handleSpeakWord}>
          <VolumeUpIcon />
        </Button>
        <Button onClick={handleRedirectDictionary}>
          <TravelExploreIcon />
        </Button>
      </ButtonGroup>
    </QuizWordHintLayout>
  );
};

export default QuizWordHint;

const QuizWordHintLayout = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
`;
