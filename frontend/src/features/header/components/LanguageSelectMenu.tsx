"use client";

import styled from "@emotion/styled";
import LanguageIcon from "@mui/icons-material/Language";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useRef, useState } from "react";

import { settingLanguageType } from "@/entities/setting/types";
import { useLocale } from "@/shared/hooks/useLocale";

import styles from "../styles/header.module.css";

const LanguageSelectMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>();
  const { locale, setLocale } = useLocale();

  const handleToggleLanguageMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseLanguageMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSetLanguageAndClose = (lang: settingLanguageType) => () => {
    setLocale(lang);
    setIsMenuOpen(false);
  };

  return (
    <>
      <IconButton
        id="language-select"
        className={styles.languageButton}
        ref={(node) => {
          if (node) {
            menuRef.current = node;
          }
        }}
        onClick={handleToggleLanguageMenu}
        size="small"
        aria-controls={isMenuOpen ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
      >
        <LanguageIcon className={styles.buttonContent} />
        <div className={styles.buttonContent}>
          {locale === "en" ? "English" : "한국어"}
        </div>
      </IconButton>
      <Popper
        className={styles.languagePopper}
        open={isMenuOpen}
        anchorEl={menuRef.current}
        role="language-menu"
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseLanguageMenu}>
                <MenuList autoFocusItem={isMenuOpen} id="language-menu-list">
                  <LanguageMenuItem
                    onClick={handleSetLanguageAndClose("en")}
                    isSelected={locale === "en"}
                  >
                    🇺🇸 English
                  </LanguageMenuItem>
                  <LanguageMenuItem
                    onClick={handleSetLanguageAndClose("ko")}
                    isSelected={locale === "ko"}
                  >
                    🇰🇷 한국어
                  </LanguageMenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default LanguageSelectMenu;

const LanguageMenuItem = styled(MenuItem)<{
  isSelected: boolean;
}>`
  background-color: ${({ isSelected }) => (isSelected ? "#cccccc" : "white")};

  &.MuiButtonBase-root:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#bbbbbb" : "#eeeeee"};
  }
`;
