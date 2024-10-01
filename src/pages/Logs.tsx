import {
  getBackendLogFilesOrDirs,
  type LogResponse,
} from "@/api/endPoints/logs";
import { GeneralResponse } from "@/api/endPoints/types";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { CaretLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LogData {
  loading: boolean;
  logType: "backend" | "crawler";
  response: GeneralResponse & LogResponse;
}

const Logs: React.FC = () => {
  const [logData, setLogData] = useState<LogData>({
    loading: true,
    logType: "backend",
    response: {
      status: false,
      message: "",
      list_dir: [],
      log: "",
    },
  });

  const location = useLocation();
  const navigate = useNavigate();
  const currLogPath = location.pathname
    .replace("/logs", "")
    .replace(/\/+$/, "");

  useEffect(() => {
    setLogData((prev) => ({ ...prev, loading: true }));
    getBackendLogFilesOrDirs(logData.logType, currLogPath).then((data) => {
      setLogData((prev) => ({ ...prev, response: data, loading: false }));
    });
  }, [logData.logType, currLogPath]);

  function handleGoBack() {
    const path = currLogPath.split("/");
    path.pop();
    navigate(`/logs${path.join("/")}`);
  }

  function goToPath(path: string) {
    navigate(`/logs${currLogPath}/${path}`);
  }

  function handleChangeType(
    _: React.MouseEvent<HTMLElement>,
    value: "backend" | "crawler"
  ) {
    if (!value || value === logData.logType) return;

    setLogData((prev) => ({ ...prev, logType: value }));
    navigate(`/logs`);
  }

  const isDir = logData.response.list_dir.length > 0;

  return (
    <Stack direction={"column"} spacing={2}>
      <ToggleButtonGroup
        value={logData.logType}
        onChange={handleChangeType}
        disabled={logData.loading}
        size="small"
        exclusive
      >
        <ToggleButton value="backend" sx={{ width: "15rem" }}>
          Post Service
        </ToggleButton>
        <ToggleButton value="crawler" sx={{ width: "15rem" }}>
          Data Collect Service
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        variant={"contained"}
        onClick={handleGoBack}
        startIcon={<CaretLeft />}
        sx={{ alignSelf: "flex-start" }}
        disabled={logData.loading || !currLogPath.replace("/", "")}
      >
        Go Back
      </Button>
      <Paper variant="outlined" sx={{ padding: 1 }}>
        {logData.loading ? (
          Array.from({ length: 5 }).map(() => (
            <Skeleton variant="text" height={"2rem"} />
          ))
        ) : isDir ? (
          <List>
            {logData.response.list_dir.sort().map((dir) => (
              <ListItem disableGutters disablePadding>
                <ListItemButton key={dir} onClick={() => goToPath(dir)}>
                  {dir}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            variant="body1"
            whiteSpace={"pre-wrap"}
            minHeight={"1rem"}
          >
            {logData.response.status
              ? logData.response.log || "(No data)"
              : logData.response.message}
          </Typography>
        )}
      </Paper>
    </Stack>
  );
};

export default Logs;
