import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Heart, Repeat, TwitterLogo } from "@phosphor-icons/react";
import ImageDetailModal from "./ImageDetailModal";
import { useState } from "react";

export interface TweetProps {
  tweetID: string;
  likes: number;
  retweets: number;
  followers: number;
  tweetTime: string;
}

export interface ImageCardProps {
  fileID: number;
  fileName: string;
  mimeType: string;
  seiyuu: string;
  totalPosts: number;
  maxLikes: number;
  maxRetweets: number;
  weight: number;
  totalWeight: number;
  tweets: TweetProps[];
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const {
    fileID,
    fileName,
    mimeType,
    seiyuu,
    totalPosts,
    maxLikes,
    maxRetweets,
  } = props;

  const [open, setOpen] = useState(false);

  const cardMediaProps = {
    component: mimeType === "video/mp4" ? "video" : "img",
    controls: mimeType === "video/mp4" ? true : undefined,
    src: mimeType === "video/mp4" ? undefined : `/file/${fileID}`,
    alt: fileName,
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
      <CardMedia {...cardMediaProps}>
        {mimeType === "video/mp4" ? (
          <source src={`/file/${fileName}`} type="video/mp4" />
        ) : undefined}
      </CardMedia>
      <CardActionArea onClick={() => setOpen(true)}>
        <CardContent>
          <Typography variant={"h6"} sx={{ wordBreak: "break-all" }}>
            {fileName}
          </Typography>
          <Typography variant={"body2"} sx={{ opacity: 0.6 }}>
            {seiyuu}
          </Typography>
          <Typography variant={"body2"} sx={{ opacity: 0.6 }}>
            {mimeType}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "space-evenly", p: 0 }}>
          {metaData.map((data, index) => (
            <>
              {index > 0 && <Divider orientation={"vertical"} flexItem />}
              <Stack
                direction={"row"}
                alignItems={"center"}
                p={1}
                spacing={1}
                key={index}
              >
                {data.icon}
                <Typography variant={"body1"}>{data.value}</Typography>
              </Stack>
            </>
          ))}
        </CardActions>
      </CardActionArea>
      <ImageDetailModal open={open} onClose={() => setOpen(false)} {...props} />
    </Card>
  );
};

export default ImageCard;
