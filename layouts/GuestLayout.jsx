import React, { useState } from "react";
import Head from "next/head";
import Nav from "@/components/header/Nav";
import Container from "@/components/Container";
import Footer from "@/components/footer/Footer";
import classNames from "classnames";
import Styles from "@/styles/Home.module.css";

export default function GuestLayout(props) {
  const { children, pageTitle, container, loc } = props;
  const initContainer = typeof container !== "undefined" ? container : true;

  const locValue = loc === "home";
  const cx = classNames("overflow-hidden", {
    "bg-[url('/img/mesh.png')] bg-no-repeat bg-cover": locValue,
    "bg-white": !locValue,
  });

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Daily Calorie Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cx}>
        <Nav location={loc ? loc : "guest"} />
        <div className={cx}>
          {initContainer === true ? (
            <Container>{children}</Container>
          ) : (
            <div>{children}</div>
          )}
        </div>
        {loc === "home" && <Footer />}
      </div>
    </>
  );
}
