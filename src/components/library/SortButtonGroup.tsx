import { ImageQueryOptions } from "@/api/endPoints/images";
import useImageStore from "@/stores/useImageStore";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

const SortButtonGroup: React.FC = () => {
  const { isLoading, queryOptions, setQueryOptions, getImages } =
    useImageStore();

  function handleChange(
    _: React.MouseEvent<HTMLElement>,
    value: ImageQueryOptions["orderBy"]
  ) {
    if (value === null) {
      setQueryOptions({ order: queryOptions.order === "asc" ? "desc" : "asc" });
    } else {
      setQueryOptions({ orderBy: value });
    }
    getImages();
  }

  const oderIcon = queryOptions.order === "asc" ? <ArrowUp /> : <ArrowDown />;

  const oderOptions = [
    {
      value: "date",
      label: "Date",
    },
    {
      value: "likes",
      label: "Likes",
    },
    {
      value: "rts",
      label: "RTs",
    },
    {
      value: "posts",
      label: "Posts",
    },
  ];

  return (
    <Box overflow={"auto"}>
      <ToggleButtonGroup
        value={queryOptions.orderBy}
        onChange={handleChange}
        disabled={isLoading.images}
        size="small"
        exclusive
      >
        {oderOptions.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            sx={{ width: "5rem" }}
          >
            {queryOptions.orderBy === option.value && oderIcon}
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SortButtonGroup;
