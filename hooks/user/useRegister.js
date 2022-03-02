import React from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";

export default function useRegister(payload) {
  payload = {
    name: payload?.name,
    email: payload?.email,
    password: payload?.password,
    avatar_url: payload?.avatar_url,
    gender: payload?.gender,
    personal_data: {
      calorie: parseFloat(payload?.personal_data.calorie),
      weight: parseFloat(payload?.personal_data.weight),
      height: parseFloat(payload?.personal_data.height),
    },
  };

  const fetcher = (url) =>
    AxiosCustom.post(url, payload).then((res) => res.data);

  const { data, mutate, error } = useSWR(`/api/v1/users/register`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  const loading = !data && !error;

  return { user: data, mutate, loading, error };
}
