import Router from "next/router";
import Cookies from "universal-cookie";
import { clearUser } from "store/userSlice";
import { useDispatch } from "react-redux";

export default function logout() {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const onLogout = () => {
    Router.push("/login");
    dispatch(clearUser());
    cookies.remove("token", { path: "/", domain: window.location.hostname });
  };

  return <>{onLogout()}</>;
}
