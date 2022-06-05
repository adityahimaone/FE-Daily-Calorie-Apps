import React, { useState, useEffect } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useLogin from '@/hooks/user/useLogin';
import pattren from '@/styles/Pattren.module.css';
import { useRouter } from 'next/router';

export default function UserLogin() {
  const router = useRouter();
  const infoUser = useSelector(state => state.user);

  const initLogin = {
    email: '',
    password: '',
    showPassword: false
  };

  const initFormErr = {
    email: '',
    password: ''
  };

  const [loginForm, setLoginForm] = useState(initLogin);
  const [formErr, setFormErr] = useState(initFormErr);

  const { data, mutate, error, loading } = useLogin(loginForm);

  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword = /^[A-Za-z0-9]*$/;

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email') {
      if (regexEmail.test(value)) {
        setFormErr({ ...formErr, email: '' });
      } else {
        setFormErr({ ...formErr, email: 'Invalid email' });
      }
    }

    if (name === 'password') {
      if (regexPassword.test(value)) {
        setFormErr({ ...formErr, password: '' });
      } else {
        setFormErr({ ...formErr, password: 'Invalid password' });
      }
    }

    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const handleClickShowPassword = () => {
    setLoginForm({
      ...loginForm,
      showPassword: !loginForm.showPassword
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onClick = e => {
    e.preventDefault();
    if (
      loginForm.email !== '' &&
      loginForm.password !== '' &&
      formErr.email === '' &&
      formErr.password === ''
    ) {
      mutate();
    }
  };

  useEffect(() => {
    if (data) {
      if (data?.meta?.code === 200 && infoUser.id !== 0) {
        setLoginForm(initLogin);
        router.push('/user/dashboard');
      }
    }
  }, [data?.meta?.code]);

  return (
    <GuestLayout container={false} pageTitle="Login" className="relative">
      <div className="absolute flex min-h-screen w-full flex-col lg:flex-row">
        <div
          className={`hidden flex-1 flex-col items-center justify-center bg-gradient-to-t from-mainpurple-100 to-indigo-900 lg:flex ${pattren['food-pattren']}`}
        >
          <div className="space-y-4 text-white">
            <h1 className="text-4xl font-semibold">Daily Calories</h1>
            <p className="font-light">Track Your Calories Everyday</p>
            <button className="w-fit rounded-lg bg-mainorange-100 px-2 py-1">
              Start For Free
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="space-y-3 rounded-lg bg-slate-50/50 p-5 shadow-xl lg:bg-transparent lg:shadow-none">
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
                    helperText={formErr.email !== '' ? formErr.email : null}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    {...(formErr.password && { error: true })}
                    fullWidth
                    required
                    label="Password"
                    name="password"
                    type={loginForm.showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={onChange}
                    color="primary"
                    variant="outlined"
                    size="small"
                    helperText={
                      formErr.password !== '' ? formErr.password : null
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
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className="my-1">
                  <h4 className="text-xs text-red-600">
                    {error ? 'Email or password is incorrect' : ''}
                  </h4>
                </div>
                <div>
                  <button
                    onSubmit={onClick}
                    className="w-full rounded-md bg-mainpurple-100 px-2 py-2 text-white "
                  >
                    <span>Login </span>
                  </button>
                </div>
                <div className="my-2 flex space-x-2">
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
