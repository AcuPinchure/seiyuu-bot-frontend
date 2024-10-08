import DateSelector from "@/components/dateRangePicker/DateSelector";
import FilterWithTrigger from "@/components/FilterWithTrigger";
import useStatsStore from "@/stores/useStatsStore";
import useStatusStore from "@/stores/useStatusStore";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import format from "date-fns/format";

const FilterOptions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { queryOptions, setQueryOptions, getStats, getFollowers } =
    useStatsStore();

  const status = useStatusStore((state) => state.status);

  function handleSetOptions(dateRange: { startDate: string; endDate: string }) {
    setQueryOptions({
      startDate: `${dateRange.startDate}T00:00:00+08:00`,
      endDate: `${dateRange.endDate}T23:59:59+08:00`,
    });
  }

  function handleApply() {
    getStats();
    getFollowers();
  }

  const dateRange = {
    startDate: format(new Date(queryOptions.startDate), "yyyy-MM-dd"),
    endDate: format(new Date(queryOptions.endDate), "yyyy-MM-dd"),
  };

  return (
    <FilterWithTrigger onApply={handleApply}>
      <Stack direction={isMobile ? "column" : "row"} spacing={2} mb={1}>
        <Stack direction={"column"}>
          <Typography variant="h6">Accounts</Typography>
          <List dense disablePadding>
            {status.map((seiyuu) => (
              <ListItem key={seiyuu.name} disableGutters>
                <ListItemButton
                  selected={seiyuu.id === queryOptions.seiyuuID}
                  onClick={() => setQueryOptions({ seiyuuID: seiyuu.id })}
                >
                  <ListItemText primary={seiyuu.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack direction={"column"} spacing={2} width={250}>
          <Typography variant="h6">Data Range</Typography>
          <DateSelector dateRange={dateRange} setDateRange={handleSetOptions} />
        </Stack>
      </Stack>
    </FilterWithTrigger>
  );
};

export default FilterOptions;
