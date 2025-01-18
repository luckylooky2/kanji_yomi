"use client";

import styled from "@emotion/styled";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Link from "next/link";
import { useCallback } from "react";

import { NavigationMenu } from "@/entities/navigation/types";

interface Props {
  menu: NavigationMenu;
  headerPathname: string;
}

const NavigationAction = ({ menu, headerPathname }: Props) => {
  const handleClick = useCallback(
    ({ currentTarget }: { currentTarget: HTMLButtonElement }) => {
      const link = currentTarget.querySelector("a");
      if (link) {
        link.click();
      }
    },
    []
  );

  const isActive = headerPathname === menu.label.toLowerCase();

  return (
    <NavigationActionWrapper
      showLabel
      isActive={isActive}
      label={menu.label}
      icon={<Link href={menu.href}>{menu.icon}</Link>}
      onClick={handleClick}
    />
  );
};

export default NavigationAction;

const NavigationActionWrapper = styled(BottomNavigationAction, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{
  isActive: boolean;
}>`
  color: ${(props) => (props.isActive ? "#1976d2" : "gray")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
`;
