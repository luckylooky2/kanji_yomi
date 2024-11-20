import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useAtom, useSetAtom } from "jotai";

import { quizStatusState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import {
  quizOptionRoundState,
  quizOptionDifficultyState,
} from "@/entities/quizOption/store";
import { difficulties, roundMarks } from "@/shared/model";
import { theme } from "@/shared/styles/theme";

import QuizOptionLayout from "./QuizOptionLayout";

const QuizOptions = () => {
  const [difficulty, setDifficulty] = useAtom(quizOptionDifficultyState);
  const [round, setRound] = useAtom(quizOptionRoundState);
  const setQuizStatus = useSetAtom(quizStatusState);

  const handleDifficultyChange = ({
    currentTarget,
  }: {
    currentTarget: HTMLButtonElement;
  }) => {
    const currDifficulty = currentTarget.dataset.value as string;
    let nextDifficulty;
    if (difficulty.includes(currDifficulty)) {
      nextDifficulty = difficulty.filter((v) => v !== currDifficulty);
    } else {
      nextDifficulty = [...difficulty, currDifficulty];
    }
    setDifficulty(nextDifficulty);
  };

  const handleRoundChange = (_event: Event, value: number | number[]) => {
    setRound(value as number);
  };

  const startQuiz = () => {
    setQuizStatus(QuizStatus.ONGOING);
  };

  return (
    <QuizOptionContainer>
      <h1>Options</h1>
      <QuizOptionSection>
        <QuizOptionLayout title="Difficulties">
          <Stack direction="row" spacing={1}>
            {difficulties.map((item, index) => (
              <Chip
                key={index}
                variant={difficulty.includes(item) ? "filled" : "outlined"}
                color="primary"
                component="button"
                label={item}
                data-value={item}
                aria-label={item}
                onClick={handleDifficultyChange}
              />
            ))}
          </Stack>
        </QuizOptionLayout>
        <QuizOptionLayout title="Rounds" spacing="large">
          <SliderWrapper
            aria-label="quiz-round"
            defaultValue={round}
            step={10}
            min={10}
            valueLabelDisplay="on"
            marks={roundMarks}
            onChange={handleRoundChange}
          />
        </QuizOptionLayout>
      </QuizOptionSection>
      <Button
        onClick={startQuiz}
        variant="contained"
        disabled={!(difficulty.length && round)}
      >
        start
      </Button>
    </QuizOptionContainer>
  );
};

export default QuizOptions;

const QuizOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const QuizOptionSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing.large};
  gap: ${theme.spacing.small};
  height: 100%;
`;

const SliderWrapper = styled(Slider)`
  width: 80%;
`;
