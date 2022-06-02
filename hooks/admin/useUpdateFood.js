import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import { axiosConfigAdmin } from "utils/helper";

export default function useUpdateFood(id, payload) {
  payload = {
    title: payload?.title,
    img_url: payload?.img_url,
    calories: parseFloat(payload?.calories),
    carbs: parseFloat(payload?.carbs),
    fat: parseFloat(payload?.fat),
    protein: parseFloat(payload?.protein),
    serving_size: parseFloat(payload?.serving_size),
  };

  const fetcher = (url) =>
    AxiosCustom.put(url, payload, axiosConfigAdmin()).then((res) => res.data);
  const { data, mutate, error } = useSWR(`/api/v1/foods/` + id, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  return { data, mutate, error };
}
