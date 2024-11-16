import { Button } from "@mui/material";
import { useSetAtom } from "jotai";

import { quizIsStartedState } from "@/entities/quiz/store";
import { QuizStatus } from "@/entities/quiz/types";

const QuizResult = () => {
  const setQuizStatus = useSetAtom(quizIsStartedState);
  return (
    <div>
      <h1>Congratulations!</h1>
      <Button
        variant="contained"
        onClick={() => setQuizStatus(QuizStatus.OPTION)}
      >
        Go To Start
      </Button>
    </div>
  );
};

export default QuizResult;
