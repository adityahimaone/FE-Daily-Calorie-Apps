import axios from "axios";
import Cookies from "universal-cookie";
import { Base64 } from "js-base64";

const cookies = new Cookies();

const mainApiURL = "http://localhost:8080";

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

const token = cookies.get("token");
// const hashToken = Base64.encode(token);
console.log(token, "token");
// console.log(hashToken, "hashToken");

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
