import { useState, useEffect } from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "store/userSlice";
import jwtDecode from "jwt-decode";
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
      // return router.push("/user/dashboard");
    } catch (error) {
      console.log(error);
      // return router.push("/user/login");
    }
  }

  console.log(data, error, "data api");
  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return { data, error, mutate, loading, loggedOut };
}
