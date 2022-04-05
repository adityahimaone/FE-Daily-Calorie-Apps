import React, { useEffect, useState } from "react";
import Layout from "@/layouts/UserLayout";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@/components/Button";
import { TextField } from "@mui/material";
import { setCaloriesCount } from "@/store/caloriesSlice";
import useUpdateUser from "@/hooks/admin/useUpdateUser";
import { useRouter } from "next/router";

export default function update() {
  const infoUser = useSelector((state) => state.user);
  const calculation = useSelector((state) => state.calories);
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(calculation.countCalories.calories);

  const initValueForm = {
    name: "",
    email: "",
    password: "",
    gender: "",
    avatar_url: "",
    calories: infoUser.calories,
    height: infoUser.height,
    weight: infoUser.weight,
    age: 0,
    activity: 0,
  };

  const initFormErr = {
    name: "",
    email: "",
    password: "",
    gender: "",
    avatar_url: "",
    height: "",
    weight: "",
    age: "",
    activity: "",
  };

  const activityValue = [
    {
      id: 1,
      name: "Sedentary",
      value: 1.2,
    },
    {
      id: 2,
      name: "Lightly Active",
      value: 1.375,
    },
    {
      id: 3,
      name: "Moderately Active",
      value: 1.55,
    },
    {
      id: 4,
      name: "Very Active",
      value: 1.725,
    },
    {
      id: 5,
      name: "Extra Active",
      value: 1.9,
    },
  ];

  const [form, setForm] = useState(initValueForm);
  const [formErr, setFormErr] = useState(initFormErr);

  const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword = /^[A-Za-z0-9]*$/;
  const regexCalorie = /^[0-9]{1,}$/;
  const regexWeight = /^[0-9]{1,3}$/;
  const regexHeight = /^[0-9]{1,3}$/;
  const regexAge = /^[0-9]{1,3}$/;

  const { data, mutate, error } = useUpdateUser(infoUser.id, form);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "name") {
      if (regexName.test(value)) {
        setFormErr({ ...formErr, [name]: "" });
      } else {
        setFormErr({ ...formErr, [name]: "Name is not valid" });
      }
    }

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

    if (name === "weight") {
      if (regexWeight.test(value)) {
        setFormErr({ ...formErr, weight: "" });
      } else {
        setFormErr({ ...formErr, weight: "Invalid weight" });
      }
    }

    if (name === "height") {
      if (regexHeight.test(value)) {
        setFormErr({ ...formErr, height: "" });
      } else {
        setFormErr({ ...formErr, height: "Invalid height" });
      }
    }

    if (name === "age") {
      if (regexAge.test(value)) {
        setFormErr({ ...formErr, age: "" });
      } else {
        setFormErr({ ...formErr, age: "Invalid age" });
      }
    }

    console.log(form);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      formErr.name === "" &&
      formErr.email === "" &&
      formErr.password === "" &&
      formErr.weight === "" &&
      formErr.height === "" &&
      form.name !== "" &&
      form.email !== "" &&
      form.calorie !== "" &&
      form.weight !== "" &&
      form.height !== ""
    ) {
      mutate(null, false);
      router.reload(window.location.pathname);
    }
  };

  useEffect(() => {
    dispatch(setCaloriesCount(form));
    setForm({
      ...form,
      calories: calculation.countCalories.calories,
    });
  }, [form.activity]);

  console.log(form);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:gap-x-8">
        <div className="w-full h-fit md:w-4/12 flex flex-col space-y-5 bg-white shadow-lg rounded-lg p-6">
          <h1 className=" font-semibold text-2xl text-center">Data Profil</h1>
          <div className="avatar flex justify-center">
            <div className="w-32 rounded-full ring ring-mainorange-100  ring-offset-0">
              <img
                src={infoUser.id !== 0 ? infoUser?.avatar_url : profile.src}
              />
            </div>
          </div>
          <ul className="text-xl space-y-2 ">
            <li className="border-b-2 border-black">{infoUser.name}</li>
            <li className="border-b-2 border-black">{infoUser.email}</li>
            <li className="border-b-2 border-black">{infoUser.gender}</li>
          </ul>
          <div className="flex flex-row bg-slate-200 justify-around rounded-lg py-5">
            <div className="flex flex-col">
              <p className="text-lg text-center font-bold">
                {infoUser.calories} Kcal
              </p>
              <p className="text-center text-slate-500">Calories Need</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg text-center font-bold">
                {infoUser.height} CM
              </p>
              <p className="text-center text-slate-500">Height</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg text-center font-bold">
                {infoUser.weight} KG
              </p>
              <p className="text-center text-slate-500">Weight</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-8/12 bg-white shadow-lg rounded-lg p-6">
          <div className="my-2">
            <h1 className="text-xl font-semibold">Personal Data</h1>
          </div>
          <div>
            <form className="space-y-4 w-full max-w-xl" onSubmit={onSubmit}>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Name</label>
                </div>
                <div className="flex-initial w-full">
                  <TextField
                    {...(formErr.name && { error: true })}
                    fullWidth
                    name="name"
                    onChange={onChange}
                    value={form.name}
                    size="small"
                    placeholder={infoUser.name}
                    helperText={formErr.name !== "" ? formErr.name : null}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Email</label>
                </div>
                <div className="flex-initial w-full">
                  <TextField
                    {...(formErr.email && { error: true })}
                    fullWidth
                    name="email"
                    onChange={onChange}
                    value={form.email}
                    size="small"
                    placeholder={infoUser.email}
                    helperText={formErr.email !== "" ? formErr.email : null}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Password</label>
                </div>
                <div className="flex-initial w-full">
                  <TextField
                    {...(formErr.password && { error: true })}
                    fullWidth
                    name="password"
                    onChange={onChange}
                    value={form.password}
                    type="password"
                    size="small"
                    helperText={
                      formErr.password !== "" ? formErr.password : null
                    }
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Avatar</label>
                </div>
                <div className="flex-initial w-full">
                  <input
                    type="file"
                    name="avatar_url"
                    // onChange={onChangeImage}
                    // value={form.avatar_url}
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Weight</label>
                </div>
                <div className="flex-initial w-full">
                  <TextField
                    {...(formErr.weight && { error: true })}
                    fullWidth
                    name="weight"
                    onChange={onChange}
                    value={form.weight}
                    type="number"
                    size="small"
                    placeholder={infoUser.weight}
                    helperText={formErr.weight !== "" ? formErr.weight : null}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Height</label>
                </div>
                <div className="flex-initial w-full">
                  <TextField
                    {...(formErr.height && { error: true })}
                    fullWidth
                    name="height"
                    onChange={onChange}
                    value={form.height}
                    type="number"
                    size="small"
                    helperText={formErr.height !== "" ? formErr.height : null}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Age</label>
                </div>
                <div className="flex-initial w-full">
                  <TextField
                    {...(formErr.weight && { error: true })}
                    fullWidth
                    name="age"
                    onChange={onChange}
                    value={form.age}
                    type="number"
                    size="small"
                    helperText={formErr.age !== "" ? formErr.age : null}
                  />
                </div>
              </div>
              <div>
                <FormControl className="w-full">
                  <div className="flex items-center w-full">
                    <div className="flex-initial w-5/12">
                      <label>Gender</label>
                    </div>
                    <div className="flex-initial w-full">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        onChange={onChange}
                        value={form.gender}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                </FormControl>
              </div>
              <div className="flex items-center">
                <div className="flex-initial w-5/12">
                  <label>Activity Type</label>
                </div>
                <div className="flex-initial w-full">
                  <FormControl fullWidth>
                    <Select
                      id="activity"
                      name="activity"
                      onChange={onChange}
                      value={form.activity}
                      size="small"
                      defaultValue=""
                    >
                      {activityValue.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                      <MenuItem disabled={true} value={0}>
                        Select Activity
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <Button className="btn-purple w-full" onClick={onSubmit}>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
