import { useEffect } from "react";
import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import { clearUser } from "store/userSlice";
import Cookies from "universal-cookie";

export default function middleware(req) {
  const nextRes = NextResponse;
  const cookies = new Cookies();
  const { token } = req.cookies;

  if (!token) {
    return nextRes.redirect("/");
  }

  try {
    if (token) {
      const decoded = jwtDecode(token);
      if (!decoded.role !== "user" && decoded.exp * 1000 < Date.now()) {
        cookies.remove("token", {
          path: "/",
          domain: window.location.hostname,
        });
        nextRes.rewrite(new URL("/", window.location.origin));
      }
    }
  } catch (error) {
    console.log(error);
  }
  // if (token) {
  //   const decoded = jwtDecode(token);
  //   if (!decoded.role !== "user" && decoded.exp * 1000 < Date.now()) {
  //     cookies.remove("token", {
  //       path: "/",
  //       domain: window.location.hostname,
  //     });
  //     nextRes.redirect("/");
  //   }
  // }

  return null;
}
