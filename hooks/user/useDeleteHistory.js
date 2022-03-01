import React from "react";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";

export default function useDeleteHistory(id) {
  const fetcher = (url) =>
    AxiosCustom.delete(url, axiosConfig()).then((res) => res.data);
  const { data, mutate, error } = useSWR(
    "/api/v1/histories_detail/" + id,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, mutate, error };
}
