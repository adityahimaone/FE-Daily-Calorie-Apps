import React, { useState } from "react";
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

export default function Register() {
  const dispatch = useDispatch();
  const countCalorie = useSelector((state) => state.calories.countCalories);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    profile: {},
    personalinfo: {},
    avatar: {},
  });

  const initValueForm = {
    name: "",
    email: "",
    password: "",
    avatar_url: "",
    gender: "",
    personal_data: {
      calorie: 0,
      weight: 0,
      height: 0,
    },
  };

  const [form, setForm] = useState(initValueForm);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const goNextPage = () => {
    if (page === 3) return;
    setPage((page) => page + 1);
  };

  const goPreviousPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  const updateData = (type, newData) => {
    setData((data) => {
      return { ...data, [type]: newData };
    });
  };

  const onChangeAvatar = (e) => {
    setData({
      ...data,
      avatar: e.target.files[0],
    });
  };

  console.log(form);

  const submit = () => {
    fetch("/api/form", { method: "POST", body: JSON.stringify(data) });
  };

  const normalise = (value) => ((value - 0) * 100) / (3 - 0);

  console.log(page);
  return (
    <GuestLayout container={false}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-1/3 w-full bg-gradient-to-t to-indigo-900 from-mainpurple-100 text-white flex justify-center items-center">
          <div>
            <h1 className="text-2xl font-bold">Register With Us</h1>
            <p>Ready to track your calories?</p>
            <ul className="flex flex-row text-xs lg:text-base lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 my-4">
              <li
                className={`flex items-center ${
                  page !== 1
                    ? "line-through"
                    : page === 1 && "lg:text-lg text-sm"
                }`}
              >
                <div className="rounded-full bg-white p-1 font-bold w-4 h-4 mr-2 text-mainpurple-100 flex justify-center items-center">
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
                <div className="rounded-full bg-white font-bold w-4 h-4 mr-2 text-mainpurple-100 flex justify-center items-center">
                  <p>2</p>
                </div>
                Fill personal info
              </li>
              <li
                className={`flex items-center ${
                  page === 3 && "lg:text-lg text-sm"
                }`}
              >
                <div className="rounded-full bg-white font-bold w-4 h-4 mr-2 text-mainpurple-100 flex justify-center items-center">
                  <p>3</p>
                </div>
                Fill personal info
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:w-2/3 w-full mt-14 flex justify-center items-center">
          <div className=" max-w-lg w-full  p-5">
            <div>
              <h1 className=" text-2xl text-mainpurple-100 font-bold my-5">
                Form Register
              </h1>
              <LinearProgress
                className="py-2 rounded-md"
                variant="determinate"
                value={normalise(page)}
              />
            </div>
            <div className="my-5">
              {page === 1 && (
                <OnboardingOne
                  valueForm={form}
                  setValueForm={setForm}
                  update={updateData}
                />
              )}
              {page === 2 && (
                <OnboardingTwo
                  valueForm={form}
                  setValueForm={setForm}
                  update={updateData}
                />
              )}
              {page === 3 && (
                <OnboardingThree
                  valueForm={form}
                  setValueForm={setForm}
                  onChangeAvatar={onChangeAvatar}
                  update={updateData}
                />
              )}
            </div>
            <div className="flex justify-between">
              {page !== 1 && (
                <Button className="btn-orange" onClick={goPreviousPage}>
                  Go Back
                </Button>
              )}
              {page !== 3 && <Button onClick={goNextPage}>Go Next</Button>}
              {page === 3 && (
                <Button type="submit" onClick={submit}>
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

function OnboardingOne({ data, valueForm, setValueForm, update }) {
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValueForm({
      ...valueForm,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="my-3">
        <h1 className="text-lg">Fill Information Data</h1>
      </div>
      <div className="max-w-xs w-full flex flex-col justify-center space-y-4">
        <div>
          <label>Name</label>
          <TextField fullWidth name="name" onChange={onChange} size="small" />
        </div>
        <div>
          <label>Email</label>
          <TextField fullWidth name="email" onChange={onChange} size="small" />
        </div>
        <div>
          <label>Password</label>
          <TextField
            fullWidth
            name="password"
            onChange={onChange}
            type="password"
            size="small"
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
}

function OnboardingTwo({ data, valueForm, setValueForm, update }) {
  const initInput = {
    weight: 0,
    height: 0,
    age: 0,
    jk: "male",
    activity: 0,
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValueForm({
      ...valueForm,
      personal_data: {
        ...valueForm.personal_data,
        [name]: value,
      },
    });
  };

  return (
    <div>
      <div className="my-3">
        <h1 className="text-lg">Fill Personal Data</h1>
      </div>
      <div className="max-w-xs w-full flex flex-col justify-center space-y-4">
        <div>
          <label>Weight</label>
          <TextField fullWidth name="weight" onChange={onChange} size="small" />
        </div>
        <div>
          <label>Height</label>
          <TextField fullWidth name="height" onChange={onChange} size="small" />
        </div>
        <div>
          <label>Age</label>
          <TextField fullWidth name="age" size="small" />
        </div>
        <div>
          <label>Activity Type</label>
          <FormControl fullWidth>
            <Select
              // labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="activityType"
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <button onClick={() => update("user", newData)}></button>
    </div>
  );
}

function OnboardingThree({
  data,
  valueForm,
  setValueForm,
  onChangeAvatar,
  update,
}) {
  console.log(data, onChangeAvatar);
  return (
    <div>
      <div className="my-3">
        <h1 className="text-lg">Uploud avatar</h1>
      </div>
      <div>
        <img src={valueForm.avatar_url} width={40} height={40} alt="avatar" />
      </div>
      <div>
        {/* <label>Age</label> */}
        <div class="border rounded-lg border-dashed border-gray-500 relative">
          <input
            type="file"
            onChange={onChangeAvatar}
            class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
          />
          <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
            <h4>
              Drop files anywhere to upload
              <br />
              or
            </h4>
            <p class="">Select Files</p>
          </div>
        </div>
      </div>
    </div>
  );
}
