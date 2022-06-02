import React from "react";
import Head from "next/head";
import Nav from "@/components/header/Nav.jsx";
import Container from "@/components/Container";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "jsonwebtoken";
import Cookies from "universal-cookie";
import Router from "next/router";
import { clearUser } from "@/store/userSlice";

const secret = process.env.REACT_APP_SECRET;

export default function UserLayout(props) {
  const { children, pageTitle } = props;
  const cookies = new Cookies();
  const infoUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let getCookies = cookies.get("token");
  if (getCookies) {
    try {
      verify(getCookies, secret);
    } catch (e) {
      dispatch(clearUser());
      cookies.remove("token", { path: "/", domain: window.location.hostname });
      Router.push("/");
    }
  } else {
    Router.push("/");
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Daily Calorie Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {infoUser.id !== 0 ? <Nav location="user" /> : <Nav location="guest" />}
        <div className="min-h-screen">
          <Container>{children}</Container>
        </div>
      </div>
    </>
  );
}
