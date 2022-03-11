import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import menuItems from "@/context/menuAdmin";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MenuItems() {
  const router = useRouter();

  const active = (
    <span
      className="absolute inset-y-0 left-0 w-1 bg-mainpurple-100 rounded-tr-lg rounded-br-lg"
      aria-hidden="true"
    ></span>
  );

  console.log(menuItems, "menuItems");

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem button key={item.text} onClick={() => router.push(item.path)}>
          {router.asPath === item.path ? active : null}
          {item.icon}
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
}
