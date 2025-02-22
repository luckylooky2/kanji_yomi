import { CorrectRatioType, DifficultyType } from "../types";

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const BASE_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function responseInterceptor(
  url: string,
  options: RequestInit = {}
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  function isAbortError(error: unknown): error is DOMException {
    return error instanceof DOMException && error.name === "AbortError";
  }

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (isAbortError(error)) {
      throw new Error("Request timed out");
    }

    throw error;
  }
}

const enum NavigationStatus {
  ROOT = -1,
  QUIZ = 0,
  WORDS = 1,
  MYPAGE = 2,
  COMMUNITY = 3,
}

export function getNavigationStatus(path: string) {
  switch (path) {
    case "quiz":
      return NavigationStatus.QUIZ;
    case "words":
      return NavigationStatus.WORDS;
    case "mypage":
      return NavigationStatus.MYPAGE;
    case "community":
      return NavigationStatus.COMMUNITY;
    default:
      return NavigationStatus.ROOT;
  }
}

export const correctRatio: CorrectRatioType[] = ["High", "Mid", "Low"];
export const difficulties: DifficultyType[] = ["N5", "N4", "N3", "N2", "N1"];
export const roundMarks = [10, 30, 50, 70, 90, 100].map((v) => ({
  value: v,
  label: v,
}));

export const quizUserGuideIndex = {
  ANSWER_INPUT: 1,
  SUBMIT_BUTTON: 2,
  SKIP_BUTTON: 3,
  PROGRESS_BAR: 4,
  HINT_MENU: 5,
  QUIT_BUTTON: 6,
  FINISH_BUTTON: 7,
};
