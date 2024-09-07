import FilterOptions from "@/components/stats/FilterOptions";
import FollowerStatsBlock from "@/components/stats/FollowerStatsBlock";
import StatsBlock, {
  type StatsBlockProps,
} from "@/components/stats/StatsBlock";
import LikeDetail from "@/components/stats/statsDetailModal/LikeDetail";
import PostDetail from "@/components/stats/statsDetailModal/PostDetail";
import RetweetDetail from "@/components/stats/statsDetailModal/ReweetDetail";
import {
  FOLLOWERS_STATS,
  LIKE_STATS,
  POST_STATS,
  RETWEET_STATS,
} from "@/uitls/contants";

import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Heart, Repeat, TwitterLogo } from "@phosphor-icons/react";

const Stats: React.FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const stats: StatsBlockProps[] = [
    {
      icon: <TwitterLogo />,
      title: "Posts",
      value: POST_STATS.posts.toLocaleString("en-US"),
      subtitle: `${POST_STATS.actual_interval} posts per hour`,
      detailModalTitle: "Posts",
      detailModalContent: (
        <PostDetail
          startDate={POST_STATS.start_date}
          endDate={POST_STATS.end_date}
          interval={POST_STATS.interval.toLocaleString("en-US")}
          posts={POST_STATS.posts.toLocaleString("en-US")}
          scheduledInterval={POST_STATS.scheduled_interval.toLocaleString(
            "en-US"
          )}
          actualInterval={POST_STATS.actual_interval.toLocaleString("en-US")}
          isActive={POST_STATS.is_active}
        />
      ),
      modalMaxWidth: undefined,
      modalFullWidth: undefined,
    },
    {
      icon: <Heart />,
      title: "Likes",
      value: LIKE_STATS.likes.toLocaleString("en-US"),
      subtitle: `${LIKE_STATS.avg_likes} likes per post`,
      detailModalTitle: "Likes",
      detailModalContent: (
        <LikeDetail
          startDate={LIKE_STATS.start_date}
          endDate={LIKE_STATS.end_date}
          likes={LIKE_STATS.likes.toLocaleString("en-US")}
          avgLikes={LIKE_STATS.avg_likes.toLocaleString("en-US")}
          topTweets={LIKE_STATS.top_tweets}
        />
      ),
      modalMaxWidth: "lg",
      modalFullWidth: true,
    },
    {
      icon: <Repeat />,
      title: "Retweets",
      value: RETWEET_STATS.retweets.toLocaleString("en-US"),
      subtitle: `${RETWEET_STATS.avg_retweets} retweets per post`,
      detailModalTitle: "Retweets",
      detailModalContent: (
        <RetweetDetail
          startDate={RETWEET_STATS.start_date}
          endDate={RETWEET_STATS.end_date}
          retweets={RETWEET_STATS.retweets.toLocaleString("en-US")}
          avgRetweets={RETWEET_STATS.avg_retweets.toLocaleString("en-US")}
          topTweets={RETWEET_STATS.top_tweets}
        />
      ),
      modalMaxWidth: "lg",
      modalFullWidth: undefined,
    },
  ];

  const followers = FOLLOWERS_STATS;

  return (
    <>
      <FilterOptions />
      <Stack
        direction={isTablet ? "column" : "row"}
        spacing={2}
        alignItems={"stretch"}
        width={"calc(100% - var(--mui-spacing) - var(--mui-spacing))"}
      >
        <Stack direction={isTablet && !isMobile ? "row" : "column"} spacing={2}>
          {stats.map((stat) => (
            <StatsBlock
              key={stat.title}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              detailModalTitle={stat.detailModalTitle}
              detailModalContent={stat.detailModalContent}
              modalMaxWidth={stat.modalMaxWidth}
              modalFullWidth={stat.modalFullWidth}
            />
          ))}
        </Stack>
        <FollowerStatsBlock data={followers} />
      </Stack>
    </>
  );
};

export default Stats;
