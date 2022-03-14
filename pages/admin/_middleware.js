import React from "react";
import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

export default function MiddlewareAdmin(req) {
  const nextRes = NextResponse;
  const cookies = new Cookies();
  const { token } = req.cookies;

  if (!token) {
    return nextRes.redirect("/");
  }

  try {
    if (token) {
      const decoded = jwtDecode(token);
      if (!decoded.role !== "admin" && decoded.exp * 1000 < Date.now()) {
        cookies.remove("token", {
          path: "/",
          domain: window.location.hostname,
        });
        nextRes.redirect("/");
      }
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}
