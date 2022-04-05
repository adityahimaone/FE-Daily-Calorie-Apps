import React from "react";
import { useState } from "react";
import { mainApiNoAuth, mainApiAuth } from "@/services/Api";

export default function GetFood() {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const sendDataToServer = async (payload) => {
    mainApiAuth
      .get(`/api/v1/open-api/food/?name=` + payload)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { response, error, isLoading, sendDataToServer };
}
