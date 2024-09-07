import { Box, Button, Popover } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { useState } from "react";

interface FilterWithTriggerProps {
  triggerButtonProps?: Omit<ButtonProps, "onClick">;
  triggerButtonContent: React.ReactNode | string;
  children: React.ReactNode;
}

const FilterWithTrigger: React.FC<FilterWithTriggerProps> = ({
  triggerButtonProps,
  triggerButtonContent,
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
    <Box mb={2}>
      <Button
        size="small"
        aria-describedby={id}
        variant="contained"
        color="secondary"
        onClick={handleClick}
        {...triggerButtonProps}
      >
        {triggerButtonContent}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
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
    </Box>
  );
};

export default FilterWithTrigger;
