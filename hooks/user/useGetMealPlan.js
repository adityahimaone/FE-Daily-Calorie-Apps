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
    AxiosCustom.get(url, payload, axiosConfig()).then((res) => res.data);

  const { data, mutate, error } = useSWR("/api/v1/meal-plan/api/", fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });
  return { data, mutate, error };
}
