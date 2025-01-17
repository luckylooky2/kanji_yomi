import AppsIcon from "@mui/icons-material/Apps";
import QuizIcon from "@mui/icons-material/Quiz";
import Navigation from "@mui/material/BottomNavigation";
import { headers } from "next/headers";
import React from "react";

import NavigationAction from "./NavigationAction";

const BottomNavigation = () => {
  const headersList = headers();
  const headerPathname = (headersList.get("x-pathname") || "/").slice(1);

  const menus = [
    { label: "Quiz", href: "quiz", icon: <QuizIcon /> },
    { label: "Words", href: "words", icon: <AppsIcon /> },
    // { label: "Community", href: "community", icon: <ForumIcon /> },
    // { label: "My Page", href: "mypage", icon: <AccountCircleIcon /> },
  ];

  return (
    <nav className="nav-position">
      <Navigation>
        {menus.map((menu, index) => (
          <NavigationAction
            key={index}
            menu={menu}
            headerPathname={headerPathname}
          />
        ))}
      </Navigation>
    </nav>
  );
};

export default BottomNavigation;

// Container: 전체 레이아웃이나 주요 영역을 감싸는 컴포넌트
// Section: 섹션 단위로 나누는 컴포넌트
// Layout: 여러 UI 요소를 배치하는 컴포넌트
// Wrapper: 특정 UI 요소를 감싸는 역할을 하는 컴포넌트
// Item: 리스트나 컬렉션에서 하나의 항목을 나타내는 컴포넌트
