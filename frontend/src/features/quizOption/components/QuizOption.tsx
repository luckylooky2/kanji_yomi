import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import { useAtom, useSetAtom } from "jotai";

import { quizIsStartedState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";
import {
  quizOptionRoundState,
  quizOptionDifficultyState,
} from "@/entities/quizOption/store";
import { rounds, difficulties } from "@/shared/model";
import { RowRadioGroup } from "@/widgets/HOC/withRowDirection";

import QuizOptionItem from "./QuizOptionItem";

const QuizOption = () => {
  const [difficulty, setDifficulty] = useAtom(quizOptionDifficultyState);
  const [round, setRound] = useAtom(quizOptionRoundState);
  const setQuizStatus = useSetAtom(quizIsStartedState);

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

  const handleRoundChange = ({ target }: { target: HTMLInputElement }) => {
    setRound(+target.value);
  };

  const startQuiz = () => {
    if (difficulty.length) {
      setQuizStatus(QuizStatus.ONGOING);
    } else {
    }
  };

  return (
    <>
      <form style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <QuizOptionItem title="Difficulties">
          <Stack direction="row" spacing={1}>
            {difficulties.map((item, index) => (
              <Chip
                key={index}
                variant={difficulty.includes(item) ? "filled" : "outlined"}
                color="primary"
                component="button"
                label={item}
                data-value={item}
                onClick={handleDifficultyChange}
              />
            ))}
          </Stack>
        </QuizOptionItem>
        <QuizOptionItem title="Rounds">
          <RowRadioGroup>
            {rounds.map((item, index) => (
              <FormControlLabel
                key={index}
                control={<Radio onChange={handleRoundChange} />}
                label={item}
                value={item}
                checked={round === item}
              />
            ))}
          </RowRadioGroup>
        </QuizOptionItem>
      </form>
      <Button onClick={startQuiz} variant="contained">
        quiz start
      </Button>
    </>
  );
};

export default QuizOption;
