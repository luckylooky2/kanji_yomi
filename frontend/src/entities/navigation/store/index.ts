import { atom } from "jotai";

export const enum NavigationStatus {
  LOADING = -1,
  QUIZ = 0,
  COMMUNITY = 1,
  MYPAGE = 2,
}

export function getNavigationStatus(path: string) {
  switch (path) {
    case "quiz":
      return NavigationStatus.QUIZ;
    case "community":
      return NavigationStatus.COMMUNITY;
    case "mypage":
      return NavigationStatus.MYPAGE;
    default:
      return NavigationStatus.LOADING;
  }
}

export const navigationStatusState = atom<NavigationStatus>(
  NavigationStatus.LOADING
);
