import Cookies from "universal-cookie";

export function axiosConfig() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

export function axiosConfigAdmin() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}
