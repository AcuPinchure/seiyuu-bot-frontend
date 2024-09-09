import StatusCard from "@/components/status/StatusCard";
import { SERVICES } from "@/uitls/contants";
import { Grid2 as Grid } from "@mui/material";

const Status: React.FC = () => {
  const allowEdit = true;

  return (
    <Grid
      container
      spacing={2}
      columns={{
        xs: 1,
        sm: 2,
        lg: 3,
        xl: 4,
      }}
    >
      {SERVICES.map((service) => (
        <Grid key={service.screen_name} size={1}>
          <StatusCard
            name={service.name}
            screenName={service.screen_name}
            isActive={service.is_active}
            lastPost={service.last_post}
            interval={service.interval}
            allowEdit={allowEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Status;
