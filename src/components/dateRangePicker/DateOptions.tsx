import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import { ArrowClockwise } from "@phosphor-icons/react";
import { useState } from "react";
import {
  DateRangePicker,
  createStaticRanges,
  InputRange,
  RangeKeyDict,
} from "react-date-range";
import { format, addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

const customStaticRanges = createStaticRanges([
  {
    label: "Last 7 days",
    range: () => ({
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
    }),
  },
  {
    label: "Last 30 days",
    range: () => ({
      startDate: addDays(new Date(), -30),
      endDate: new Date(),
    }),
  },
  {
    label: "Last 90 days",
    range: () => ({
      startDate: addDays(new Date(), -90),
      endDate: new Date(),
    }),
  },
  {
    label: "Last 365 days",
    range: () => ({
      startDate: addDays(new Date(), -365),
      endDate: new Date(),
    }),
  },
  {
    label: "All time",
    range: () => ({
      startDate: new Date("2020-01-01"),
      endDate: new Date(),
    }),
  },
]);

const customInputRanges: InputRange[] = [];

interface DateOptionsProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: (value: HTMLElement | null) => void;
  onSubmit: (options: { startDate: string; endDate: string }) => void;
}

const DateOptions: React.FC<DateOptionsProps> = ({
  open,
  anchorEl,
  setAnchorEl,
  onSubmit,
}) => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";

  const selectedRange = {
    startDate: dateRange.startDate
      ? new Date(`${dateRange.startDate}T00:00:00Z`)
      : new Date(),
    endDate: dateRange.endDate
      ? new Date(`${dateRange.endDate}T00:00:00Z`)
      : new Date(),
    key: "selection",
  };

  function handleChangeDate(ranges: RangeKeyDict) {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    if (startDate && endDate) {
      setDateRange({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      });
    }
  }

  function handleReset() {
    setDateRange({ startDate: "", endDate: "" });
  }

  function handleConfirm() {
    onSubmit({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    setAnchorEl(null);
  }

  return (
    <Popover
      id="date-options"
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            top: "12px",
            borderRadius: "0.5rem",
          },
        },
      }}
    >
      <Stack direction={"column"} spacing={0}>
        <Stack
          direction={"row"}
          p={1}
          justifyContent={"right"}
          spacing={1}
          alignItems={"stretch"}
        >
          <style>
            {`
              .rdrDateRangePickerWrapper {
                flex-direction: ${isMobile ? "column" : "row"};
                ${isDark ? "filter: invert(0.85)" : ""};
              }
              .rdrDefinedRangesWrapper {
                width: ${isMobile ? "100%" : "auto"};
              }
                .rdrStaticRangeLabel {
                  color: ${"#020202"};
                }
            `}
          </style>
          <Stack
            direction={"row"}
            alignItems={"center"}
            p={"0.5rem 1rem"}
            flexGrow={1}
            border={"1px solid " + theme.palette.secondary.contrastText}
            borderRadius={"0.5rem"}
          >
            {dateRange.startDate && dateRange.endDate ? (
              <Typography
                variant="body1"
                color={theme.palette.secondary.contrastText}
              >
                {`${dateRange.startDate} - ${dateRange.startDate}`}
              </Typography>
            ) : (
              <Typography variant="body1" color={"#9D9CA5"}>
                Select Date Range
              </Typography>
            )}
          </Stack>
          <Button
            color="primary"
            startIcon={<ArrowClockwise />}
            sx={{ px: "1rem" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Stack>
        <DateRangePicker
          // editableDateInputs={true}
          maxDate={new Date()}
          minDate={new Date("2020-01-01")}
          months={isTablet ? 1 : 2}
          ranges={[{ ...selectedRange }]}
          onChange={handleChangeDate}
          direction={"horizontal"}
          rangeColors={[theme.palette.primary.main]}
          showDateDisplay={false}
          staticRanges={customStaticRanges}
          inputRanges={customInputRanges}
        />
        <Stack direction={"row"} justifyContent={"right"} spacing={1} p={1}>
          <Button
            color="primary"
            onClick={() => setAnchorEl(null)}
            sx={{ px: "2rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: "2rem" }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
};

export default DateOptions;
