import React from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";

export default function useAddWater(payload) {
  payload = {
    water: parseInt(payload),
  };

  //   console.log(payload, "payload");

  const fetcher = (url) =>
    AxiosCustom.post(url, payload, axiosConfig()).then((res) => res.data);
  const { data, mutate, error } = useSWR(`/api/v1/histories/water`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });
  return { data, mutate, error };
}
