import dayjs, { Dayjs } from "dayjs";

export const getColorByAccuracy = (rate: number | undefined) => {
  if (rate === undefined) {
    return "black";
  }

  if (75 <= rate) {
    return "green";
  } else if (50 <= rate) {
    return "orange";
  } else if (0 <= rate) {
    return "red";
  }

  return "black";
};

export const getImageSourceList = () => [
  { src: "/correct.png", alt: "correct", description: "Correct" },
  { src: "/retried.png", alt: "retried", description: "Retried" },
  { src: "/skipped.png", alt: "skipped", description: "Skipped" },
];

export const findImageSource = (isSkipped: boolean, retries: number) => {
  const [correctImg, retriedImg, skippedImg] = getImageSourceList();
  if (isSkipped) {
    return { src: skippedImg.src, alt: skippedImg.alt };
  } else if (retries === 0) {
    return { src: correctImg.src, alt: correctImg.alt };
  } else {
    return { src: retriedImg.src, alt: retriedImg.alt };
  }
};

export const getTotalSeconds = (startTime: Dayjs | null) => {
  if (startTime === null) {
    return 0;
  }

  const endTime = dayjs(new Date());
  const totalSeconds = endTime.diff(startTime, "second");
  return totalSeconds;
};

export const timeFormattingFn = (num: number) => {
  const minutes = Math.floor(num / 60);
  const seconds = Math.floor(num % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export const percentFormattingFn = (num: number) => {
  return `${num}%`;
};

export const calculateAccuracy = (correct: number, totalRetries: number) => {
  const rate = Math.floor((correct / totalRetries) * 100);
  // isNaN은 자기 자신과도 같지 않기 때문에 비교가 항상 false로 평가된다.
  return isNaN(rate) ? 0 : rate;
};
