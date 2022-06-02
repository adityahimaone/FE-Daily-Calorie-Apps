import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";

export default function useGetFoodByID(id) {
  const fetcher = (url) =>
    AxiosCustom.get(url, axiosConfig()).then((res) => res.data);
  const { data, mutate, error } = useSWR("/api/v1/foods/" + id, fetcher);
  return { data, mutate, error };
}
