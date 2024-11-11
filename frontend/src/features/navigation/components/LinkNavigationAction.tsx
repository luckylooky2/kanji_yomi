import NavigationAction from "@mui/material/BottomNavigationAction";
import React, { useCallback } from "react";

interface LinkNavigationActionProps
  extends React.ComponentProps<typeof NavigationAction> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const LinkNavigationAction = (props: LinkNavigationActionProps) => {
  const handleClick = useCallback(
    ({ currentTarget }: { currentTarget: HTMLButtonElement }) => {
      const link = currentTarget.querySelector("a");
      if (link) {
        link.click();
      }
    },
    []
  );

  return <NavigationAction {...props} onClick={handleClick} />;
};
