import ImageCard from "@/components/library/ImageCard";
import { IMAGES } from "@/uitls/contants";
import { Stack } from "@mui/material";

const Library: React.FC = () => {
  return (
    <Stack
      direction={"row"}
      spacing={0}
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {IMAGES.map((imageData) => (
        <ImageCard
          key={imageData.fileID}
          fileID={imageData.fileID}
          fileName={imageData.fileName}
          mimeType={imageData.mimeType}
          seiyuu={imageData.seiyuu}
          totalPosts={imageData.totalPosts}
          maxLikes={imageData.maxLikes}
          maxRetweets={imageData.maxRetweets}
          weight={imageData.weight}
          totalWeight={imageData.totalWeight}
          tweets={imageData.tweets}
        />
      ))}
    </Stack>
  );
};

export default Library;
