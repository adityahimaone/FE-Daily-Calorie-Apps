import { useState } from "react";
import { mainApiNoAuth } from "@/services/Api";
import Router from "next/router";

export default function Register() {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const sendDataToServer = (payload) => {
    payload = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      avatar_url: payload.avatar_url,
      gender: payload.gender,
      personal_data: {
        calorie: parseFloat(payload.calorie),
        weight: parseInt(payload.weight),
        height: parseInt(payload.height),
      },
    };

    mainApiNoAuth
      .post("/api/v1/users/register", payload)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        // Router.push("/user/dashboard");
      });
  };
  return { response, error, isLoading, sendDataToServer };
}
