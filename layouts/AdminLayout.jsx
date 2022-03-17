import React, { useState } from "react";
import Appbar from "@/components/header/Appbar";
import DesktopDrawer from "@/components/sidebar/DesktopDrawer";
import MobileDrawer from "@/components/sidebar/MobileDrawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { verify } from "jsonwebtoken";
import Cookies from "universal-cookie";
import Router from "next/router";

const secret = process.env.REACT_APP_SECRET;
const drawerWidth = 240;

export default function AdminLayout(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const cookies = new Cookies();
  let getCookies = cookies.get("token");
  if (getCookies) {
    try {
      verify(getCookies, secret);
    } catch (e) {
      cookies.remove("token", { path: "/", domain: window.location.hostname });
      Router.push("/");
    }
  } else {
    Router.push("/");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <MobileDrawer
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        {/* Side Drawer */}
        <DesktopDrawer drawerWidth={drawerWidth} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className=" bg-flashwhite  min-h-full"
      >
        <Toolbar />
        <div>{props.children}</div>
      </Box>
    </Box>
  );
}
