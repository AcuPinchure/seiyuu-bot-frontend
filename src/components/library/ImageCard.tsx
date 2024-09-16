import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Heart, Repeat, TwitterLogo } from "@phosphor-icons/react";
import ImageDetailModal from "./ImageDetailModal";
import { useState, Fragment } from "react";
import { BASE_URL } from "@/api/axiosInstance";

export interface TweetProps {
  tweetID: string;
  likes: number;
  retweets: number;
  followers: number;
  tweetTime: string;
}

export interface ImageCardProps {
  fileID: number;
  filePath: string;
  mimeType: string;
  seiyuu: string;
  totalPosts: number;
  maxLikes: number;
  maxRetweets: number;
  weight: number;
  totalWeight: number;
  showPlaceholder?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const {
    filePath,
    mimeType,
    seiyuu,
    totalPosts,
    maxLikes,
    maxRetweets,
    showPlaceholder,
  } = props;

  const [open, setOpen] = useState(false);

  const cardMediaProps = {
    component: mimeType === "video/mp4" ? "video" : "img",
    controls: mimeType === "video/mp4" ? true : undefined,
    src: mimeType === "video/mp4" ? undefined : `${BASE_URL}/file/${filePath}`,
    alt: filePath,
    height: 300,
    sx: { objectFit: "cover" },
  };

  const metaData = [
    { icon: <TwitterLogo />, value: totalPosts },
    { icon: <Heart />, value: maxLikes },
    { icon: <Repeat />, value: maxRetweets },
  ];

  return (
    <Card variant="outlined">
      {showPlaceholder ? (
        <Skeleton variant="rectangular" height={300} animation="wave" />
      ) : (
        <CardMedia {...cardMediaProps}>
          {mimeType === "video/mp4" ? (
            <source src={`${BASE_URL}/file/${filePath}`} type="video/mp4" />
          ) : undefined}
        </CardMedia>
      )}
      <CardActionArea onClick={() => setOpen(!showPlaceholder)}>
        <CardContent>
          {showPlaceholder ? (
            <Skeleton variant="text" width={100} height={20} animation="wave" />
          ) : (
            <Typography variant={"h6"} sx={{ wordBreak: "break-all" }}>
              {filePath.split("/").pop() || "Unknown"}
            </Typography>
          )}
          {showPlaceholder ? (
            <Skeleton variant="text" width={100} height={16} animation="wave" />
          ) : (
            <Typography variant={"body2"} sx={{ opacity: 0.6 }}>
              {seiyuu}
            </Typography>
          )}
          {showPlaceholder ? (
            <Skeleton variant="text" width={100} height={16} animation="wave" />
          ) : (
            <Typography variant={"body2"} sx={{ opacity: 0.6 }}>
              {mimeType}
            </Typography>
          )}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "space-evenly", p: 0 }}>
          {metaData.map((data, index) => (
            <Fragment key={index}>
              {index > 0 && <Divider orientation={"vertical"} flexItem />}
              <Stack direction={"row"} alignItems={"center"} p={1} spacing={1}>
                {data.icon}
                {showPlaceholder ? (
                  <Skeleton
                    variant="text"
                    width={32}
                    height={16}
                    animation="wave"
                  />
                ) : (
                  <Typography variant={"body1"}>{data.value}</Typography>
                )}
              </Stack>
            </Fragment>
          ))}
        </CardActions>
      </CardActionArea>
      {!showPlaceholder && (
        <ImageDetailModal
          open={open}
          onClose={() => setOpen(false)}
          {...props}
        />
      )}
    </Card>
  );
};

export default ImageCard;
