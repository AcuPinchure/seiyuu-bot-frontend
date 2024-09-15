import StatusCard from "@/components/status/StatusCard";
import useStatusStore from "@/stores/useStatusStore";
import { Grid2 as Grid } from "@mui/material";
import format from "date-fns/format";
import { useEffect } from "react";

const Status: React.FC = () => {
  const allowEdit = true;

  const { isLoading, status, getStatus } = useStatusStore();

  useEffect(() => {
    getStatus();
  }, [getStatus]);

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
      {isLoading.get
        ? [
            <Grid size={1}>
              <StatusCard
                name={""}
                screenName={""}
                idName={""}
                isActive={false}
                lastPost={""}
                interval={0}
                showPlaceholder
              />
            </Grid>,
            <Grid size={1}>
              <StatusCard
                name={""}
                screenName={""}
                idName={""}
                isActive={false}
                lastPost={""}
                interval={0}
                showPlaceholder
              />
            </Grid>,
            <Grid size={1}>
              <StatusCard
                name={""}
                screenName={""}
                idName={""}
                isActive={false}
                lastPost={""}
                interval={0}
                showPlaceholder
              />
            </Grid>,
            <Grid size={1}>
              <StatusCard
                name={""}
                screenName={""}
                idName={""}
                isActive={false}
                lastPost={""}
                interval={0}
                showPlaceholder
              />
            </Grid>,
          ]
        : status.map((service) => {
            let lastPost = "";
            try {
              lastPost = format(
                new Date(service.last_post),
                "yyyy-MM-dd HH:mm:ss"
              );
            } catch (error) {
              console.error(error);
              lastPost = "No data";
            }
            return (
              <Grid key={service.screen_name} size={1}>
                <StatusCard
                  name={service.name}
                  screenName={service.screen_name}
                  idName={service.id_name}
                  isActive={service.activated}
                  lastPost={lastPost}
                  interval={service.interval}
                  allowEdit={allowEdit}
                />
              </Grid>
            );
          })}
    </Grid>
  );
};

export default Status;
