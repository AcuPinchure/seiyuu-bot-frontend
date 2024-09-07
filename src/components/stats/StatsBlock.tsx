import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface StatsBlockProps {
  icon: React.ReactNode;
  title: string;
  value: string; // toLocaleString
  subtitle: string;
  detailModalTitle?: string;
  detailModalContent?: React.ReactNode;
  modalMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  modalFullWidth?: boolean;
}

const StatsBlock: React.FC<StatsBlockProps> = ({
  icon,
  title,
  value,
  subtitle,
  detailModalTitle,
  detailModalContent,
  modalMaxWidth,
  modalFullWidth,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Paper elevation={0} variant="outlined" sx={{ flex: 1 }}>
        <Stack
          direction={"column"}
          alignItems="flex-start"
          spacing={2}
          onClick={detailModalContent ? () => setOpenModal(true) : undefined}
          sx={{ cursor: detailModalContent ? "pointer" : "default" }}
          p={2}
          minWidth={200}
        >
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h6">{icon}</Typography>
            <Typography variant="h6">{title}</Typography>
          </Stack>
          <Typography variant="h3">{value}</Typography>
          <Typography variant="body1" sx={{ opacity: 0.5 }}>
            {subtitle}
          </Typography>
        </Stack>
      </Paper>
      {(detailModalTitle || detailModalContent) && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          scroll="paper"
          maxWidth={modalMaxWidth}
          fullWidth={modalFullWidth}
        >
          {detailModalTitle && <DialogTitle>{detailModalTitle}</DialogTitle>}
          <DialogContent>{detailModalContent}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default StatsBlock;
