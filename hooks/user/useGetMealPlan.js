import React from "react";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";

export default function useGetMealPlan(payload) {
  payload = {
    dietaryPreferences: payload?.dietaryPreferences,
    planType: payload?.planType,
    rangeCalories: payload?.rangeCalories,
  };
  const fetcher = (url) =>
    AxiosCustom.post(url, payload, axiosConfig()).then((res) => res.data);

  const { data, mutate, error } = useSWR(
    "/api/v1/open-api/meal-plan",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, mutate, error };
}
