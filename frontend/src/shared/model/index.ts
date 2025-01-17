export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const BASE_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function responseInterceptor(response: Response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
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

export const difficulties = ["N5", "N4", "N3", "N2", "N1"];
export const roundMarks = [10, 30, 50, 70, 90, 100].map((v) => ({
  value: v,
  label: v,
}));
