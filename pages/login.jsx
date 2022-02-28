import React, { useState, useEffect } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from "next/link";
import LoginAuthUser from "../hooks/user/LoginAuth";
import useFetch from "@/hooks/useFetch";
import { mainApiAuth, mainApiNoAuth } from "@/services/Api";
import GetUserByID from "@/hooks/user/GetUserByID";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useLogin from "@/hooks/user/useLogin";

export default function Login() {
  const { resultLogin, sendDataToServer, properties, decoded } =
    LoginAuthUser();
  // const { user } = useLogin();

  const initLogin = {
    email: "",
    password: "",
    showPassword: false,
  };

  const [loginForm, setLoginForm] = useState(initLogin);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setLoginForm({
      ...loginForm,
      showPassword: !loginForm.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(loginForm);
  };

  return (
    <GuestLayout container={false} className="relative">
      <div className="absolute flex flex-col w-full min-h-screen lg:flex-row">
        <div className="flex-col items-center justify-center flex-1 hidden lg:flex bg-gradient-to-t to-indigo-900 from-mainpurple-100">
          <div className="space-y-4 text-white">
            <h1 className="text-4xl font-semibold">Daily Calories</h1>
            <p className="font-light">Track Your Calories Everyday</p>
            <button className="px-2 py-1 rounded-lg w-fit bg-mainorange-100">
              Start For Free
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="p-5 space-y-3 rounded-lg shadow-xl bg-slate-50/50 lg:shadow-none lg:bg-transparent">
            <h1 className="text-3xl font-medium">Hello again!</h1>
            <p>Welcome Back</p>
            <div className="my-3">
              <form onSubmit={onClick}>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    color="primary"
                    name="email"
                    value={loginForm.email}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    required
                    label="Password"
                    name="password"
                    type={loginForm.showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={onChange}
                    color="primary"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {loginForm.showPassword ? (
                              <EyeOffIcon className="w-5 h-5" />
                            ) : (
                              <EyeIcon className="w-5 h-5" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <button
                    onSubmit={onClick}
                    className="w-full px-2 py-2 text-white rounded-md bg-mainpurple-100 "
                  >
                    <span>Login </span>
                  </button>
                </div>
                <div className="flex my-2 space-x-2">
                  <p className="text-sm">Don't have an account?</p>
                  <a className="text-sm text-mainpurple-100">
                    <Link href="/user/register">Register Here</Link>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
