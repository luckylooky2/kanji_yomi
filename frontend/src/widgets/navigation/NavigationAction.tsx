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

  const isSelected = headerPathname === menu.label.toLowerCase();

  return (
    <NavigationActionWrapper
      showLabel
      isSelected={isSelected}
      label={menu.label}
      icon={<Link href={menu.href}>{menu.icon}</Link>}
      onClick={handleClick}
    />
  );
};

export default NavigationAction;

const NavigationActionWrapper = styled(BottomNavigationAction)<{
  isSelected: boolean;
}>`
  color: ${(props) => (props.isSelected ? "#1976d2" : "gray")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
`;
