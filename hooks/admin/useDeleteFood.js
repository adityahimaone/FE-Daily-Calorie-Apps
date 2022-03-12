import { AxiosCustom } from "utils/api";
import { axiosConfigAdmin } from "utils/helper";
import useSWR from "swr";

export default function useDeleteFood(id) {
  const fetcher = (url) =>
    AxiosCustom.delete(url, axiosConfigAdmin()).then((res) => res.data);
  const { data, mutate, error } = useSWR("/api/v1/foods/" + id, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  return { data, mutate, error };
}
