import React from "react";
import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";

export default function useAddHistories(payload) {
  payload = {
    title: payload?.title,
    img_url: payload?.img_url,
    calories: payload?.calories,
    carbs: payload?.carbs,
    fat: payload?.fat,
    protein: payload?.protein,
    serving_size: payload?.serving_size,
  };
  const receivedPayload = async (payload) => {
    return await payload;
  };

  console.log(payload, "payload");

  const fetcher = (url) =>
    AxiosCustom.post(url, payload, axiosConfig()).then((res) => res.data);
  const { data, mutate, error } = useSWR(
    `/api/v1/histories/automatic`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, mutate, error };
}
