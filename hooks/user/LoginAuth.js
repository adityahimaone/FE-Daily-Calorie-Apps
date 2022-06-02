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
import axios from "axios";

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
  }, [decoded, infoUser]);

  const [response, setResponse] = useState({
    meta: {
      rc: null,
      message: "",
    },
    data: {
      token: "",
    },
  });

  const sendDataToServer = async (payload) => {
    payload = {
      email: payload.email,
      password: payload.password,
    };

    await mainApiNoAuth
      .post("/api/v1/users/login", payload)
      .then((res) => {
        let token = res.data.data.token;
        cookies.set("token", res.data.data.token, {
          path: "/",
          domain: window.location.hostname,
        });
        setResponse(res.data);
        let decodedJWT = jwtDecode(res.data.data.token);
        saveUser(decodedJWT.id, token);
        setDecoded(decodedJWT);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveUser = async (id, token) => {
    const mainApiURL = "http://localhost:8080";
    const mainApiAuth = axios.create({
      baseURL: mainApiURL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accest-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization,Content-Type",
      },
    });
    await mainApiAuth
      .get(`/api/v1/users/${id}`)
      .then((res) => {
        setInfoUser(res.data.data);
        Router.push("/user/dashboard");
      })
      .catch((err) => {
        setError(err);
      });
  };

  return { sendDataToServer, response, error, isLoading };
}
