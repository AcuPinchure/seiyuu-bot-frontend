import Stack from "@mui/material/Stack";
import { CalendarDots } from "@phosphor-icons/react";
import { useRef, useState } from "react";

import Typography from "@mui/material/Typography";
import DateOptions from "./DateOptions";
import { useTheme } from "@mui/material";

interface DateSelectorProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  setDateRange: (value: { startDate: string; endDate: string }) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dateRange,
  setDateRange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const theme = useTheme();

  const openOptions = Boolean(anchorEl);

  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Stack
        position={"relative"}
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        p={1}
        sx={{
          border: "1px solid " + theme.palette.secondary.contrastText,
          borderRadius: "8px",
          cursor: "pointer",
        }}
        ref={anchorRef}
        onClick={() => setAnchorEl(anchorRef.current)}
      >
        {dateRange.startDate && dateRange.endDate ? (
          <Typography
            flexGrow={1}
            variant="body1"
            color={theme.palette.secondary.contrastText}
          >
            {dateRange.startDate} - {dateRange.endDate}
          </Typography>
        ) : (
          <Typography flexGrow={1} variant="body1" color={"#9D9CA5"}>
            Filter date range
          </Typography>
        )}
        <CalendarDots />
      </Stack>
      <DateOptions
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={openOptions}
        onSubmit={setDateRange}
      />
    </>
  );
};

export default DateSelector;
