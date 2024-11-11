import { atom } from "jotai";

export const enum NavigationStatus {
  QUIZ = 0,
  COMMUNITY = 1,
  MYPAGE = 2,
}

export const navigationStatusState = atom<NavigationStatus>(
  NavigationStatus.QUIZ
);
