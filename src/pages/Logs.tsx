import LogDetailView from "@/components/viewLogs/LogDetailView";
import LogListView from "@/components/viewLogs/LogListView";
import useLogStore from "@/stores/useLogStore";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { ArrowLeft } from "@phosphor-icons/react";

const Logs: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { activeID, logDetail, isLoading, clearActiveID } = useLogStore();

  if (isMobile) {
    return (
      <Box sx={{ height: "100%", overflow: "auto" }}>
        {!activeID ? (
          <LogListView />
        ) : (
          <Stack spacing={2}>
            <Button
              startIcon={<ArrowLeft />}
              onClick={clearActiveID}
              variant="text"
              sx={{ alignSelf: "flex-start" }}
            >
              Back
            </Button>
            <Paper sx={{ p: 2 }}>
              {isLoading.detail ? (
                <Box display="flex" justifyContent="center" p={4}>
                  <CircularProgress />
                </Box>
              ) : logDetail ? (
                <LogDetailView />
              ) : null}
            </Paper>
          </Stack>
        )}
      </Box>
    );
  }

  return (
    <Grid2 container spacing={2} sx={{ height: "100%" }}>
      <Grid2 size={{ xs: 12, md: 6 }} sx={{ height: "100%", overflow: "auto" }}>
        <LogListView />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }} sx={{ height: "100%", overflow: "auto" }}>
        {activeID && (
          <Paper sx={{ p: 2 }}>
            {isLoading.detail ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : logDetail ? (
              <LogDetailView />
            ) : null}
          </Paper>
        )}
      </Grid2>
    </Grid2>
  );
};

export default Logs;
