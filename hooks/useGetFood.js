import React from "react";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";

export default function useGetFood(name) {
  const fetcher = (url) =>
    AxiosCustom.get(url, axiosConfig()).then((res) => res.data);
  const { data, mutate, error } = useSWR(
    `/api/v1/foods/api/?name=` + name,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(data, "data food");
  return { response: data, mutate, error };
}
