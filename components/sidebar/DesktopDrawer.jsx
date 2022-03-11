import React from "react";
import Drawer from "@mui/material/Drawer";
import MenuItems from "./MenuItems";

export default function DesktopDrawer(props) {
  const { drawerWidth } = props;
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      <div className="flex items-center justify-center ">
        <h1 className="text-2xl font-bold text-maingreen-100 my-4">
          Daily Calories
        </h1>
      </div>
      {/* List */}
      <MenuItems />
    </Drawer>
  );
}
