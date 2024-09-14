import { Box, Fab, Popover } from "@mui/material";
import type { FabProps } from "@mui/material";
import { useState } from "react";
import { Funnel } from "@phosphor-icons/react";

interface FilterWithTriggerProps {
  triggerButtonProps?: Omit<FabProps, "onClick">;
  children: React.ReactNode;
}

const FilterWithTrigger: React.FC<FilterWithTriggerProps> = ({
  triggerButtonProps,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "filter-options" : undefined;

  return (
    <>
      <Box height={"8rem"} />
      <Fab
        aria-describedby={id}
        color="primary"
        onClick={handleClick}
        {...triggerButtonProps}
        sx={{
          position: "fixed",
          bottom: "3rem",
          right: "3rem",
          zIndex: 100,
        }}
      >
        <Funnel />
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        disableScrollLock
        slotProps={{
          paper: {
            sx: {
              padding: 2,
            },
          },
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default FilterWithTrigger;
