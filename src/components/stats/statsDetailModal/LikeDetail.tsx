import { Divider, Stack, Typography } from "@mui/material";
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
      <Stack
        direction={"row"}
        mt={2}
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
      >
        {topTweets.map((tweetId, index) => (
          <Stack
            key={tweetId}
            maxWidth={350}
            mx={0.5}
            spacing={0}
            direction={"column"}
          >
            <Typography variant="h6" textAlign={"center"}>
              #{index + 1}
            </Typography>
            <Tweet id={tweetId} />
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default LikeDetail;
