import useFetch from "@/hooks/useFetch";
import { mainApiAuth } from "@/services/Api";

export default function GetUserByID(id) {
  const { response, error, isLoading } = useFetch({
    api: mainApiAuth,
    method: "get",
    url: `/api/v1/users/${id}`,
  });

  return { response, error, isLoading };
}
