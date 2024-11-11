"use client";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const ToggleRegister = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton
        aria-label="star"
        color="primary"
        style={{ right: "0", width: "40px" }}
        onClick={() => {
          setIsRegistered((prev) => !prev);
        }}
      >
        {isRegistered ? <BookmarkOutlinedIcon /> : <BookmarkAddOutlinedIcon />}
      </IconButton>
    </div>
  );
};

export default ToggleRegister;
