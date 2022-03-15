import { useEffect } from "react";
import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import { clearUser } from "store/userSlice";
import Cookies from "universal-cookie";
import { verify } from "jsonwebtoken";

const secret = process.env.REACT_APP_SECRET;

export default function middleware(req) {
  const nextRes = NextResponse;
  const { token } = req.cookies;

  if (!token) {
    return nextRes.redirect("/");
  }

  console.log(token, secret);

  if (token) {
    try {
      verify(token, secret);
      return nextRes.next();
    } catch (e) {
      console.log(e);
      return nextRes.redirect("/");
    }
  }

  return nextRes.next();
}
