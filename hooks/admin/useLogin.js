import React from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { useDispatch } from "react-redux";

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

  return <div>useLogin</div>;
}
