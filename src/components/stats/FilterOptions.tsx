import DateSelector from "@/components/dateRangePicker/DateSelector";
import FilterWithTrigger from "@/components/FilterWithTrigger";
import useStatsStore from "@/stores/useStatsStore";
import { SEIYUUS } from "@/uitls/contants";
import {
  Button,
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
import { useEffect, useState } from "react";

const FilterOptions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { queryOptions, setQueryOptions } = useStatsStore();

  useEffect(() => {
    setDateRange({
      start_date: format(new Date(queryOptions.startDate), "yyyy-MM-dd"),
      end_date: format(new Date(queryOptions.endDate), "yyyy-MM-dd"),
    });
  }, [queryOptions]);

  function handleApply() {
    setQueryOptions({
      startDate: `${dateRange.start_date}T00:00:00+08:00`,
      endDate: `${dateRange.end_date}T23:59:59+08:00`,
    });
  }

  return (
    <FilterWithTrigger>
      <Stack direction={isMobile ? "column" : "row"} spacing={2}>
        <Stack direction={"column"} width={150}>
          <Typography variant="h6">Accounts</Typography>
          <List dense disablePadding>
            {SEIYUUS.map((seiyuu) => (
              <ListItem key={seiyuu.name} disableGutters>
                <ListItemButton disabled={seiyuu.screen_name === "kaorin__bot"}>
                  <ListItemText primary={seiyuu.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack direction={"column"} spacing={2} width={200}>
          <Typography variant="h6">Data Range</Typography>
          <DateSelector dateRange={dateRange} setDateRange={setDateRange} />
          <Button variant="contained" color="primary" onClick={handleApply}>
            Apply
          </Button>
        </Stack>
      </Stack>
    </FilterWithTrigger>
  );
};

export default FilterOptions;
