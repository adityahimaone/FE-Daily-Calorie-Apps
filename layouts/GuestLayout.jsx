import React, { useState } from "react";
import Head from "next/head";
import Nav from "@/components/header/Nav";
import Container from "@/components/Container";
import Footer from "@/components/footer/Footer";

export default function GuestLayout(props) {
  const { children, pageTitle, container, loc } = props;
  const initContainer = typeof container !== "undefined" ? container : true;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Daily Calorie Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`min-h-screen  ${
          loc == "home" &&
          " bg-gradient-to-br from-transparent to-mainpurple-100/30"
        }`}
      >
        <Nav location={loc ? loc : "guest"} />
        <div className="overflow-hidden">
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
