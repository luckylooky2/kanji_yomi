import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import QuizIcon from "@mui/icons-material/Quiz";

export const menus = [
  { label: "Quiz", href: "quiz", icon: <QuizIcon /> },
  { label: "Community", href: "community", icon: <ForumIcon /> },
  { label: "My Page", href: "mypage", icon: <AccountCircleIcon /> },
];

export const enum NavigationStatus {
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
