import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  OutlinedInput,
  Skeleton,
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
import { useEffect, useState } from "react";
import { PencilSimple } from "@phosphor-icons/react";
import { getImageTweet } from "@/api/endPoints/images";
import type { ImageTweetResponse } from "@/api/endPoints/images";
import format from "date-fns/format";
import { BASE_URL } from "@/api/axiosInstance";

interface ImageDetailModalProps {
  open: boolean;
  onClose: () => void;
}

const ImageDetailModal: React.FC<ImageDetailModalProps & ImageCardProps> = ({
  fileID,
  filePath,
  mimeType,
  seiyuu,
  totalPosts,
  maxLikes,
  maxRetweets,
  weight,
  totalWeight,
  open,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [edit, setEdit] = useState(false);
  const [editWeight, setEditWeight] = useState(weight);

  const [tweets, setTweets] = useState<ImageTweetResponse["data"]>([]);
  const [tweetLoading, setTweetLoading] = useState(false);

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

  const fileName = filePath.split("/").pop() || "Unknown";

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

  useEffect(() => {
    if (!open) return;
    setTweetLoading(true);
    getImageTweet(fileID)
      .then((response) => {
        setTweets(response);
      })
      .finally(() => {
        setTweetLoading(false);
      });
  }, [fileID, open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      fullWidth
      disableScrollLock
    >
      <DialogTitle>{fileName}</DialogTitle>
      <DialogContent>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={isTablet ? "column" : "row"} spacing={2}>
            <Box flex={1}>
              {mimeType === "video/mp4" ? (
                <video
                  controls
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <source
                    src={`${BASE_URL}/file/${filePath}`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src={`${BASE_URL}/file/${filePath}`}
                  alt={fileName}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </Box>
            <Stack direction={"column"} spacing={2}>
              <table>
                <tbody>
                  {tableContent.map((row) =>
                    isMobile ? (
                      <tr key={row.title}>
                        <td>
                          <Typography variant="body1" fontWeight={500} mt={1}>
                            {row.title}
                          </Typography>
                          <Typography variant="body1">{row.value}</Typography>
                        </td>
                      </tr>
                    ) : (
                      <tr key={row.title}>
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
                    onChange={(e) =>
                      setEditWeight(parseFloat(e.target.value) || 0)
                    }
                    type="number"
                    inputProps={{ min: 0, max: 100, step: 0.01 }}
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
                  <Button color="primary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PencilSimple />}
                    onClick={handleEdit}
                  >
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
                    {tweetLoading
                      ? [...Array(5)].map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Skeleton
                                variant="text"
                                width={100}
                                height={16}
                                animation="wave"
                              />
                              <Skeleton
                                variant="text"
                                width={80}
                                height={12}
                                animation="wave"
                              />
                            </TableCell>
                            <TableCell>
                              <Skeleton
                                variant="text"
                                width={20}
                                height={16}
                                animation="wave"
                              />
                            </TableCell>
                            <TableCell>
                              <Skeleton
                                variant="text"
                                width={20}
                                height={16}
                                animation="wave"
                              />
                            </TableCell>
                            <TableCell>
                              <Skeleton
                                variant="text"
                                width={30}
                                height={16}
                                animation="wave"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      : tweets.map((tweet) => (
                          <TableRow key={tweet.id}>
                            <TableCell>
                              <Typography
                                variant="body1"
                                component={"a"}
                                href={`https://x.com/_/status/${tweet.id}`}
                                target="_blank"
                                sx={{ textDecoration: "none" }}
                              >
                                {tweet.id}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                {format(
                                  new Date(tweet.post_time),
                                  "yyyy-MM-dd HH:mm:ss"
                                )}
                              </Typography>
                            </TableCell>
                            <TableCell>{tweet.like}</TableCell>
                            <TableCell>{tweet.rt}</TableCell>
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
