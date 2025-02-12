import { Dayjs } from "dayjs";

import { QuizResultLegendType } from "../type";

export const quizResultLegendList: (QuizResultLegendType | "All")[] = [
  "All",
  "Correct",
  "Retried",
  "Skipped",
];

export const getTotalSeconds = (
  startTime: Dayjs | null,
  endTime: Dayjs | null
) => {
  if (startTime === null || endTime === null) {
    // TODO: 로깅
    return 0;
  }

  const totalSeconds = endTime.diff(startTime, "second");
  if (totalSeconds < 0) {
    // TODO: 로깅
    return 0;
  }
  return totalSeconds;
};

export const timeFormattingFn = (num: number) => {
  const minutes = Math.floor(num / 60);
  const seconds = Math.floor(num % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export const accuracyColorFormattingFn = (ratio: number | undefined) => {
  if (ratio === undefined) {
    return "black";
  }

  if (80 <= ratio) {
    return "green";
  } else if (50 <= ratio) {
    return "orange";
  } else if (0 <= ratio) {
    return "red";
  }

  return "black";
};

export const accuracyFormattingFn = (num: number) => {
  return `${num}%`;
};

export const calculateAccuracy = (correct: number, totalRetries: number) => {
  const rate = Math.floor((correct / totalRetries) * 100);
  // isNaN은 자기 자신과도 같지 않기 때문에 비교가 항상 false로 평가된다.
  return isNaN(rate) ? 0 : rate;
};
