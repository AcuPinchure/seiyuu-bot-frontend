import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import DateSelector from "@/components/dateRangePicker/DateSelector";
import useLogStore from "@/stores/useLogStore";

const LogListView: React.FC = () => {
  const {
    logState,
    activeID,
    isLoading,
    searchLogs,
    setActiveID,
    setSearchParams,
  } = useLogStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await searchLogs();
  }

  function formatDateTime(dateString: string) {
    try {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
    } catch {
      return dateString;
    }
  }

  function renderPreview(preview: string) {
    const parts = preview.split(/(<mark>.*?<\/mark>)/g);
    return parts.map((part, index) => {
      if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
        const text = part.slice(6, -7);
        return (
          <Box
            key={index}
            component="span"
            bgcolor="primary.main"
            sx={{ color: "primary.contrastText", fontWeight: 500 }}
          >
            {text}
          </Box>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Log Type
              </Typography>
              <ToggleButtonGroup
                value={logState.logType}
                exclusive
                onChange={(_, value) =>
                  value && setSearchParams({ logType: value })
                }
                size="small"
                fullWidth
              >
                <ToggleButton value="post">Post</ToggleButton>
                <ToggleButton value="data">Data</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <TextField
              label="Keyword"
              value={logState.keyword || ""}
              onChange={(e) => setSearchParams({ keyword: e.target.value })}
              size="small"
              fullWidth
            />

            <DateSelector
              dateRange={{
                startDate: logState.minDate || "",
                endDate: logState.maxDate || "",
              }}
              setDateRange={({ startDate, endDate }) =>
                setSearchParams({
                  minDate: startDate,
                  maxDate: endDate,
                })
              }
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading.list}
              fullWidth
            >
              Search
            </Button>
          </Stack>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Log Time</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Preview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logState.logList.map((log) => (
              <TableRow
                key={log.id}
                onClick={() => setActiveID(log.id)}
                selected={activeID === log.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <TableCell>{log.type}</TableCell>
                <TableCell>{formatDateTime(log.log_time)}</TableCell>
                <TableCell>{log.file_name}</TableCell>
                <TableCell>{renderPreview(log.preview)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default LogListView;
