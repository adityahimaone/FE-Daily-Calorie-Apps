import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const mainApiURL = "http://localhost:8080";
const token = cookies.get("token");

export const mainApiNoAuth = axios.create({
  baseURL: mainApiURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accest-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "append,delete,entries,foreach,get,has,keys,set,values,Authorization,Content-Type",
  },
});

export const mainApiAuth = axios.create({
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

export const apiHeader = axios.create({
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
