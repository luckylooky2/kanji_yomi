import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { AnswerInputType, QuizStatus } from "@/entities/quiz/model/quiz";
import { Kanji } from "@/shared/model/db";
import "../../../app/ui/utils.css";

interface Props {
  kanji: Kanji;
  random: () => void;
}

const AnswerForm = ({ kanji, random }: Props) => {
  const { register, handleSubmit, reset } = useForm<AnswerInputType>();
  const [status, setStatus] = useState(QuizStatus.BEFORE);
  const [shake, setShake] = useState(false);
  const timeId = useRef<NodeJS.Timeout | null>(null);

  // handleSubmit이 data(input 값을) 인자로 호출
  const onSubmit = ({ answer }: AnswerInputType) => {
    if (answer === kanji[1]) {
      random();
      reset();
    } else {
      triggerShake();
    }
  };

  const triggerShake = () => {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    setShake(true);
    setStatus(QuizStatus.WRONG);

    const id = setTimeout(() => {
      setShake(false);
      setStatus(QuizStatus.BEFORE);
      timeId.current = null;
    }, 1000);
    timeId.current = id;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", gap: "5px" }}
    >
      <input
        {...register("answer")}
        className={shake ? "shake" : ""}
        autoComplete="off"
        style={{
          borderColor:
            status === QuizStatus.BEFORE
              ? "white"
              : status === QuizStatus.CORRECT
              ? "greenyellow"
              : "red",
          flex: 4,
        }}
      />
      <button style={{ flex: 1 }}>submit</button>
      <button
        style={{ flex: 1 }}
        onClick={() => {
          random();
          reset();
        }}
      >
        skip
      </button>
    </form>
  );
};

export default AnswerForm;
