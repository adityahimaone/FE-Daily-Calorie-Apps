import React, { useState, useEffect } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useSelector } from "react-redux";
import useLogin from "@/hooks/user/useLogin";
import pattren from "@/styles/Pattren.module.css";
import { useRouter } from "next/router";

export default function UserLogin() {
  const router = useRouter();
  const infoUser = useSelector((state) => state.user);

  const initLogin = {
    email: "",
    password: "",
    showPassword: false,
  };

  const initFormErr = {
    email: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(initLogin);
  const [formErr, setFormErr] = useState(initFormErr);

  const { data, mutate, error, loading } = useLogin(loginForm);

  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword = /^[A-Za-z0-9]*$/;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      if (regexEmail.test(value)) {
        setFormErr({ ...formErr, email: "" });
      } else {
        setFormErr({ ...formErr, email: "Invalid email" });
      }
    }

    if (name === "password") {
      if (regexPassword.test(value)) {
        setFormErr({ ...formErr, password: "" });
      } else {
        setFormErr({ ...formErr, password: "Invalid password" });
      }
    }

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
    if (
      loginForm.email !== "" &&
      loginForm.password !== "" &&
      formErr.email === "" &&
      formErr.password === ""
    ) {
      mutate();
    }
  };


  useEffect(() => {
    if (data) {
      if (data?.meta?.code === 200 && infoUser.id !== 0) {
        setLoginForm(initLogin);
        router.push("/user/dashboard");
      }
    }
  }, [data?.meta?.code]);

  return (
    <GuestLayout container={false} pageTitle="Login" className="relative">
      <div className="absolute flex flex-col w-full min-h-screen lg:flex-row">
        <div
          className={`flex-col items-center justify-center flex-1 hidden lg:flex bg-gradient-to-t to-indigo-900 from-mainpurple-100 ${pattren["food-pattren"]}`}
        >
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
                    {...(formErr.email && { error: true })}
                    fullWidth
                    required
                    label="Email"
                    color="primary"
                    name="email"
                    value={loginForm.email}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                    helperText={formErr.email !== "" ? formErr.email : null}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    {...(formErr.password && { error: true })}
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
                    helperText={
                      formErr.password !== "" ? formErr.password : null
                    }
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
                <div className="my-1">
                  <h4 className="text-xs text-red-600">
                    {error ? "Email or password is incorrect" : ""}
                  </h4>
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
                  <p className="text-sm text-mainpurple-100">
                    <Link href="/entry/register">Register Here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
