import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { FabProps } from "@mui/material";
import { useState } from "react";
import { Funnel } from "@phosphor-icons/react";
import DialogTransition from "./DialogTransition";

interface FilterWithTriggerProps {
  triggerButtonProps?: Omit<FabProps, "onClick">;
  children: React.ReactNode;
  onApply?: () => void;
  onCancel?: () => void;
}

const FilterWithTrigger: React.FC<FilterWithTriggerProps> = ({
  triggerButtonProps,
  children,
  onApply,
  onCancel,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
    handleClose();
  }

  function handleApply() {
    if (onApply) {
      onApply();
    }
    handleClose();
  }

  const open = Boolean(anchorEl);
  const id = open ? "filter-options" : undefined;

  const desktopContent = (
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
            overflow: "hidden",
          },
        },
      }}
    >
      {children}
      <DialogActions sx={{ marginX: -2, marginBottom: -2 }}>
        <Button onClick={handleCancel}>Close</Button>
        {onApply && (
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        )}
      </DialogActions>
    </Popover>
  );

  const mobileContent = (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      TransitionComponent={DialogTransition}
      disableScrollLock
    >
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Close</Button>
        {onApply && (
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

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
          bottom: isMobile ? "5vw" : "3rem",
          right: isMobile ? "5vw" : "3rem",
          zIndex: 100,
        }}
      >
        <Funnel size={24} />
      </Fab>
      {isMobile ? mobileContent : desktopContent}
    </>
  );
};

export default FilterWithTrigger;
