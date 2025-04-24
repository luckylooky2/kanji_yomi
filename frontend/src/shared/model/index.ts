import { toast } from "react-toastify";

import { settingLanguageType } from "@/entities/setting/types";

import { CorrectRatioType, DifficultyType } from "../types";

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const BASE_OPTIONS: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
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

    if (response.status === 401) {
      toast.error("로그인 정보가 유효하지 않습니다.");
    }

    if (!response.ok) {
      throw new Error(`${response.status}`);
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
  HOW_TO_SET_HIRAGANA: 2,
  SUBMIT_BUTTON: 3,
  SKIP_BUTTON: 4,
  PROGRESS_BAR: 5,
  HINT_MENU: 6,
  QUIT_BUTTON: 7,
  FINISH_BUTTON: 8,
};

export const permittedLocales: settingLanguageType[] = ["en", "ko"];
export const knownRoutes = ["landing", "quiz", "words"];
