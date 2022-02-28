import { NextResponse } from "next/server";

export default function middleware(req) {
  const nextRes = NextResponse;
  const { token } = req.cookies;

  if (!token) {
    return nextRes.redirect("/login");
  }

  return null;
}
