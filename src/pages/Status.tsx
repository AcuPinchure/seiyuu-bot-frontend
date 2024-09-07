import StatusCard from "@/components/status/StatusCard";
import { SERVICES } from "@/uitls/contants";
import { Stack } from "@mui/material";

const Status: React.FC = () => {
  const allowEdit = true;

  return (
    <Stack
      direction={"row"}
      spacing={0}
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {SERVICES.map((service) => (
        <StatusCard
          key={service.screen_name}
          name={service.name}
          screenName={service.screen_name}
          isActive={service.is_active}
          lastPost={service.last_post}
          interval={service.interval}
          allowEdit={allowEdit}
        />
      ))}
    </Stack>
  );
};

export default Status;
