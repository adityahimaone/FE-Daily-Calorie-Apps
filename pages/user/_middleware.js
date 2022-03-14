import { useEffect } from "react";
import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import { clearUser } from "store/userSlice";
// import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export default function middleware(req) {
  const nextRes = NextResponse;
  const cookies = new Cookies();
  // const dispatch = useDispatch();
  const { token } = req.cookies;

  if (token) {
    const decoded = jwtDecode(token);
    if (!decoded.role !== "user" && decoded.exp * 1000 < Date.now()) {
      // dispatch(clearUser());
      cookies.remove("token", {
        path: "/",
        domain: window.location.hostname,
      });
      nextRes.redirect("/");
    }
  }

  if (!token) {
    return nextRes.redirect("/");
  }
  return null;
}
