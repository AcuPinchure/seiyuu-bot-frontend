import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { ImageCardProps } from "./ImageCard";
import { title } from "process";
import { useState } from "react";

interface ImageDetailModalProps {
  open: boolean;
  onClose: () => void;
}

const ImageDetailModal: React.FC<ImageDetailModalProps & ImageCardProps> = ({
  fileID,
  fileName,
  mimeType,
  seiyuu,
  totalPosts,
  maxLikes,
  maxRetweets,
  weight,
  totalWeight,
  tweets,
  open,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [edit, setEdit] = useState(false);
  const [editWeight, setEditWeight] = useState(weight);

  function handleEdit() {
    setEdit(true);
  }

  function handleSave() {
    setEdit(false);
  }

  function handleCancel() {
    setEditWeight(weight);
    setEdit(false);
  }

  const tableContent = [
    {
      title: "ID",
      value: fileID,
    },
    {
      title: "File Name",
      value: fileName,
    },
    {
      title: "File Type",
      value: mimeType,
    },
    {
      title: "Seiyuu",
      value: seiyuu,
    },
    {
      title: "Total Posts",
      value: totalPosts,
    },
    {
      title: "Max Likes",
      value: maxLikes,
    },
    {
      title: "Max Retweets",
      value: maxRetweets,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{fileName}</DialogTitle>
      <DialogContent>
        <Stack direction={isMobile ? "column" : "row"}>
          <img src={`/file/${fileID}`} alt={fileName} />
          <Stack direction={"column"}>
            <table>
              <thead>
                {tableContent.map((row) => (
                  <tr>
                    <td>
                      <Typography variant="body1" fontWeight={500}>
                        {row.title}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="body1">{row.value}</Typography>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Typography variant="body1" fontWeight={500}>
                Weight
              </Typography>
              <Typography variant="body1">{weight}</Typography>
              <Collapse in={edit} orientation="horizontal" timeout={200}>
                <Stack direction={"column"} alignItems={"flex-start"}>
                  <OutlinedInput
                    value={editWeight.toString()}
                    onChange={(e) => setEditWeight(parseInt(e.target.value))}
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    size="small"
                    sx={{ width: "6rem" }}
                  />
                  <Typography variant="body2" sx={{ opacity: 0.6 }}>
                    Chance of picked:{" "}
                    {((editWeight / totalWeight) * 100).toFixed(4)}%
                  </Typography>
                </Stack>
              </Collapse>
            </Stack>

            {edit ? (
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={editWeight === weight}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDetailModal;
