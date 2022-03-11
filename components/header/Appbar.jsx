import React, { useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

export default function Appbar(props) {
  const { drawerWidth, handleDrawerToggle } = props;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <IconButton
          // color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon className="h-5 w-5" />
        </IconButton>
        <div className="flex w-full">
          <div className="flex-none">
            <h1>Admin</h1>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
