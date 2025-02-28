import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/header.module.css";

import LanguageSelectMenu from "./LanguageSelectMenu";

const Header = () => {
  return (
    <AppBar className={styles.headerAppBar}>
      <Toolbar className={styles.headerToolbar}>
        <div className={styles.linkContainer}>
          <Image
            src="/favicon/apple-touch-icon.png"
            alt="logo"
            width={33}
            height={33}
          />
          <Link href="/">漢字読み</Link>
        </div>
        <div className={styles.languageSelectLayout}>
          <LanguageSelectMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
