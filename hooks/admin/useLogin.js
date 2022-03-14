import React from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { setAdmin } from "store/adminSlice";
import Cookies from "universal-cookie";

export default function useLogin(payload = null) {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  payload = {
    username: payload?.username,
    password: payload?.password,
  };

  const fetcher = (url) =>
    AxiosCustom.post(url, payload).then((res) => res.data);
  const { data, mutate, error } = useSWR(`/api/v1/admin/login`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  console.log(data?.data?.token, "data token");

  if (data) {
    cookies.set("token", data?.data?.token, {
      path: "/",
      domain: window.location.hostname,
    });
    let decodedJWT = jwtDecode(data?.data?.token);
    dispatch(
      setAdmin({
        id: decodedJWT.id,
        role: decodedJWT.role,
        exp: decodedJWT.exp,
      })
    );
    Router.push("/admin/dashboard");
  }

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return { data, mutate, error };
}
