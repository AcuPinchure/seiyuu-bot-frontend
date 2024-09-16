import FilterOptions from "@/components/library/FilterOptions";
import ImageCard from "@/components/library/ImageCard";
import useImageStore from "@/stores/useImageStore";
import {
  Alert,
  Divider,
  Grid2 as Grid,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Library: React.FC = () => {
  const { isLoading, images, setQueryOptions, getImages } = useImageStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery("(max-width: 400px)");

  function handleChangePage(_: React.ChangeEvent<unknown>, value: number) {
    setQueryOptions({ page: value });
    getImages();
  }

  return (
    <>
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
        {isLoading.images ? (
          [...Array(12)].map((_, index) => (
            <Grid key={index} size={1}>
              <ImageCard
                fileID={0}
                filePath={"/"}
                mimeType={""}
                seiyuu={""}
                totalPosts={0}
                maxLikes={0}
                maxRetweets={0}
                weight={0}
                totalWeight={0}
                showPlaceholder
              />
            </Grid>
          ))
        ) : images.status ? (
          images.data.map((imageData) => (
            <Grid key={imageData.id} size={1}>
              <ImageCard
                fileID={imageData.id}
                filePath={imageData.file_path}
                mimeType={imageData.file_type}
                seiyuu={`${imageData.seiyuu_name} ${imageData.seiyuu_screen_name}`}
                totalPosts={imageData.posts}
                maxLikes={imageData.likes}
                maxRetweets={imageData.rts}
                weight={imageData.weight}
                totalWeight={imageData.total_weight}
              />
            </Grid>
          ))
        ) : (
          <Grid
            size={{
              xs: 1,
              md: 2,
              lg: 3,
              xl: 4,
            }}
          >
            <Alert severity="info">{images.message}</Alert>
          </Grid>
        )}
        {images.total_pages > 1 && (
          <Grid
            size={{
              xs: 1,
              md: 2,
              lg: 3,
              xl: 4,
            }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={2}
          >
            <Divider flexItem />
            <Pagination
              count={images.total_pages}
              page={images.page}
              onChange={handleChangePage}
              size={isMobile ? (isSmall ? "small" : "medium") : "large"}
              color="primary"
            />
          </Grid>
        )}
      </Grid>
      <FilterOptions />
    </>
  );
};

export default Library;
