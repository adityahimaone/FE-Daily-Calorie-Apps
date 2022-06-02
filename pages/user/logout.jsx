import Router from "next/router";
import Cookies from "universal-cookie";
import { clearUser } from "store/userSlice";
import { useDispatch } from "react-redux";
import useLogin from "@/hooks/user/useLogin";

export default function logout() {
  const { mutate } = useLogin();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearUser());
    mutate(null);
    cookies.remove("token", { path: "/", domain: window.location.hostname });
    Router.push("/entry/user");
  };

  return <>{onLogout()}</>;
}
