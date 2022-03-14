import { useEffect } from "react";
import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import { clearUser } from "store/userSlice";
// import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export default function middleware(req) {
  const nextRes = NextResponse;
  const cookies = new Cookies();
  // const dispatch = useDispatch();
  const { token } = req.cookies;

  let decoded = jwtDecode(token);

  if (!token) {
    return nextRes.redirect("/");
  }
  if (token) {
    if (!decoded.role !== "user" && decoded.exp * 1000 < Date.now()) {
      // dispatch(clearUser());
      cookies.remove("token", {
        path: "/",
        domain: window.location.hostname,
      });
      nextRes.redirect("/");
    }
  }
  // useEffect(() => {}, [token]);

  console.log(token, decoded);

  // useEffect(() => {
  //   let decoded = jwtDecode(token);
  //   console.log(decoded);
  //   if (!decoded.role !== "user" && decoded.exp * 1000 < Date.now()) {
  //     // dispatch(clearUser());
  //     cookies.remove("token", { path: "/", domain: window.location.hostname });
  //     nextRes.redirect("/");
  //   }
  // }, [token]);
}
