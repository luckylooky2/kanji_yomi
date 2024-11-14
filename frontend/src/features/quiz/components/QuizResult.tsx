import { quizIsStartedState, QuizStatus } from "@/entities/quiz/model";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";

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
