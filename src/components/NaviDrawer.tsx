import {
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  ChartLine,
  Clock,
  FadersHorizontal,
  Gauge,
  Images,
  SignIn,
  SignOut,
} from "@phosphor-icons/react";

interface NaviDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NaviDrawer: React.FC<NaviDrawerProps> = ({ open, setOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isAuth = true;

  const naviItems = [
    {
      icon: <ChartLine weight="bold" size={20} />,
      text: "Statistics",
      loginOnly: false,
    },
    {
      icon: <Gauge weight="bold" size={20} />,
      text: "Service Status",
      loginOnly: false,
    },
    {
      icon: <FadersHorizontal weight="bold" size={20} />,
      text: "Service Config",
      loginOnly: true,
    },
    {
      icon: <Images weight="bold" size={20} />,
      text: "Image Library",
      loginOnly: true,
    },
    {
      icon: <Clock weight="bold" size={20} />,
      text: "Logs",
      loginOnly: true,
    },
    {
      icon: <SignIn weight="bold" size={20} />,
      text: "Login",
      loginOnly: false,
    },
    {
      icon: <SignOut weight="bold" size={20} />,
      text: "Logout",
      loginOnly: true,
    },
  ] as const;

  const drawerContent = (
    <nav aria-label="navigation menu">
      <List
        sx={{
          width: "12rem",
        }}
      >
        <ListItem disableGutters disablePadding>
          <ListItemButton>
            <Stack
              height={32}
              overflow={"hidden"}
              direction={"row"}
              alignItems={"center"}
            >
              {isMobile || open ? (
                <img
                  src="/bot_logo.svg"
                  alt="Lovelive Seiyuu Bot"
                  height={42}
                />
              ) : (
                <img
                  src="/bot_L_logo.svg"
                  alt="Lovelive Seiyuu Bot"
                  height={30}
                />
              )}
            </Stack>
          </ListItemButton>
        </ListItem>
        {naviItems
          .filter((item) => isAuth || !item.loginOnly)
          .map((item) => {
            return (
              <ListItem key={item.text} disableGutters disablePadding>
                <ListItemButton>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems={"center"}
                    height={36}
                  >
                    {item.icon}
                    {(isMobile || open) && (
                      <Typography variant="body1">{item.text}</Typography>
                    )}
                  </Stack>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </nav>
  );

  return isMobile ? (
    <SwipeableDrawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      anchor="left"
      PaperProps={{
        sx: {
          bgcolor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    >
      {drawerContent}
    </SwipeableDrawer>
  ) : (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      border={"1px solid black"}
      height={"100vh"}
      bgcolor={"primary.main"}
      color={"primary.contrastText"}
      sx={{
        transition: "width 0.25s",
        overflowX: "hidden",
        overflowY: "auto",
      }}
      width={open ? "12rem" : "3.5rem"}
    >
      {drawerContent}
    </Box>
  );
};

export default NaviDrawer;
