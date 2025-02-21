import styled from "@emotion/styled";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";

import { quizStatusState, quizTimerState } from "@/entities/quiz/store";
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
  const [quizTimer, setQuizTimer] = useAtom(quizTimerState);

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
    setQuizTimer({ ...quizTimer, quizStartTime: dayjs(new Date()) });
    setQuizStatus(QuizStatus.ONGOING);
  };

  return (
    <QuizOptionContainer>
      <h2>Options</h2>
      <QuizOptionSection>
        <QuizOptionLayout title="Input Type">
          <ToggleButtonGroupWrapper
            color="primary"
            value="Typing"
            exclusive
            aria-label="Platform"
          >
            <TypingToggleButton value="Typing" selected>
              <KeyboardIcon />
              Typing
            </TypingToggleButton>
          </ToggleButtonGroupWrapper>
        </QuizOptionLayout>
        <QuizOptionLayout title="JLPT Difficulty">
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
        <QuizOptionLayout title="Round">
          <SliderWrapper
            aria-label="quiz-round"
            defaultValue={round}
            step={10}
            min={10}
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
  gap: ${theme.spacing.medium};
  height: 95%;

  h2 {
    margin-top: 30px;
  }
`;

const QuizOptionSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing.large};
  gap: ${theme.spacing.small};
  height: 100%;
  overflow: auto;
`;

const SliderWrapper = styled(Slider)`
  width: 80%;
`;

const ToggleButtonGroupWrapper = styled(ToggleButtonGroup)`
  width: 100%;
`;

const TypingToggleButton = styled(ToggleButton)`
  width: 100%;
  display: flex;
  gap: ${theme.spacing.xsmall};
  padding: ${theme.spacing.xsmall};
  text-transform: none;

  &.Mui-selected {
    background-color: #1976d2;
    color: white;
  }

  &.Mui-selected:hover {
    background-color: #1565c0;
  }
`;
