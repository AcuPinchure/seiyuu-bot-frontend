import {
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
  Box,
  Stack,
  Typography,
  useTheme,
  TypographyProps,
} from "@mui/material";
import {
  CaretRight,
  ChartLine,
  Clock,
  Gauge,
  Images,
  Info,
  SignIn,
  SignOut,
} from "@phosphor-icons/react";
import ThemeModeSwitcher from "./ThemeModeSwitcher";
import { useLocation, useNavigate } from "react-router-dom";
import useAccountStore from "@/stores/useAccountStore";

interface NaviDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

interface NaviItem {
  icon: JSX.Element;
  text: string;
  showInLogout: boolean;
  showInLogin: boolean;
  href: string;
  typographyProps?: TypographyProps;
}

const NaviDrawer: React.FC<NaviDrawerProps> = ({ open, setOpen, isMobile }) => {
  const isAuth = useAccountStore((state) => state.user.id !== 0);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  function handleGoto(href: string) {
    navigate(href);
    if (isMobile) {
      setOpen(false);
    }
  }

  const naviItems: NaviItem[] = [
    {
      icon: <ChartLine weight="bold" size={20} />,
      text: "Statistics",
      showInLogout: true,
      showInLogin: true,
      href: "/stats",
    },
    {
      icon: <Gauge weight="bold" size={20} />,
      text: "Service Status",
      showInLogout: true,
      showInLogin: true,
      href: "/status",
    },
    {
      icon: <Images weight="bold" size={20} />,
      text: "Image Library",
      showInLogout: false,
      showInLogin: true,
      href: "/library",
    },
    {
      icon: <Clock weight="bold" size={20} />,
      text: "Logs",
      showInLogout: false,
      showInLogin: true,
      href: "/logs",
    },
    {
      icon: <SignIn weight="bold" size={20} />,
      text: "Admin Login",
      showInLogout: true,
      showInLogin: false,
      href: "/login",
    },
    {
      icon: <SignOut weight="bold" size={20} />,
      text: "Logout",
      showInLogout: false,
      showInLogin: true,
      href: "/logout",
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
            <Box height={32} position={"relative"}>
              {(isMobile || open) && (
                <img
                  src="/bot_logo.svg"
                  alt="Lovelive Seiyuu Bot"
                  height={32}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    filter: isDark ? undefined : "invert(1)",
                  }}
                />
              )}
              <img
                src="/bot_L_logo.svg"
                alt="Lovelive Seiyuu Bot"
                height={32}
                style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
              />
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters disablePadding>
          <ListItemButton
            href="https://acupinchure.com/seiyuu-bot"
            target="_blank"
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems={"center"}
              height={52}
            >
              <Info weight="bold" size={20} />
              {(isMobile || open) && (
                <Typography variant="body1">Project Info</Typography>
              )}
            </Stack>
          </ListItemButton>
        </ListItem>
        {naviItems
          .filter((item) => (isAuth ? item.showInLogin : item.showInLogout))
          .map((item) => {
            return (
              <ListItem key={item.text} disableGutters disablePadding>
                <ListItemButton
                  onClick={() => handleGoto(item.href)}
                  selected={location.pathname.startsWith(item.href)}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems={"center"}
                    height={52}
                  >
                    {item.icon}
                    {(isMobile || open) && (
                      <Typography variant="body1" {...item.typographyProps}>
                        {item.text}
                      </Typography>
                    )}
                  </Stack>
                </ListItemButton>
              </ListItem>
            );
          })}
        <ThemeModeSwitcher isMobile={isMobile} barOpen={open} />
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
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
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
      bgcolor={"secondary.main"}
      color={"secondary.contrastText"}
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
