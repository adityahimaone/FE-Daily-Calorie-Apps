import React, { useState } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import { TextField } from "@mui/material";
import pattren from "@/styles/pattren.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@/components/Button";
import UseCountCalories from "@/hooks/useCountCalories";

export default function Calculator() {
  const initValueForm = {
    gender: "male",
    weight: 0,
    height: 0,
    age: 0,
    activity: 0,
  };

  const initFormErr = {
    age: "",
    gender: "",
    calorie: "",
    weight: "",
    height: "",
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

  const { data, mutate, error, loading } = UseCountCalories(form);

  const regexWeight = /^[0-9]{1,3}$/;
  const regexHeight = /^[0-9]{2,3}$/;
  const regexAge = /^[0-9]{1,3}$/;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

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
      form.weight !== 0 &&
      form.height !== 0 &&
      form.age !== 0 &&
      formErr.age === "" &&
      formErr.weight === "" &&
      formErr.height === ""
    ) {
      mutate();
    }
  };

  return (
    <GuestLayout container={false} pageTitle="Calculator" className="relative">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <div
          className={`w-full bg-gradient-to-t h-40 md:h-screen to-indigo-900 from-mainpurple-100 ${pattren["food-pattren"]}`}
        ></div>
        <div className="flex flex-col w-full items-center justify-center px-5">
          <div>
            <h1 className="text-xl font-semibold">
              Harrist-Benedict Calculator
            </h1>
          </div>
          <div className=" bg-mainpurple-100 text-center rounded-lg w-full max-w-md text-white py-5 my-4">
            <h2 className="text-xl font-bold">
              {data?.data?.calories ? data?.data?.calories : 0} Kcal
            </h2>
          </div>
          <form className="space-y-4 w-full max-w-md" onSubmit={onSubmit}>
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
                Count
              </Button>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
