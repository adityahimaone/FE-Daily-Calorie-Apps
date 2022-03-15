import React, { useState } from "react";
import Head from "next/head";
import Nav from "@/components/header/Nav";
import Container from "@/components/Container";

export default function GuestLayout(props) {
  const { children, pageTitle, container } = props;
  const initContainer = typeof container !== "undefined" ? container : true;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Daily Calorie Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen">
        <Nav location="guest" />
        <div className="">
          {initContainer === true ? (
            <Container>{children}</Container>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </div>
    </>
  );
}
