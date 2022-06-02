import React, { useState } from "react";
import Appbar from "@/components/header/Appbar";
import DesktopDrawer from "@/components/sidebar/DesktopDrawer";
import MobileDrawer from "@/components/sidebar/MobileDrawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { verify } from "jsonwebtoken";
import Cookies from "universal-cookie";
import Router from "next/router";
import { clearAdmin } from "@/store/adminSlice";
import { useDispatch } from "react-redux";
import Head from "next/head";

const secret = process.env.REACT_APP_SECRET;
const drawerWidth = 240;

export default function AdminLayout(props) {
  const { pageTitle } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const cookies = new Cookies();
  const dispatch = useDispatch();

  let getCookies = cookies.get("token");
  if (getCookies) {
    try {
      verify(getCookies, secret);
    } catch (e) {
      dispatch(clearAdmin());
      cookies.remove("token", { path: "/", domain: window.location.hostname });
      Router.push("/");
    }
  } else {
    Router.push("/");
  }

  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle : "Admin"}</title>
        <meta name="description" content="Daily Calorie Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
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
            <main>{props.children}</main>
          </Box>
        </Box>
      </nav>
    </>
  );
}
