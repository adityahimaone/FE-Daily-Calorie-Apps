import React, { useEffect } from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { setAdmin } from "store/adminSlice";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

export default function useLogin(payload = null) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const router = useRouter();

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

  if (data?.meta?.code === 200) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // useEffect(() => {
  //   if (data?.meta?.code === 200) {
  //     router.replace("/admin/dashboard");
  //   }
  // }, [data?.meta?.code]);

  const loading = !data && !error;

  return { data, mutate, error, loading };
}
