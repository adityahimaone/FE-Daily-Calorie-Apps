import React, { useState, useEffect } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import useLogin from '@/hooks/admin/useLogin';
import Router from 'next/router';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const initLogin = {
    username: '',
    password: '',
    showPassword: false
  };

  const [loginForm, setLoginForm] = useState(initLogin);
  const { data, mutate, error } = useLogin(loginForm);

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

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
    mutate(null, true);
    setLoginForm(initLogin);
  };

  useEffect(() => {
    if (data?.meta?.code === 200) {
      router.replace('/admin/dashboard');
    }
  }, [data?.meta?.code]);

  return (
    <GuestLayout pageTitle="Login" container={false}>
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="max-w-screen-md rounded-lg md:p-10 md:shadow-lg">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <div className="my-3">
            <form onSubmit={onClick}>
              <div className="mb-4">
                <TextField
                  fullWidth
                  required
                  label="Username"
                  color="primary"
                  name="username"
                  value={loginForm.username}
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
                  type={loginForm.showPassword ? 'text' : 'password'}
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
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
