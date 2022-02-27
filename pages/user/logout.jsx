import Router from "next/router";
import Cookies from "universal-cookie";
import { clearUser } from "store/userSlice";
import { useDispatch } from "react-redux";

export default function logout() {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const onLogout = () => {
    Router.push("/user/login");
    cookies.remove("token", { path: "/", domain: window.location.hostname });
    dispatch(clearUser());
  };

  return <>{onLogout()}</>;
}
