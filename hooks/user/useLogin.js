import { useState, useEffect } from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import Cookies from "universal-cookie";
import profile from "@/public/dummy.png";
import { useDispatch } from "react-redux";
import { setUser } from "store/userSlice";
import useGetUser from "./useGetUser";
import jwtDecode from "jwt-decode";
import Router from "next/router";

export default function useLogin(payload = null) {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  payload = {
    email: payload?.email,
    password: payload?.password,
  };

  const fetcher = (url) =>
    AxiosCustom.post(url, payload).then((res) => res.data);
  const { data, mutate, error } = useSWR(`/api/v1/users/login`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  if (data) {
    cookies.set("token", data.data.token, {
      path: "/",
      domain: window.location.hostname,
    });
    let decodedJWT = jwtDecode(data.data.token);
    dispatch(
      setUser({
        id: decodedJWT.id,
        role: decodedJWT.role,
        exp: decodedJWT.exp,
      })
    );
    Router.push("/user/dashboard");
  }

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return { user: data, mutate, loading, loggedOut };
}
