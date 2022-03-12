import useSWR from "swr";
import { AxiosCustom } from "utils/api";
import { axiosConfigAdmin } from "utils/helper";

export default function useUpdateUser(id, payload) {
  payload = {
    name: payload?.name,
    email: payload?.email,
    password: payload?.password,
    avatar_url: payload?.avatar_url,
    gender: payload?.gender,
    personal_data: {
      calorie: parseFloat(payload?.calorie),
      weight: parseFloat(payload?.weight),
      height: parseFloat(payload?.height),
    },
  };

  const fetcher = (url) =>
    AxiosCustom.put(url, payload, axiosConfigAdmin()).then((res) => res.data);

  const { data, mutate, error } = useSWR(`/api/v1/users/edit/` + id, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  return { data, mutate, error };
}
