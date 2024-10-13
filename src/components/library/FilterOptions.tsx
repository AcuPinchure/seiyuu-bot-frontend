import FilterWithTrigger from "@/components/FilterWithTrigger";
import useImageStore from "@/stores/useImageStore";
import useStatusStore from "@/stores/useStatusStore";
import extractTweetId from "@/uitls/extractTweetID";
import {
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import format from "date-fns/format";
import { useEffect } from "react";

interface InputField {
  label: string;
  value: string;
  type: "text" | "number" | "select" | "date";
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => void;
  options?: {
    label: string;
    value: string;
  }[];
  min?: string;
  max?: string;
}

interface InputGroup {
  tweet: InputField[];
  stats: InputField[];
}

const FilterOptions: React.FC = () => {
  const { queryOptions, setQueryOptions, getImages } = useImageStore();

  const { status, getStatus } = useStatusStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  function handleClear() {
    setQueryOptions({
      seiyuuIDName: "",
      startDate: "",
      endDate: "",
      minLikes: "",
      maxLikes: "",
      minRTs: "",
      maxRTs: "",
      minPosts: "",
      maxPosts: "",
    });
  }

  function handleApply() {
    setQueryOptions({ page: 1 });
    getImages();
  }

  const startDateMax =
    queryOptions.endDate &&
    format(new Date(queryOptions.endDate), "yyyy-MM-dd");
  const endDateMin =
    queryOptions.startDate &&
    format(new Date(queryOptions.startDate), "yyyy-MM-dd");
  function getStringValue(value: string): string {
    return isNaN(parseInt(value)) ? "" : value;
  }

  const inputFields: InputGroup = {
    tweet: [
      {
        label: "Tweet ID",
        value: queryOptions.tweetID,
        type: "text",
        onChange: (e) =>
          setQueryOptions({
            tweetID: e.target.value && extractTweetId(e.target.value),
          }),
      },
    ],
    stats: [
      {
        label: "Seiyuu",
        value: queryOptions.seiyuuIDName,
        onChange: (e) => setQueryOptions({ seiyuuIDName: e.target.value }),
        type: "select",
        options: [
          { label: "-", value: "" },
          ...status.map((seiyuu) => ({
            label: seiyuu.name,
            value: seiyuu.id_name,
          })),
        ],
      },
      {
        label: "Start Date",
        value:
          queryOptions.startDate &&
          format(new Date(queryOptions.startDate), "yyyy-MM-dd"),
        onChange: (e) =>
          setQueryOptions({
            startDate: e.target.value && `${e.target.value}T00:00:00+08:00`,
          }),
        type: "date",
        min: "2020-01-01",
        max: startDateMax,
      },
      {
        label: "End Date",
        value:
          queryOptions.endDate &&
          format(new Date(queryOptions.endDate), "yyyy-MM-dd"),
        onChange: (e) =>
          setQueryOptions({
            endDate: e.target.value && `${e.target.value}T00:00:00+08:00`,
          }),
        type: "date",
        min: endDateMin,
        max: format(new Date(), "yyyy-MM-dd"),
      },
      {
        label: "Min Likes",
        value: queryOptions.minLikes,
        onChange: (e) => setQueryOptions({ minLikes: e.target.value }),
        type: "number",
        min: "0",
        max: getStringValue(queryOptions.maxLikes),
      },
      {
        label: "Max Likes",
        value: queryOptions.maxLikes,
        onChange: (e) => setQueryOptions({ maxLikes: e.target.value }),
        type: "number",
        min: getStringValue(queryOptions.minLikes) || "0",
      },
      {
        label: "Min RTs",
        value: queryOptions.minRTs,
        onChange: (e) => setQueryOptions({ minRTs: e.target.value }),
        type: "number",
        min: "0",
        max: getStringValue(queryOptions.maxRTs),
      },
      {
        label: "Max RTs",
        value: queryOptions.maxRTs,
        onChange: (e) => setQueryOptions({ maxRTs: e.target.value }),
        type: "number",
        min: getStringValue(queryOptions.minRTs) || "0",
      },
      {
        label: "Min Posts",
        value: queryOptions.minPosts,
        onChange: (e) => setQueryOptions({ minPosts: e.target.value }),
        type: "number",
        min: "0",
        max: getStringValue(queryOptions.maxPosts),
      },
      {
        label: "Max Posts",
        value: queryOptions.maxPosts,
        onChange: (e) => setQueryOptions({ maxPosts: e.target.value }),
        type: "number",
        min: getStringValue(queryOptions.minPosts) || "0",
      },
    ],
  };

  const isCleared =
    Object.entries(queryOptions).filter(
      (entry) =>
        !["tweetID", "page", "orderBy", "order", "searchType"].includes(
          entry[0]
        ) && entry[1] !== ""
    ).length === 0;

  return (
    <FilterWithTrigger onApply={handleApply}>
      <Tabs
        value={queryOptions.searchType}
        onChange={(_, newValue) => setQueryOptions({ searchType: newValue })}
        centered
      >
        <Tab label="Tweet" value="tweet" />
        <Tab label="Stats" value="stats" />
      </Tabs>
      <Stack
        direction={"column"}
        height={isMobile ? undefined : "70vh"}
        width={isMobile ? undefined : 250}
        sx={{ overflowY: "auto" }}
        p={2}
        mx={-2}
      >
        <Stack direction={"column"} spacing={2}>
          {queryOptions.searchType === "tweet"
            ? inputFields.tweet.map((field) => (
                <Stack key={field.label} direction={"column"} spacing={1}>
                  <Typography variant="body1">{field.label}</Typography>
                  <OutlinedInput
                    type={field.type}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Stack>
              ))
            : [
                ...inputFields.stats.map((field) => (
                  <Stack key={field.label} direction={"column"} spacing={1}>
                    <Typography variant="body1">{field.label}</Typography>
                    {field.type === "select" ? (
                      <Select value={field.value} onChange={field.onChange}>
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <OutlinedInput
                        type={field.type}
                        value={field.value}
                        onChange={field.onChange}
                        inputProps={{ min: field.min, max: field.max }}
                      />
                    )}
                  </Stack>
                )),
                <Button
                  key="clear"
                  variant="contained"
                  color="secondary"
                  onClick={handleClear}
                  disabled={isCleared}
                >
                  Clear Filter
                </Button>,
              ]}
        </Stack>
      </Stack>
    </FilterWithTrigger>
  );
};

export default FilterOptions;
