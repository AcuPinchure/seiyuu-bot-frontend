import useAccountStore from "@/stores/useAccountStore";
import {
  Divider,
  Stack,
  Typography,
  Grid2 as Grid,
  Button,
  Box,
} from "@mui/material";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Tweet } from "react-tweet";

interface LikeDetailProps {
  startDate: string;
  endDate: string;
  likes: string; // toLocaleString
  avgLikes: string;
  topTweets: string[];
}

const LikeDetail: React.FC<LikeDetailProps> = ({
  startDate,
  endDate,
  likes,
  avgLikes,
  topTweets,
}) => {
  const user = useAccountStore((state) => state.user);
  const navigate = useNavigate();

  function handleViewInLibrary(tweetId: string) {
    if (!(user.id > 0)) {
      enqueueSnackbar("User not logged in", { variant: "error" });
      return;
    }
    navigate(`/library?tweet_id=${tweetId}`);
  }

  const tableContent = [
    {
      title: "Start Date",
      value: startDate,
    },
    {
      title: "End Date",
      value: endDate,
    },
    {
      title: "Likes",
      value: likes,
    },
    {
      title: "Average Likes",
      value: avgLikes,
    },
  ];

  return (
    <>
      <table>
        <tbody>
          {tableContent.map((row) => (
            <tr>
              <td>
                <Typography variant="body1" fontWeight={500} mr={2} my={0.5}>
                  {row.title}
                </Typography>
              </td>
              <td>
                <Typography variant="body1">{row.value}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider>
        <Typography variant="h6" textAlign={"center"}>
          Top Tweets
        </Typography>
      </Divider>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        mt={2}
        gap={2}
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }}
      >
        {topTweets.map((tweetId, index) => (
          <Grid key={tweetId}>
            <Stack direction={"column"} spacing={0}>
              <Typography variant="h6" textAlign={"center"}>
                #{index + 1}
              </Typography>
              <Box my={-3}>
                <Tweet id={tweetId} />
              </Box>
              {user.id > 0 && (
                <Button
                  onClick={() => handleViewInLibrary(tweetId)}
                  endIcon={<ArrowSquareOut />}
                >
                  View in Library
                </Button>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LikeDetail;
