import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link href="/">kanji yomu</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
