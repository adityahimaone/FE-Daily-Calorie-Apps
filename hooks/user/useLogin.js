import { useState, useEffect } from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "store/userSlice";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { useRouter } from "next/router";

export default function useLogin(payload = null) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const router = useRouter();

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

  if (data?.meta?.code === 200) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (data?.meta?.code === 200) {
      Router.replace("/user/dashboard");
    }
  }, [data?.meta?.code]);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return { user: data, mutate, loading, loggedOut };
}
