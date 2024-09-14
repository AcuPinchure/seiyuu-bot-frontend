import { useColorScheme } from "@mui/material/styles";

import React, { useState } from "react";
import {
  MenuItem,
  Menu,
  ListItemButton,
  Typography,
  Stack,
  ListItem,
} from "@mui/material";
import { Sun, Moon } from "@phosphor-icons/react";

interface ThemeModeSwitcherProps {
  isMobile: boolean;
  barOpen: boolean;
}

const ThemeModeSwitcher: React.FC<ThemeModeSwitcherProps> = ({
  isMobile,
  barOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { mode, systemMode, setMode } = useColorScheme();

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleModeChange(mode: "light" | "dark" | "system") {
    setMode(mode);
    handleClose();
  }

  const open = Boolean(anchorEl);
  const id = open ? "dark-mode-popover" : undefined;

  return (
    <>
      <ListItem disableGutters disablePadding>
        <ListItemButton
          onClick={handleClick}
          aria-describedby={id}
          color="inherit"
        >
          <Stack direction="row" spacing={2} alignItems={"center"} height={52}>
            {(systemMode || mode) === "dark" ? (
              <Moon weight="bold" size={20} />
            ) : (
              <Sun weight="bold" size={20} />
            )}
            {(isMobile || barOpen) && (
              <Typography variant="body1">Change Theme</Typography>
            )}
          </Stack>
        </ListItemButton>
      </ListItem>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        disableScrollLock
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleModeChange("light")}>Light</MenuItem>
        <MenuItem onClick={() => handleModeChange("dark")}>Dark</MenuItem>
        <MenuItem onClick={() => handleModeChange("system")}>System</MenuItem>
      </Menu>
    </>
  );
};

export default ThemeModeSwitcher;
