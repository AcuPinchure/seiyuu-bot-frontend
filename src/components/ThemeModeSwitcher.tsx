import { useColorScheme } from "@mui/material/styles";

import React, { useState } from "react";
import { IconButton, MenuItem, Menu } from "@mui/material";
import { Sun, Moon } from "@phosphor-icons/react";

const ThemeModeSwitcher: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { mode, systemMode, setMode } = useColorScheme();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
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
      <IconButton onClick={handleClick} aria-describedby={id} color="inherit">
        {(systemMode || mode) === "dark" ? <Moon /> : <Sun />}
      </IconButton>
      <Menu id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={() => handleModeChange("light")}>Light</MenuItem>
        <MenuItem onClick={() => handleModeChange("dark")}>Dark</MenuItem>
        <MenuItem onClick={() => handleModeChange("system")}>System</MenuItem>
      </Menu>
    </>
  );
};

export default ThemeModeSwitcher;
