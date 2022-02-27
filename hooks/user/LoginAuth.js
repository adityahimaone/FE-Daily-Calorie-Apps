import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "store/userSlice";
import jwtDecode from "jwt-decode";
import useFetch from "@/hooks/useFetch";
import { mainApiAuth, mainApiNoAuth } from "@/services/Api";
import Router from "next/router";
import GetUserByID from "./GetUserByID";
import profile from "@/public/dummy.png";

export default function LoginAuthUser() {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [decoded, setDecoded] = useState({
    id: 0,
    role: "",
    exp: 0,
  });

  const [infoUser, setInfoUser] = useState({
    id: 0,
    name: "",
    email: "",
    avatar_url: profile.src,
    gender: "",
    calories: "",
    height: "",
    weight: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      setUser({
        id: decoded.id,
        role: decoded.role,
        exp: decoded.exp,
        name: infoUser.name,
        email: infoUser.email,
        avatar_url: infoUser.avatar_url,
        gender: infoUser.gender,
        calories: infoUser.calories,
        height: infoUser.height,
        weight: infoUser.weight,
      })
    );
  }, [infoUser]);

  const [response, setResponse] = useState({
    meta: {
      rc: null,
      message: "",
    },
    data: {
      token: "",
    },
  });

  const sendDataToServer = (payload) => {
    payload = {
      email: payload.email,
      password: payload.password,
    };

    mainApiNoAuth
      .post("/api/v1/users/login", payload)
      .then((res) => {
        setResponse(res.data);
        cookies.set("token", res.data.data.token, {
          path: "/",
          domain: window.location.hostname,
        });
        let decoded = jwtDecode(res.data.data.token);
        mainApiAuth.get(`/api/v1/users/${decoded.id}`).then((res) => {
          setInfoUser(res.data.data);
        });
        setDecoded(decoded);
        Router.push("/user/dashboard");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { sendDataToServer, response, error, isLoading };
}
