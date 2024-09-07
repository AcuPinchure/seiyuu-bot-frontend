import DateSelector from "@/components/dateRangePicker/DateSelector";
import FilterWithTrigger from "@/components/FilterWithTrigger";
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
import { Funnel } from "@phosphor-icons/react";

const FilterOptions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <FilterWithTrigger
      triggerButtonProps={{
        startIcon: <Funnel />,
      }}
      triggerButtonContent="Select data"
    >
      <Stack direction={isMobile ? "column" : "row"} spacing={2}>
        <Stack direction={"column"} width={150}>
          <Typography variant="h6">Accounts</Typography>
          <List dense disablePadding>
            {SEIYUUS.map((seiyuu) => (
              <ListItem key={seiyuu.name} disableGutters>
                <ListItemButton>
                  <ListItemText primary={seiyuu.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack direction={"column"} spacing={2} width={200}>
          <Typography variant="h6">Data Range</Typography>
          <DateSelector />
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </Stack>
      </Stack>
    </FilterWithTrigger>
  );
};

export default FilterOptions;
