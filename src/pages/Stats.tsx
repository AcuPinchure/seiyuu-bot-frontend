import FilterOptions from "@/components/stats/FilterOptions";
import FollowerStatsBlock from "@/components/stats/FollowerStatsBlock";
import StatsBlock, {
  type StatsBlockProps,
} from "@/components/stats/StatsBlock";
import LikeDetail from "@/components/stats/statsDetailModal/LikeDetail";
import PostDetail from "@/components/stats/statsDetailModal/PostDetail";
import RetweetDetail from "@/components/stats/statsDetailModal/ReweetDetail";
import useStatsStore from "@/stores/useStatsStore";
import useStatusStore from "@/stores/useStatusStore";

import {
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Heart, Repeat, TwitterLogo } from "@phosphor-icons/react";

import format from "date-fns/format";
import { useEffect } from "react";

const Stats: React.FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { stats, followers, queryOptions, getStats, getFollowers } =
    useStatsStore();

  const isLoading = {
    stats: useStatsStore((state) => state.isLoading.stats),
    followers: useStatsStore((state) => state.isLoading.followers),
    status: useStatusStore((state) => state.isLoading.get),
  };

  const { getStatus, status } = useStatusStore();

  useEffect(() => {
    getStats();
    getFollowers();
    getStatus();
  }, [queryOptions, getStats, getFollowers, getStatus]);

  const startDate = format(new Date(stats.start_date), "yyyy-MM-dd HH:mm:ss");
  const endDate = format(new Date(stats.end_date), "yyyy-MM-dd HH:mm:ss");

  const tweetFetchStatus = stats.posts > 0;
  const followerFetchStatus = followers.length > 0;

  const displayedSeiyuu = status.find((s) => s.id === queryOptions.seiyuuID);

  const statsData: StatsBlockProps[] = [
    {
      loading: isLoading.stats,
      icon: <TwitterLogo />,
      title: "Posts",
      value: stats.posts.toLocaleString("en-US"),
      subtitle: `${stats.actual_interval.toFixed(2)} posts per hour`,
      detailModalTitle: "Posts",
      detailModalContent: (
        <PostDetail
          startDate={startDate}
          endDate={endDate}
          interval={stats.interval.toLocaleString("en-US")}
          posts={stats.posts.toLocaleString("en-US")}
          scheduledInterval={stats.scheduled_interval.toLocaleString("en-US")}
          actualInterval={Number(
            stats.actual_interval.toFixed(2)
          ).toLocaleString("en-US")}
          isActive={stats.is_active}
        />
      ),
      modalMaxWidth: undefined,
      modalFullWidth: undefined,
      status: tweetFetchStatus,
    },
    {
      loading: isLoading.stats,
      icon: <Heart />,
      title: "Likes",
      value: stats.likes.toLocaleString("en-US"),
      subtitle: `${Number(stats.avg_likes.toFixed(2)).toLocaleString(
        "en-US"
      )} likes per post`,
      detailModalTitle: "Likes",
      detailModalContent: (
        <LikeDetail
          startDate={startDate}
          endDate={endDate}
          likes={stats.likes.toLocaleString("en-US")}
          avgLikes={Number(stats.avg_likes.toFixed(2)).toLocaleString("en-US")}
          topTweets={stats.max_likes}
        />
      ),
      modalMaxWidth: "lg",
      modalFullWidth: true,
      status: tweetFetchStatus,
    },
    {
      loading: isLoading.stats,
      icon: <Repeat />,
      title: "Retweets",
      value: stats.rts.toLocaleString("en-US"),
      subtitle: `${Number(stats.avg_rts.toFixed(2)).toFixed(
        2
      )} retweets per post`,
      detailModalTitle: "Retweets",
      detailModalContent: (
        <RetweetDetail
          startDate={startDate}
          endDate={endDate}
          retweets={stats.rts.toLocaleString("en-US")}
          avgRetweets={Number(stats.avg_rts.toFixed(2)).toLocaleString("en-US")}
          topTweets={stats.max_rts}
        />
      ),
      modalMaxWidth: "lg",
      modalFullWidth: undefined,
      status: tweetFetchStatus,
    },
  ];

  console.log("followers", followers);

  return (
    <>
      <Stack direction={"row"} flexWrap={"wrap"} gap={2} mb={2}>
        {isLoading.status ? (
          <Skeleton variant="text" width={200} height={56} />
        ) : (
          <Typography variant="h5">
            {displayedSeiyuu &&
              `${displayedSeiyuu.name} @${displayedSeiyuu.screen_name}`}
          </Typography>
        )}
      </Stack>
      <Stack
        direction={isTablet ? "column" : "row"}
        spacing={2}
        alignItems={"stretch"}
        width={"calc(100% - var(--mui-spacing) - var(--mui-spacing))"}
      >
        <Stack direction={isTablet && !isMobile ? "row" : "column"} spacing={2}>
          {statsData.map((stat) => (
            <StatsBlock key={stat.title} {...stat} />
          ))}
        </Stack>
        <FollowerStatsBlock
          loading={isLoading.followers}
          data={followers}
          status={followerFetchStatus}
        />
      </Stack>
      <FilterOptions />
    </>
  );
};

export default Stats;
