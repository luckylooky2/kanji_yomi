import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar style={{ position: "static" }}>
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="h6" component="div">
          <Link href="/">Kanji Yomi</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
