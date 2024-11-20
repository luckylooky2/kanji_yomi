import { Divider } from "@mui/material";
import { ReactNode } from "react";

const CustomDivider = ({ children }: { children: ReactNode }) => {
  return (
    <Divider
      sx={{
        "&::before, &::after": {
          borderWidth: "1.5px",
          bgcolor: "lightgray",
        },
      }}
    >
      {children}
    </Divider>
  );
};

export default CustomDivider;
