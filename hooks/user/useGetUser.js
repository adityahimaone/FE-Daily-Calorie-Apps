import React from "react";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { setUser } from "store/userSlice";
import { useSelector } from "react-redux";

export default function useGetUser(id) {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.user);

  const fetcher = (url) =>
    AxiosCustom.get(url, axiosConfig()).then((res) => res.data);
  const { data, mutate, error } = useSWR("/api/v1/users/" + id, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  if (data) {
    dispatch(
      setUser({
        ...infoUser,
        name: data.data.name,
        email: data.data.email,
        avatar_url: data.data.avatar_url,
        gender: data.data.gender,
        calories: data.data.calories,
        height: data.data.height,
        weight: data.data.weight,
      })
    );
  }

  return { data, mutate, error };
}
