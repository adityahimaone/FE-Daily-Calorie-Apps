import React, { useState } from "react";
import Link from "next/link";
import {
  MenuIcon,
  ChevronDownIcon,
  LogoutIcon,
  CogIcon,
} from "@heroicons/react/outline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

export default function Appbar(props) {
  const { drawerWidth, handleDrawerToggle } = props;

  const [dropdown, setDropdown] = useState(false);

  const dropdownMenu = [
    {
      title: "Dashboard",
      link: "/user/dashboard",
      icon: <CogIcon className="w-4 h-4" />,
    },
    {
      title: "Logout",
      link: "/user/logout",
      icon: <LogoutIcon className="w-4 h-4" />,
    },
  ];

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
          <div className="grow py-2 invisible sm:visible"></div>
          <div className="flex-none">
            <button type="button" onClick={() => setDropdown(!dropdown)}>
              <div className="text-black font-semibold flex items-center">
                <h1>Hi, Admin</h1>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              {dropdown && (
                <ul
                  className={`absolute w-[150px] right-5 top-16 bg-mainpurple-100  rounded shadow-2xl z-auto  text-white transition-all`}
                >
                  {dropdownMenu.map((item, index) => (
                    <li
                      key={index}
                      className="font-regular py-3 hover:bg-mainorange-100 hover:rounded"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
