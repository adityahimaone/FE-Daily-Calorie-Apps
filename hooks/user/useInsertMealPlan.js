import React from "react";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";

export default function useInsertMealPlan(payload) {
  payload = {
    dietary_preferences: payload?.dietaryPreferences,
    plan_type: payload?.planType,
    range_calories: payload?.rangeCalories,
    meal_plans: payload?.mealPlan,
  };

  const fetcher = (url) =>
    AxiosCustom.post(url, payload, axiosConfig()).then((res) => res.data);

  const { data, mutate, error } = useSWR("/api/v1/meal-plan", fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });
  return { data, mutate, error };
}
