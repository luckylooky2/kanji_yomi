import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import { useAtom, useSetAtom } from "jotai";

import {
  quizOptionRoundState,
  quizOptionSourceState,
} from "@/entities/option/store";
import { quizIsStartedState, QuizStatus } from "@/entities/quiz/model";
import { RowRadioGroup } from "@/shared/components/withRowDirection";
import { ROUNDS, SOURCES } from "@/shared/model/db";

import OptionStyle from "./OptionStyle";

const QuizOptionSelect = () => {
  const [source, setSource] = useAtom(quizOptionSourceState);
  const [round, setRound] = useAtom(quizOptionRoundState);
  const setQuizStatus = useSetAtom(quizIsStartedState);

  const handleSourceChange = ({
    currentTarget,
  }: {
    currentTarget: HTMLButtonElement;
  }) => {
    const currSource = currentTarget.dataset.value as string;
    let nextSource;
    if (source.includes(currSource)) {
      nextSource = source.filter((v) => v !== currSource);
    } else {
      nextSource = [...source, currSource];
    }
    setSource(nextSource);
  };

  const handleRoundChange = ({ target }: { target: HTMLInputElement }) => {
    setRound(+target.value);
  };

  const startQuiz = () => {
    if (source.length) {
      setQuizStatus(QuizStatus.ONGOING);
    } else {
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        gap: "20px",
      }}
    >
      <form style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
        <OptionStyle title="단어 소스">
          <Stack direction="row" spacing={1}>
            {SOURCES.map((item, index) => (
              <Chip
                key={index}
                variant={source.includes(item) ? "filled" : "outlined"}
                color="primary"
                component="button"
                label={item}
                data-value={item}
                onClick={handleSourceChange}
              />
            ))}
          </Stack>
        </OptionStyle>
        <OptionStyle title="라운드">
          <RowRadioGroup>
            {ROUNDS.map((item, index) => (
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
    </section>
  );
};

export default QuizOptionSelect;
