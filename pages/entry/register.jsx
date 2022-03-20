import React, { useState, useEffect } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import LinearProgress from "@mui/material/LinearProgress";
import { TextField } from "@mui/material";
import Button from "@/components/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setCaloriesCount } from "store/caloriesSlice";
import useFetch from "@/hooks/useFetch";
import { mainApiAuth, mainApiNoAuth } from "@/services/Api";
// import RegisterAPI from "@/hooks/user/Register";
import useRegister from "@/hooks/user/useRegister";
import pattren from "@/styles/pattren.module.css";
import appFirebase from "@/firebase/firebaseConfig.js";
import successImg from "@/public/img/success.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const countCalorie = useSelector((state) => state.calories.countCalories);
  // const { response, error, isLoading, sendDataToServer } = RegisterAPI();
  const [page, setPage] = useState(1);
  const initValueForm = {
    name: "",
    email: "",
    password: "",
    avatar_url:
      "https://icon-library.com/images/free-avatar-icon/free-avatar-icon-11.jpg",
    gender: "",
    age: 0,
    activity: 0,
    weight: 0,
    height: 0,
  };

  const initFormErr = {
    name: "",
    email: "",
    password: "",
    avatar_url: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
  };

  const [form, setForm] = useState(initValueForm);
  const [formErr, setFormErr] = useState(initFormErr);

  const { user, mutate, loading, error } = useRegister(form);

  useEffect(() => {
    if (user?.meta?.code === 200) {
      setPage(4);
      setForm(initValueForm);
    }
  }, [user?.meta?.code]);

  const regexName = /^[a-zA-Z]{2,}$/;
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword = /^[A-Za-z0-9]*$/;
  const regexWeight = /^[0-9]{1,3}$/;
  const regexHeight = /^[0-9]{1,3}$/;
  const regexAge = /^[0-9]{1,3}$/;

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

    setForm({
      ...form,
      [name]: value,
    });
  };

  const goFirstPage = () => {
    setPage(1);
  };

  const goLoginPage = () => {
    router.push("/entry/user");
  };

  const goNextPage = () => {
    if (page === 3) return;
    setPage((page) => page + 1);
  };

  const goPreviousPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  console.log(form);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      form.name !== "" &&
      form.email !== "" &&
      form.password !== "" &&
      form.avatar_url !== "" &&
      form.weight !== "" &&
      form.height !== "" &&
      form.age !== "" &&
      formErr.name === "" &&
      formErr.email === "" &&
      formErr.password === "" &&
      formErr.weight === "" &&
      formErr.height === "" &&
      formErr.age === ""
    ) {
      mutate(form, true);
      setForm(initValueForm);
    }
  };

  const normalise = (value) => ((value - 0) * 100) / (3 - 0);

  return (
    <GuestLayout container={false}>
      <div className="flex flex-col min-h-screen lg:flex-row">
        <div
          className={`flex items-center justify-center w-full text-white lg:w-1/3 bg-gradient-to-t to-indigo-900 from-mainpurple-100 ${pattren["food-pattren"]}`}
        >
          <div>
            <h1 className="text-2xl font-bold ">Register With Us</h1>
            <p>Ready to track your calories?</p>
            <ul className="flex flex-row my-4 space-x-2 text-xs lg:text-base lg:flex-col lg:space-x-0 lg:space-y-2">
              <li
                className={`flex items-center ${
                  page !== 1
                    ? "line-through"
                    : page === 1 && "lg:text-lg text-sm"
                }`}
              >
                <div className="flex items-center justify-center w-4 h-4 p-1 mr-2 font-bold bg-white rounded-full text-mainpurple-100">
                  <p>1</p>
                </div>
                Fill personal info
              </li>
              <li
                className={`flex items-center ${
                  page !== 2 && page !== 1
                    ? "line-through"
                    : page === 2 && "lg:text-lg text-sm"
                }`}
              >
                <div className="flex items-center justify-center w-4 h-4 mr-2 font-bold bg-white rounded-full text-mainpurple-100">
                  <p>2</p>
                </div>
                Fill personal info
              </li>
              <li
                className={`flex items-center ${
                  page === 3 && "lg:text-lg text-sm"
                }`}
              >
                <div className="flex items-center justify-center w-4 h-4 mr-2 font-bold bg-white rounded-full text-mainpurple-100">
                  <p>3</p>
                </div>
                Fill personal info
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-2/3 mt-14">
          <div className="w-full max-w-lg p-5 ">
            <div>
              <div className={`${page === 4 && "hidden"}`}>
                <h1 className="my-5 text-2xl font-bold text-mainpurple-100">
                  Form Register
                </h1>
              </div>
              <div className={`${page === 4 && "hidden"}`}>
                <LinearProgress
                  className={`py-2 rounded-md `}
                  variant="determinate"
                  value={normalise(page)}
                />
              </div>
            </div>
            <div className="my-5">
              {page === 1 && (
                <OnboardingOne
                  valueForm={form}
                  formErr={formErr}
                  setValueForm={setForm}
                  onChange={onChange}
                />
              )}
              {page === 2 && (
                <OnboardingTwo
                  countCalorie={countCalorie}
                  valueForm={form}
                  formErr={formErr}
                  setValueForm={setForm}
                  onChange={onChange}
                />
              )}
              {page === 3 && (
                <OnboardingThree
                  valueForm={form}
                  formErr={formErr}
                  setValueForm={setForm}
                />
              )}
              {page === 4 && <OnboardingFour />}
            </div>
            <div className="flex justify-between">
              {page !== 1 && page !== 4 && (
                <Button className="btn-orange" onClick={goPreviousPage}>
                  Go Back
                </Button>
              )}
              {page !== 3 && page !== 4 && (
                <Button onClick={goNextPage}>Go Next</Button>
              )}
              {page === 3 && (
                <Button type="submit" onClick={onSubmit}>
                  Submit
                </Button>
              )}
              {page === 4 && (
                <>
                  <Button className="btn-orange" onClick={goFirstPage}>
                    Back to Register
                  </Button>
                  <Button onClick={goLoginPage}>Login</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

const OnboardingOne = ({ valueForm, formErr, onChange, update }) => {
  return (
    <div>
      <div className="my-3">
        <h1 className="text-lg">Fill Information Data</h1>
      </div>
      <div className="flex flex-col justify-center w-full max-w-xs space-y-4">
        <div>
          <label>Name</label>
          <TextField
            {...(formErr.name && { error: true })}
            fullWidth
            name="name"
            onChange={onChange}
            value={valueForm.name}
            size="small"
            helperText={formErr.name !== "" ? formErr.name : null}
          />
        </div>
        <div>
          <label>Email</label>
          <TextField
            {...(formErr.email && { error: true })}
            fullWidth
            name="email"
            onChange={onChange}
            value={valueForm.email}
            size="small"
            helperText={formErr.email !== "" ? formErr.email : null}
          />
        </div>
        <div>
          <label>Password</label>
          <TextField
            {...(formErr.password && { error: true })}
            fullWidth
            name="password"
            onChange={onChange}
            value={valueForm.password}
            type="password"
            size="small"
            helperText={formErr.password !== "" ? formErr.password : null}
          />
        </div>
        <div>
          <FormControl>
            <label>Gender</label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              onChange={onChange}
              value={valueForm.gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <button onClick={() => update("user", newData)}></button>
    </div>
  );
};

const OnboardingTwo = ({ valueForm, setValueForm, formErr, onChange }) => {
  const initInput = {
    weight: 0,
    height: 0,
    age: 0,
    jk: "male",
    activity: 0,
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

  return (
    <div>
      <div className="my-3">
        <h1 className="text-lg">Fill Personal Data</h1>
      </div>
      <div className="flex flex-col justify-center w-full max-w-md space-y-4">
        {/* <div className="p-4 text-center text-white rounded-md bg-mainpurple-100">
          <label className="text-xl font-semibold">
            {countCalorie.calories}
          </label>
        </div> */}
        <div>
          <label>Weight</label>
          <TextField
            {...(formErr.weight && { error: true })}
            fullWidth
            name="weight"
            onChange={onChange}
            value={valueForm.weight}
            type="number"
            size="small"
            helperText={formErr.weight !== "" ? formErr.weight : null}
          />
        </div>
        <div>
          <label>Height</label>
          <TextField
            {...(formErr.height && { error: true })}
            fullWidth
            name="height"
            type="number"
            onChange={onChange}
            value={valueForm.height}
            size="small"
            helperText={formErr.height !== "" ? formErr.height : null}
          />
        </div>
        <div>
          <label>Age</label>
          <TextField
            {...(formErr.age && { error: true })}
            fullWidth
            name="age"
            type="number"
            onChange={onChange}
            value={valueForm.age}
            size="small"
            helperText={formErr.age !== "" ? formErr.age : null}
          />
        </div>
        <div>
          <label>Activity Type</label>
          <FormControl fullWidth>
            <Select
              id="demo-simple-select"
              name="activity"
              onChange={onChange}
              value={valueForm.activity}
              size="small"
            >
              {activityValue.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <button onClick={() => update("user", newData)}></button>
    </div>
  );
};

const OnboardingThree = ({ valueForm, setValueForm }) => {
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const storageRef = appFirebase.storage().ref("avatar/");
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then((e) => {
      e.ref.getDownloadURL().then(function (downloadURL) {
        setValueForm({
          ...valueForm,
          avatar_url: downloadURL,
        });
      });
    });
  };

  return (
    <div>
      <div className="my-3">
        <h1 className="text-lg">Uploud avatar</h1>
      </div>
      <div className="flex justify-center my-4">
        <div className="avatar">
          <div className="w-40 rounded-full ring ring-mainorange-100 ring-offset-base-100 ring-offset-2">
            <img src={valueForm.avatar_url} className="avatar" alt="avatar" />
          </div>
        </div>
      </div>
      <div>
        {/* <label>Age</label> */}
        <div className="border rounded-lg border-dashed border-gray-500 relative">
          <input
            type="file"
            name="avatar_url"
            onChange={onChangeImage}
            className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
          />
          <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
            <h4>
              Drop files anywhere to upload
              <br />
              or
            </h4>
            <p className="">Select Files</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OnboardingFour = () => {
  return (
    <div>
      <div className="">
        <div className="w-full my-10">
          <div className="w-56 mx-auto">
            <Image
              src={successImg}
              layout="responsive"
              width={200}
              height={200}
              className=" object-fill w-full relative"
            />
          </div>
          <h1 className="text-2xl text-center font-medium">
            Successful Registration
          </h1>
        </div>
      </div>
    </div>
  );
};
