import { useState } from "react";
import { mainApiAuth } from "@/services/Api";
import { AxiosCustom } from "utils/api";
import { axiosConfig } from "utils/helper";

export default function AddHistories() {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const sendDataToServer = (payload) => {
    payload = {
      title: payload.title,
      img_url: payload.img_url,
      calories: payload.calories,
      carbs: payload.carbs,
      fat: payload.fat,
      protein: payload.protein,
      serving_size: payload.serving_size,
    };

    AxiosCustom.post("/api/v1/histories/automatic", payload, axiosConfig())
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
