import styled from "@emotion/styled";
import CloseButton from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";

import { wordsCurrentWordIndex } from "@/entities/words/store";
import WordMenuTrigger from "@/features/wordMenu/components/WordMenuTrigger";
import { useFetchWords } from "@/shared/hooks/useFetchWords";
import { getMUIColorByCorrectRatio } from "@/shared/lib";
import { theme } from "@/shared/styles/theme";
import ResponsiveChip from "@/widgets/Responsive/ResponsiveChip";

const WordsCurrentWord = () => {
  const [currentWordIndex, setCurrentWordIndex] = useAtom(
    wordsCurrentWordIndex
  );
  const { words, isLoading } = useFetchWords();
  const isWordSelected = currentWordIndex !== null;

  if (isLoading || !words || currentWordIndex === null) {
    return;
  }

  const word = words[currentWordIndex];
  const correctRatio = Math.ceil(word.correctRatio * 100);

  return (
    <WordsCurrentWordContainer isWordSelected={isWordSelected}>
      <WordsCurrentWordTitle>
        <WordMenuTrigger>
          <WordsCurrentWordWordContainer>
            <h1>{word.word}</h1>
          </WordsCurrentWordWordContainer>
        </WordMenuTrigger>
        <ResponsiveChip
          // variant="outlined"
          color={getMUIColorByCorrectRatio(correctRatio)}
          label={correctRatio + "%"}
        />
      </WordsCurrentWordTitle>
      <WordsCurrentWordMeaningLayout>
        {word.meanings.map(({ meaning, difficulty }, index) => (
          <WordsCurrentWordMeaning key={index}>
            <ResponsiveChip color="primary" label={difficulty} />
            <WordMenuTrigger>
              <h2>{meaning}</h2>
            </WordMenuTrigger>
          </WordsCurrentWordMeaning>
        ))}
      </WordsCurrentWordMeaningLayout>
      <WordsCurrentWordCloseButton onClick={() => setCurrentWordIndex(null)}>
        <CloseButton />
      </WordsCurrentWordCloseButton>
    </WordsCurrentWordContainer>
  );
};

export default WordsCurrentWord;

const WordsCurrentWordContainer = styled.div<{ isWordSelected: boolean }>`
  height: 190px;
  border: 2px solid rgba(25, 118, 210, 0.5);
  border-radius: 12px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
  padding: 16px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${(props) =>
    props.isWordSelected ? "" : "slideUp 0.1s ease-out"};
  position: relative;

  @keyframes slideUp {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  > div {
    margin-left: ${theme.spacing.small};
  }
`;

const WordsCurrentWordTitle = styled.div`
  display: flex;
  gap: ${theme.spacing.small};

  div {
    margin: auto 0;
  }
`;

const WordsCurrentWordMeaningLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  overflow: auto;
  gap: ${theme.spacing.small};
`;

const WordsCurrentWordMeaning = styled.div`
  display: flex;
  gap: ${theme.spacing.small};

  h2 {
    margin: auto ${theme.spacing.small};
    font-weight: normal;
  }

  div {
    margin: auto 0;
  }

  button {
    width: 30px;
    min-width: 0;
  }
`;

const WordsCurrentWordCloseButton = styled(Button)`
  position: absolute;
  right: 0;
`;

const WordsCurrentWordWordContainer = styled.div`
  padding: 0 10px;
`;
