"use client";

import Navigation from "@mui/material/BottomNavigation";
import { useAtom } from "jotai";
import Link from "next/link";

import { menus } from "@/entities/navigation/model";
import {
  NavigationStatus,
  navigationStatusState,
} from "@/entities/navigation/store";

import { LinkNavigationAction } from "./LinkNavigationAction";

const BottomNavigation = () => {
  const [navStatus, setNavStatus] = useAtom(navigationStatusState);

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
