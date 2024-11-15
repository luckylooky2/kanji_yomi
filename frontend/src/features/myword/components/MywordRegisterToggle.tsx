"use client";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import IconButton from "@mui/material/IconButton";
import { useSetAtom } from "jotai";
import { useState } from "react";

import { GlobalModalIsOpenState } from "@/entities/modal/store";

const MywordRegisterToggle = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const setIsOpen = useSetAtom(GlobalModalIsOpenState);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton
        aria-label="star"
        color="primary"
        style={{ right: "0", width: "40px" }}
        onClick={() => {
          setIsOpen(true);
          // setIsRegistered((prev) => !prev);
        }}
      >
        {isRegistered ? <BookmarkOutlinedIcon /> : <BookmarkAddOutlinedIcon />}
      </IconButton>
    </div>
  );
};

export default MywordRegisterToggle;
