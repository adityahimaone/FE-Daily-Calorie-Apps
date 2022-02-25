import React, { useState } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from "next/link";
import LoginAuthUser from "../../hooks/user/LoginAuth";

export default function Login() {
  const { resultLogin, sendDataToServer, properties } = LoginAuthUser();
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

  const saveToCookie = (token) => {
    document.cookie = `token=${token}`;
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
    // setloading(properties.loading);
  };

  console.log(resultLogin?.meta?.rc, "resultLogin");
  console.log(loginForm);

  return (
    <GuestLayout container={false} className="relative">
      <div className="flex flex-col lg:flex-row w-full min-h-screen absolute">
        <div className="flex-1 hidden lg:flex justify-center items-center flex-col bg-gradient-to-t to-indigo-900 from-mainpurple-100">
          <div className="text-white space-y-4">
            <h1 className="text-4xl font-semibold">Daily Calories</h1>
            <p className="font-light">Track Your Calories Everyday</p>
            <button className=" w-fit bg-mainorange-100 rounded-lg px-2 py-1">
              Start For Free
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="space-y-3 p-5 rounded-lg bg-slate-50/50 shadow-xl lg:shadow-none lg:bg-transparent">
            <h1 className="text-3xl font-medium">Hello again!</h1>
            <p>Welcome Back</p>
            <div className="my-3">
              <form onSubmit={onClick}>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    label="Username"
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
                    id="outlined-basic"
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
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
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
                    className="bg-mainpurple-100 text-white w-full px-2 py-2 rounded-md "
                  >
                    <span>Login </span>
                  </button>
                </div>
                <div className="flex space-x-2 my-2">
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
