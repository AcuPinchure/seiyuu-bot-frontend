import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { ImageCardProps } from "./ImageCard";
import { useState } from "react";
import { PencilSimple } from "@phosphor-icons/react";

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
  const isMobile = useMediaQuery("(max-width: 500px)");
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
        <Stack direction={"column"} spacing={2}>
          <Stack direction={isTablet ? "column" : "row"}>
            <Box flex={1}>
              <img src={`/file/${fileID}`} alt={fileName} />
            </Box>
            <Stack direction={"column"} spacing={2}>
              <table>
                <tbody>
                  {tableContent.map((row) =>
                    isMobile ? (
                      <tr>
                        <td>
                          <Typography variant="body1" fontWeight={500} mt={1}>
                            {row.title}
                          </Typography>
                          <Typography variant="body1">{row.value}</Typography>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td style={{ width: "8rem" }}>
                          <Typography variant="body1" fontWeight={500} my={0.5}>
                            {row.title}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="body1">{row.value}</Typography>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <Divider flexItem />
              <Stack direction={"column"}>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Typography variant="body1" fontWeight={500}>
                    Weight
                  </Typography>
                  <OutlinedInput
                    value={editWeight.toString()}
                    onChange={(e) => setEditWeight(parseInt(e.target.value))}
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    size="small"
                    sx={{ width: "6rem" }}
                    disabled={!edit}
                  />
                </Stack>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Chance of picked:{" "}
                  {((editWeight / totalWeight) * 100).toFixed(4)}%
                </Typography>
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
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Button startIcon={<PencilSimple />} onClick={handleEdit}>
                    Edit
                  </Button>
                </Stack>
              )}
            </Stack>
          </Stack>
          {tweets.length > 0 && (
            <>
              <Divider flexItem>
                <Typography variant="h6">Related Tweets</Typography>
              </Divider>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Twitter ID</TableCell>
                      <TableCell>Likes</TableCell>
                      <TableCell>Retweets</TableCell>
                      <TableCell>Followers</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tweets.map((tweet) => (
                      <TableRow key={tweet.tweetID}>
                        <TableCell>
                          <Typography
                            variant="body1"
                            component={"a"}
                            href={`https://x.com/_/status/${tweet.tweetID}`}
                            target="_blank"
                            sx={{ textDecoration: "none" }}
                          >
                            {tweet.tweetID}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.6 }}>
                            {tweet.tweetTime}
                          </Typography>
                        </TableCell>
                        <TableCell>{tweet.likes}</TableCell>
                        <TableCell>{tweet.retweets}</TableCell>
                        <TableCell>{tweet.followers}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageDetailModal;
