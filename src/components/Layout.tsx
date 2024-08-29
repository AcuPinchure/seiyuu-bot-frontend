import { Outlet } from "react-router-dom";
import NaviDrawer from "./NaviDrawer";
import { useState } from "react";

const Layout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        style={{ marginLeft: "30rem" }}
      >
        Drawer
      </button>
      <NaviDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      <Outlet />
    </>
  );
};

export default Layout;
