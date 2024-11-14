"use client";

import Navigation from "@mui/material/BottomNavigation";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";

import { menus } from "@/entities/navigation/model";
import {
  getNavigationStatus,
  NavigationStatus,
  navigationStatusState,
} from "@/entities/navigation/store";

import { LinkNavigationAction } from "./LinkNavigationAction";

const BottomNavigation = () => {
  const [navStatus, setNavStatus] = useAtom(navigationStatusState);

  useEffect(() => {
    const pathname = window.location.pathname.slice(1);
    setNavStatus(getNavigationStatus(pathname));
  }, []);

  return (
    <Navigation
      value={navStatus}
      onChange={(_event, newNavStatus) => {
        setNavStatus(newNavStatus as NavigationStatus);
      }}
    >
      {menus.map((menu, index) => (
        <LinkNavigationAction
          key={index}
          label={menu.label}
          icon={<Link href={menu.href}>{menu.icon}</Link>}
        />
      ))}
    </Navigation>
  );
};

export default BottomNavigation;
