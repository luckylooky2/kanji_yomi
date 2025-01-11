import { Slider } from "@mui/material";
import { useAtom } from "jotai";

import { quizHintSpeakSettingState } from "@/entities/quiz/store";

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  type: string;
}

const QuizWordHintSlider = ({ min, max, step, value, type }: Props) => {
  const [, setSpeakSetting] = useAtom(quizHintSpeakSettingState);

  const handleSliderChange = (_e: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setSpeakSetting((prev) => ({ ...prev, [type]: newValue }));
  };

  return (
    <Slider
      min={min}
      max={max}
      step={step}
      value={value}
      valueLabelDisplay="auto"
      onChange={handleSliderChange}
    />
  );
};

export default QuizWordHintSlider;
