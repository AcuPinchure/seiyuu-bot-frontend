import useLogStore from "@/stores/useLogStore";
import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";

const LogDetailView: React.FC = () => {
  const { logDetail } = useLogStore();

  if (!logDetail) {
    return null;
  }

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
    } catch {
      return dateString;
    }
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <Typography key={index} variant="body2" component="div">
        {line || "\u00A0"}
      </Typography>
    ));
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="body1" fontWeight={500} gutterBottom>
          Log Time
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDateTime(logDetail.log_time)}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body1" fontWeight={500} gutterBottom>
          File Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {logDetail.file_name}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body1" fontWeight={500} gutterBottom>
          Content
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
          }}
        >
          {formatContent(logDetail.content)}
        </Box>
      </Box>
    </Stack>
  );
};

export default LogDetailView;