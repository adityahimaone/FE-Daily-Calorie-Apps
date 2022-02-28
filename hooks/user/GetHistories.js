import React, { useState, useEffect } from "react";
import { mainApiAuth } from "@/services/Api";
export default function GetHistories(refresh) {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getHistories = () => {
    mainApiAuth
      .get("/api/v1/histories/list")
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

  useEffect(() => {
    getHistories();
  }, [refresh]);
  return { response, error, isLoading, getHistories };
}
