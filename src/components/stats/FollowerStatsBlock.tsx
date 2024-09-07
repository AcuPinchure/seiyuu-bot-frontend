import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Users } from "@phosphor-icons/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface FollowerStatsBlockProps {
  data: {
    data_time: string;
    followers: number;
  }[];
}

const FollowerStatsBlock: React.FC<FollowerStatsBlockProps> = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const firstData = data.length > 0 ? data[0] : null;
  const lastestData = data.length > 0 ? data[data.length - 1] : null;

  const avgGrowth =
    firstData && lastestData
      ? (lastestData.followers - firstData.followers) /
        ((new Date(lastestData.data_time).getTime() -
          new Date(firstData.data_time).getTime()) /
          (1000 * 60 * 60 * 24))
      : 0;

  return (
    <Paper elevation={0} variant="outlined" sx={{ flexGrow: 1 }}>
      <Stack direction={"column"} alignItems="stretch" spacing={1} p={2}>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Typography variant="h6">
            <Users />
          </Typography>
          <Typography variant="h6">Followers</Typography>
        </Stack>
        <Typography variant="h3">
          {lastestData?.followers?.toLocaleString("en-US")}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.5 }}>
          {`${avgGrowth.toFixed(2)} new followers per day`}
        </Typography>
        <Box sx={{ filter: isDark ? "invert(0.9)" : undefined }} pt={1}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: "Follower Growth",
              },
              series: [
                {
                  name: "Followers",
                  data: data.map((d) => [
                    new Date(d.data_time).getTime(),
                    d.followers,
                  ]),
                },
              ],
              xAxis: {
                type: "datetime",
              },
              yAxis: {
                title: {
                  text: "Followers",
                },
              },
              legend: {
                enabled: false, // Hides the legend
              },
              chart: {
                scrollablePlotArea: {
                  minWidth: 500,
                },
              },
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default FollowerStatsBlock;
