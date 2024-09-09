import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  OutlinedInput,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Check, PencilSimple, TwitterLogo, X } from "@phosphor-icons/react";
import { useState } from "react";

interface StatusCardProps {
  name: string;
  screenName: string;
  isActive: boolean;
  lastPost: string;
  interval: number;
  allowEdit?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({
  name,
  screenName,
  isActive,
  lastPost,
  interval,
  allowEdit,
}) => {
  const [edit, setEdit] = useState(false);

  const [editData, setEditData] = useState({
    isActive: isActive,
    interval: interval,
  });

  function handleEdit() {
    setEdit(true);
  }

  function handleSave() {
    setEdit(false);
  }

  function handleCancel() {
    setEditData({ isActive, interval: interval });
    setEdit(false);
  }

  const cardContent = [
    {
      title: "Service Status",
      value: (
        <>
          <Chip
            label={isActive ? "Online" : "Offline"}
            color={isActive ? "success" : "error"}
            icon={isActive ? <Check /> : <X />}
            size="small"
            sx={{ px: 0.5 }}
          />
          <Collapse in={edit} orientation="horizontal" timeout={200}>
            <Switch
              checked={editData.isActive}
              onChange={(e) =>
                setEditData({ ...editData, isActive: e.target.checked })
              }
            />
          </Collapse>
        </>
      ),
    },
    {
      title: "Last Post",
      value: (
        <Typography variant="body1" fontWeight={500} mr={2}>
          {lastPost}
        </Typography>
      ),
    },
    {
      title: "Interval",
      value: (
        <>
          <Typography variant="body1" fontWeight={500} mr={2}>
            {isActive ? interval + " hours" : "-"}
          </Typography>
          <Collapse in={edit} orientation="horizontal" timeout={200}>
            <OutlinedInput
              value={editData.interval}
              onChange={(e) =>
                setEditData({ ...editData, interval: parseInt(e.target.value) })
              }
              type="number"
              inputProps={{ min: 1, max: 24 }}
              size="small"
              sx={{ width: "6rem" }}
            />
          </Collapse>
        </>
      ),
    },
  ];

  return (
    <Card variant="outlined">
      <CardActionArea
        href={`https://twitter.com/${screenName}`}
        target="_blank"
      >
        <CardHeader
          title={name}
          subheader={"@" + screenName}
          action={
            <Typography variant="h5" m={1}>
              <TwitterLogo />
            </Typography>
          }
        />
      </CardActionArea>
      <CardContent>
        <table>
          <tbody>
            {cardContent.map((row) => (
              <tr key={row.title}>
                <td>
                  <Typography variant="body1" fontWeight={500} mr={2}>
                    {row.title}
                  </Typography>
                </td>
                <td>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    height={"2.5rem"}
                  >
                    {row.value}
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      {allowEdit && (
        <CardActions>
          {edit ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={
                  isActive === editData.isActive &&
                  interval === editData.interval
                }
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button startIcon={<PencilSimple />} onClick={handleEdit}>
              Edit
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default StatusCard;
