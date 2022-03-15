import React from "react";
import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import { verify } from "jsonwebtoken";

const secret = process.env.REACT_APP_SECRET;

export default function MiddlewareAdmin(req) {
  const nextRes = NextResponse;
  const { token } = req.cookies;

  if (!token) {
    return nextRes.redirect("/");
  }

  if (token !== "undefined") {
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
