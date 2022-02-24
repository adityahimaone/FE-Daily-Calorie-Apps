import { useState } from "react";
import axios from "axios";

export default function LoginAuthUser() {
  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Accest-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization,Content-Type",
    },
  });

  const [resultLogin, setResultLogin] = useState({
    meta: {
      rc: null,
      message: "",
    },
    data: {
      token: "",
    },
  });

  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const sendDataToServer = (payload) => {
    payload = {
      email: payload.email,
      password: payload.password,
    };

    api
      .post("/api/v1/users/login", payload)
      .then((res) => {
        setResultLogin(res.data);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setResultLogin(err.response.data);
        setProperties({
          loading: false,
          error: true,
        });
      });
  };

  return { resultLogin, sendDataToServer, properties };
}
