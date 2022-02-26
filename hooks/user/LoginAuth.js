import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "store/userSlice";
import jwtDecode from "jwt-decode";
import useFetch from "@/hooks/useFetch";
import { mainApiAuth, mainApiNoAuth } from "@/services/Api";
import Router from "next/router";

export default function LoginAuthUser() {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [decoded, setDecoded] = useState({
    id: 0,
    role: "",
    exp: 0,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      setUser({
        id: decoded.id,
        role: decoded.role,
        exp: decoded.exp,
      })
    );
  }, [decoded]);

  const { response: respUser } = useFetch({
    api: mainApiAuth,
    method: "get",
    url: `/api/v1/users/${decoded.id}`,
  });

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
        setDecoded(decoded);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        Router.push("/user/dashboard");
      });
  };

  return { sendDataToServer, response, error, isLoading };
}
