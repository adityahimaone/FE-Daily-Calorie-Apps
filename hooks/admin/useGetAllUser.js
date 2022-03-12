import { AxiosCustom } from "utils/api";
import useSWR from "swr";
import { axiosConfigAdmin } from "utils/helper";

export default function useGetAllUser() {
  const mainAPI = process.env.REACT_APP_API_URL;
  const fetcher = (url) =>
    AxiosCustom.get(url, axiosConfigAdmin()).then((res) => res.data);
  const { data, mutate, error } = useSWR(
    `${mainAPI}/api/v1/admin/users/`,
    fetcher
  );

  const loading = !data && !error;

  return { data, mutate, error, loading };
}
