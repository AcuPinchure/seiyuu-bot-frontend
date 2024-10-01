import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { List } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";

interface TopBarProps {
  setNaviOpen: (open: boolean) => void;
  isMobile: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ setNaviOpen, isMobile }) => {
  const location = useLocation();

  let title = "Lovelive Seiyuu Bot";

  switch (location.pathname.split("/")[1]) {
    case "stats":
      title = "Statistics";
      break;
    case "status":
      title = "Service Status";
      break;
    case "library":
      title = "Image Library";
      break;
    case "logs":
      title = "Logs";
      break;
    case "login":
      title = "Admin Login";
      break;
    default:
      break;
  }

  return (
    <>
      <AppBar
        position={isMobile ? "fixed" : "static"}
        elevation={isMobile ? 2 : 0}
        color={isMobile ? "secondary" : "transparent"}
      >
        <Toolbar disableGutters={!isMobile}>
          {isMobile && (
            <Box flex={1}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setNaviOpen(true)}
              >
                <List />
              </IconButton>
            </Box>
          )}
          <Typography variant="h4">{title}</Typography>
          {isMobile && <Box flex={1} />}
        </Toolbar>
      </AppBar>
      {isMobile && <Box height={64} width={"100%"} />}
    </>
  );
};

export default TopBar;
