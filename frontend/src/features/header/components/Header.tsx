import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar className="header-appbar">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" component="div">
          <Link href="/">漢字読み - Kanji Yomi</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
