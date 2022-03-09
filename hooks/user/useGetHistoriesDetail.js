import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";

export default function useGetHistoriesDetail(id) {
  const fetcher = (url) =>
    AxiosCustom.get(url, axiosConfig()).then((res) => res.data);
  const { data, mutate, error } = useSWR(
    "/api/v1/histories_detail/all/" + id,
    fetcher
  );
  return { data, mutate, error };
}
