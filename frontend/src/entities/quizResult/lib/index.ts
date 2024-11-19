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

export const getImageSource = (isSkipped: boolean, retries: number) => {
  if (isSkipped) {
    return { src: "/skip.png", alt: "skip" };
  } else if (retries === 0) {
    return { src: "/pass.png", alt: "pass" };
  } else {
    return { src: "/fail.png", alt: "fail" };
  }
};

export const calculateTime = (startTime: Dayjs | null) => {
  if (startTime == null) {
    return `0:00`;
  }

  const endTime = dayjs(new Date());
  const totalSeconds = endTime.diff(startTime, "second");

  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
};

export const calculateAccuracy = (correct: number, totalRetries: number) => {
  const rate = Math.floor((correct / totalRetries) * 100);
  // isNaN은 자기 자신과도 같지 않기 때문에 비교가 항상 false로 평가된다.
  return isNaN(rate) ? 0 : rate;
};
