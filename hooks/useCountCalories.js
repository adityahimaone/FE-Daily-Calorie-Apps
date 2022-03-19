import useSWR from "swr";
import { AxiosCustom } from "utils/api";

export default function UseCountCalories(payload = null) {
  payload = {
    gender: payload?.gender,
    age: parseInt(payload?.age),
    activity_type: payload?.activity,
    personal_data: {
      weight: parseFloat(payload?.weight),
      height: parseFloat(payload?.height),
    },
  };

  const fetcher = (url) =>
    AxiosCustom.post(url, payload).then((res) => res.data);

  const { data, mutate, error } = useSWR(
    `/api/v1/users/count-calories`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  const loading = !data && !error;

  return { data, mutate, loading, error };
}
