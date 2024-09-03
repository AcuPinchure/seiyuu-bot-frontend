import {
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  CaretRight,
  ChartLine,
  Clock,
  FadersHorizontal,
  Gauge,
  Images,
  SignIn,
  SignOut,
} from "@phosphor-icons/react";
import ThemeModeSwitcher from "./ThemeModeSwitcher";

interface NaviDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

const NaviDrawer: React.FC<NaviDrawerProps> = ({ open, setOpen, isMobile }) => {
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
          <ListItemButton onClick={isMobile ? undefined : () => setOpen(!open)}>
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
                  height={32}
                />
              ) : (
                <img
                  src="/bot_L_logo.svg"
                  alt="Lovelive Seiyuu Bot"
                  height={32}
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
                    height={52}
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
        <ListItem disableGutters disablePadding>
          <Box ml={"0.3rem"} height={52} py={1}>
            <ThemeModeSwitcher />
          </Box>
        </ListItem>
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
      <CaretRight
        size={20}
        weight="bold"
        style={{
          position: "absolute",
          right: 2,
          top: 20,
          margin: "auto",
          transform: `rotate(${open ? 180 : 0}deg)`,
        }}
      />
      {drawerContent}
    </Box>
  );
};

export default NaviDrawer;
