import ImageCard from "@/components/library/ImageCard";
import { IMAGES } from "@/uitls/contants";
import { Grid2 as Grid } from "@mui/material";

const Library: React.FC = () => {
  return (
    <Grid
      container
      spacing={2}
      columns={{
        xs: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}
    >
      {IMAGES.map((imageData) => (
        <Grid key={imageData.fileID} size={1}>
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
        </Grid>
      ))}
    </Grid>
  );
};

export default Library;
