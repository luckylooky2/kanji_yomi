export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

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
      return NavigationStatus.ROOT;
  }
}

export const difficulties = ["N5", "N4", "N3"];
export const roundMarks = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 30,
    label: 30,
  },
  {
    value: 100,
    label: 100,
  },
];
