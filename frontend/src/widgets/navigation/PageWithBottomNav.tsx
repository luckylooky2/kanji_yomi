import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import QuizIcon from "@mui/icons-material/Quiz";
import Navigation from "@mui/material/BottomNavigation";
import NavigationAction from "@mui/material/BottomNavigationAction";
import Link from "next/link";
import React, { useCallback } from "react";

import { getNavigationStatus } from "@/shared/model";

interface Props {
  children: React.ReactNode;
  path: string;
}

const BottomNavigation = ({ path }: { path: string }) => {
  const handleClick = useCallback(
    ({ currentTarget }: { currentTarget: HTMLButtonElement }) => {
      const link = currentTarget.querySelector("a");
      if (link) {
        link.click();
      }
    },
    []
  );

  const menus = [
    { label: "Quiz", href: "quiz", icon: <QuizIcon /> },
    { label: "Community", href: "community", icon: <ForumIcon /> },
    { label: "My Page", href: "mypage", icon: <AccountCircleIcon /> },
  ];

  return (
    <Navigation value={getNavigationStatus(path)} component="nav">
      {menus.map((menu, index) => (
        <NavigationAction
          key={index}
          label={menu.label}
          icon={<Link href={menu.href}>{menu.icon}</Link>}
          onClick={handleClick}
        />
      ))}
    </Navigation>
  );
};

const PageWithBottomNav = ({ children, path }: Props) => {
  return (
    <div
      style={{
        width: "300px",
        height: "500px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <main
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {children}
      </main>
      <BottomNavigation path={path} />
    </div>
  );
};

export default PageWithBottomNav;
