import { Outlet } from "react-router-dom";
import NaviDrawer from "@/components/NaviDrawer";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";

const Layout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <NaviDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        isMobile={isMobile}
      />
      <Box
        ml={isMobile ? 0 : drawerOpen ? "12rem" : "3.5rem"}
        sx={{ transition: "margin-left 0.25s ease" }}
        p={0}
      >
        <Container maxWidth="xl">
          <TopBar setNaviOpen={setDrawerOpen} isMobile={isMobile} />
          <Box py={2} px={isMobile ? 0 : 2}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Layout;
