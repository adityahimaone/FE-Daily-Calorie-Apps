import React from "react";
import Drawer from "@mui/material/Drawer";
import MenuItems from "./MenuItems";

export default function MobileDrawer(props) {
  const { mobileOpen, handleDrawerToggle, drawerWidth } = props;
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <MenuItems />
    </Drawer>
  );
}
