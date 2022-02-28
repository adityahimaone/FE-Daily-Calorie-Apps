import React from "react";
import useSWR from "swr";
import { mainApiAuth } from "@/services/Api";

export default function useLogin(payload) {
  const fetcher = (url) =>
    mainApiAuth.post(url, payload).then((res) => res.data);
  const { data, error } = useSWR("/api/v1/users/login", fetcher);

  console.log(data, "data login");

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return { user: data, loading, loggedOut };
}
