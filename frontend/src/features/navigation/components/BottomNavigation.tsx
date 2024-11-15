"use client";

import Navigation from "@mui/material/BottomNavigation";
import Link from "next/link";

import { getNavigationStatus, menus } from "@/entities/navigation/model";

import { LinkNavigationAction } from "./LinkNavigationAction";

interface Props {
  path: string;
}

const BottomNavigation = ({ path }: Props) => {
  return (
    <Navigation value={getNavigationStatus(path)}>
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
