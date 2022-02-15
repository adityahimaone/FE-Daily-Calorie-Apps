import React, { useState } from "react";
import Layout from "@/layouts/UserLayout";
import ProgessCircular from "@/components/dashboardUser/ProgessCircular";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { SearchIcon } from "@heroicons/react/solid";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import food from "./dataFood";
import Image from "next/image";
import waterFill from "@/public/water-fill.png";
import waterNofill from "@/public/water-nofill.png";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

export default function dashboard() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: food.data,
    getOptionLabelProps: (option) => ({
      id: option.id,
      title: option.title,
      calories: option.calories,
      fat: option.fat,
      carbs: option.carbs,
      protein: option.protein,
      serving_size: option.serving_size.toFixed(2),
      img_url: option.img_url,
    }),
  });

  const [waterConsume, setWaterConsume] = useState(0);
  const [offcanvas, setOffcanvas] = useState(false);

  return (
    <div>
      <Layout pageTitle="Dashboard">
        {/* Profile Info */}
        <div className="rounded-lg bg-bluewhite shadow-xl w-full p-4 my-5">
          <div className="flex items-center">
            <div className="rounded-full bg-slate-400 w-10 h-10 flex justify-center items-center">
              P
            </div>
            <div className="flex flex-col mx-5">
              <p className="font-semibold">Hello, User</p>
              <p>Ready to track your daily calories</p>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="flex lg:flex-row flex-col lg:space-x-5 lg:space-y-0 space-y-5">
          <div className=" bg-mainorange-100 rounded-lg w-full p-4 shadow-md">
            <div className="absolute">
              <h2 className="text-white relative">Calorie Percent</h2>
            </div>
            <div className="flex justify-center items-center h-full p-4">
              <ProgessCircular progress="30" />
            </div>
          </div>
          <div className="bg-mainpurple-100 rounded-lg w-full p-4 text-white shadow-md">
            <div className="absolute">
              <h2 className=" relative">Calorie Stats</h2>
            </div>
            <div className="flex justify-center items-center h-full p-4">
              <div>
                <h1 className="text-4xl font-bold">1234</h1>
                <h1 className="text-2xl">/ 2054</h1>
              </div>
              <div>
                <h1 className="text-4xl font-light">Kcal</h1>
              </div>
            </div>
          </div>
        </div>
        {/* Search  */}
        <div className="my-5 flex flex-row items-center space-x-2">
          <div className="lg:w-11/12 w-8/12">
            <input
              type="text"
              className="bg-bluewhite rounded-lg w-full p-4 text-black shadow-md"
              placeholder="Search for a Food"
              {...getInputProps()}
            />
            {groupedOptions.length > 0 ? (
              <div className="bg-white" {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <div {...getOptionProps({ option, index })}>
                    {option.title}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="lg:w-1/12 w-4/12 flex justify-center">
            <button
              type="button"
              className="rounded-lg bg-mainpurple-100 text-white w-full p-4"
            >
              Search
            </button>
          </div>
        </div>
        {/* Water */}
        <div className="bg-bluewhite rounded-lg shadow-md p-4">
          <div className="flex flex-row justify-between">
            <h2 className="font-medium text-xl">Water</h2>
            <h2 className="font-medium text-xl">{waterConsume} L</h2>
          </div>
          <hr className="border-t-2 rounded my-4 border-mainpurple-100" />
          <div className="flex justify-center items-center">
            <Rating
              name="customized-color"
              defaultValue={0}
              getLabelText={(value) =>
                `${value} Water${value !== 1 ? "s" : ""}`
              }
              onChange={(event, newValue) => {
                setWaterConsume(newValue * 0.25);
              }}
              max={8}
              precision={1}
              icon={
                <Image src={waterFill} width={50} height={50} alt="about" />
              }
              emptyIcon={
                <Image src={waterNofill} width={50} height={50} alt="about" />
              }
            />
          </div>
        </div>
        {/* Recent Food */}
        <div className="bg-bluewhite p-4 rounded-lg shadow-md my-4">
          <div>
            <h2 className="font-semibold text-xl">Recent Food</h2>
          </div>
          <div>
            {food.data.map((food) => (
              <div className="bg-white w-full flex lg:flex-row flex-col lg:p-4 pb-4 rounded-lg mb-2 items-center shadow-md">
                <div className="w-full lg:w-1/6 lg:h-1/5">
                  <img
                    className="h-48 w-full lg:rounded-lg rounded-t-lg object-cover"
                    src={food.img_url}
                    // width={100}
                    // height={100}
                    alt={food.title}
                  />
                </div>
                <div className="flex lg:flex-row flex-col justify-between px-4 w-full items-center">
                  <div className="flex justify-between w-full p-4">
                    <div>
                      <p className="text-xl">{food.title}</p>
                      <p>{food.serving_size} G</p>
                    </div>
                    <div>
                      <p className="text-xl">+{food.calories} Kcal</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/6">
                    <button className="bg-mainorange-100 px-4 w-full py-2 text-white rounded-lg">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
