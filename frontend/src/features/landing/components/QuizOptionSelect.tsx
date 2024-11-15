import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import { useAtom, useSetAtom } from "jotai";

import {
  quizOptionRoundState,
  quizOptionDifficultyState,
} from "@/entities/option/store";
import { quizIsStartedState, QuizStatus } from "@/entities/quiz/model";
import { rounds, difficulties } from "@/shared/model";
import { RowRadioGroup } from "@/widgets/HOC/withRowDirection";

import OptionStyle from "./OptionStyle";

const QuizOptionSelect = () => {
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
        <OptionStyle title="Difficulties">
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
        </OptionStyle>
        <OptionStyle title="Rounds">
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
        </OptionStyle>
      </form>
      <Button onClick={startQuiz} variant="contained">
        quiz start
      </Button>
    </>
  );
};

export default QuizOptionSelect;
