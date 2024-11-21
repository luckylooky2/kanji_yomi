import styled from "@emotion/styled";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ForumIcon from "@mui/icons-material/Forum";
// import QuizIcon from "@mui/icons-material/Quiz";
// import Navigation from "@mui/material/BottomNavigation";
// import NavigationAction from "@mui/material/BottomNavigationAction";
// import Link from "next/link";
// import React, { useCallback } from "react";

// import { getNavigationStatus } from "@/shared/model";

interface Props {
  children: React.ReactNode;
  path: string;
}

// const BottomNavigation = ({ path }: { path: string }) => {
//   const handleClick = useCallback(
//     ({ currentTarget }: { currentTarget: HTMLButtonElement }) => {
//       const link = currentTarget.querySelector("a");
//       if (link) {
//         link.click();
//       }
//     },
//     []
//   );

//   const menus = [
//     { label: "Quiz", href: "quiz", icon: <QuizIcon /> },
//     { label: "Community", href: "community", icon: <ForumIcon /> },
//     { label: "My Page", href: "mypage", icon: <AccountCircleIcon /> },
//   ];

//   return (
//     <Navigation value={getNavigationStatus(path)} component="nav">
//       {menus.map((menu, index) => (
//         <NavigationAction
//           key={index}
//           label={menu.label}
//           icon={<Link href={menu.href}>{menu.icon}</Link>}
//           onClick={handleClick}
//         />
//       ))}
//     </Navigation>
//   );
// };

const PageWithBottomNav = ({ children }: Props) => {
  return (
    <>
      <MainContainer>{children}</MainContainer>
      {/* <BottomNavigation path={path} /> */}
    </>
  );
};

export default PageWithBottomNav;

const MainContainer = styled.main`
  height: 100%;
`;

// Container: 전체 레이아웃이나 주요 영역을 감싸는 컴포넌트
// Section: 섹션 단위로 나누는 컴포넌트
// Layout: 여러 UI 요소를 배치하는 컴포넌트
// Wrapper: 특정 UI 요소를 감싸는 역할을 하는 컴포넌트
// Item: 리스트나 컬렉션에서 하나의 항목을 나타내는 컴포넌트
