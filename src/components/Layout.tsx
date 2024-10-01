import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NaviDrawer from "@/components/NaviDrawer";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import useAccountStore from "@/stores/useAccountStore";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testLogin = useAccountStore((state) => state.testLogin);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/stats");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    testLogin();
  }, [testLogin]);

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
          <Box mt={1} mb={2}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Layout;
