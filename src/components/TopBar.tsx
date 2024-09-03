import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { List } from "@phosphor-icons/react";

interface TopBarProps {
  setNaviOpen: (open: boolean) => void;
  isMobile: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ setNaviOpen, isMobile }) => {
  return (
    <>
      <AppBar
        position={isMobile ? "fixed" : "static"}
        elevation={isMobile ? 2 : 0}
        color={isMobile ? "primary" : "transparent"}
      >
        <Toolbar>
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
          <Typography variant="h4">{"App"}</Typography>
          {isMobile && <Box flex={1} />}
        </Toolbar>
      </AppBar>
      {isMobile && <Box height={64} width={"100%"} />}
    </>
  );
};

export default TopBar;
