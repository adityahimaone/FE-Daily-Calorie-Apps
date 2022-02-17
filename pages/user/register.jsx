import React, { useState } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import LinearProgress from "@mui/material/LinearProgress";
import { TextField } from "@mui/material";
import Button from "@/components/Button";

export default function Register() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user: {},
    profile: {},
    settings: {},
  });

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
                <div className="rounded-full bg-white font-bold w-4 h-4 mr-2 text-mainpurple-100 flex justify-center items-center">
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
              <LinearProgress variant="determinate" value={normalise(page)} />
            </div>
            <div className="my-5">
              {page === 1 && (
                <OnboardingOne data={data.user} update={updateData} />
              )}
              {page === 2 && (
                <OnboardingTwo data={data.profile} update={updateData} />
              )}
              {page === 3 && (
                <OnboardingThree data={data.settings} update={updateData} />
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

function OnboardingOne({ data, update }) {
  const newData = {};

  return (
    <div>
      <div className="my-3">
        <h1>Fill Information</h1>
      </div>
      <div className="max-w-xs w-full flex flex-col justify-center space-y-4">
        <div>
          <label>Name</label>
          <TextField fullWidth name="name" size="small" />
        </div>
        <div>
          <label>Email</label>
          <TextField fullWidth name="email" size="small" />
        </div>
        <div>
          <label>Password</label>
          <TextField fullWidth name="password" type="password" size="small" />
        </div>
      </div>
      <button onClick={() => update("user", newData)}></button>
    </div>
  );
}

function OnboardingTwo({ data, update }) {
  return <div>i am page two</div>;
}

function OnboardingThree({ data, update }) {
  return <div>i am page three</div>;
}
