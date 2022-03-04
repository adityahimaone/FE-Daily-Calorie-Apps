import React from "react";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";

export default function useGetLastMealPlans() {
  const fetcher = (url) =>
    AxiosCustom.get(url, axiosConfig()).then((res) => res.data);

  const { data, mutate, error } = useSWR("/api/v1/meal-plan", fetcher, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  return { data, mutate, error };
}
