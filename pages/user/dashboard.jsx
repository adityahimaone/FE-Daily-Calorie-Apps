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
import { useSelector } from "react-redux";

export default function Dashboard() {
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
      serving_size: option.serving_size,
      img_url: option.img_url,
    }),
  });

  const [waterConsume, setWaterConsume] = useState(0);
  const [offcanvas, setOffcanvas] = useState(false);
  const infoUser = useSelector((state) => state.user);
  console.log(infoUser, "infoUser");

  return (
    <Layout pageTitle="Dashboard">
      {/* Profile Info */}
      <div className="w-full p-4 my-5 rounded-lg shadow-xl bg-bluewhite">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-400">
            P
          </div>
          <div className="flex flex-col mx-5">
            <p className="font-semibold">Hello, {infoUser?.name}</p>
            <p>Ready to track your daily calories</p>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="flex flex-col space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
        <div className="w-full p-4 rounded-lg shadow-md bg-mainorange-100">
          <div className="absolute">
            <h2 className="relative text-white">Calorie Percent</h2>
          </div>
          <div className="flex items-center justify-center h-full p-4">
            <ProgessCircular progress="30" />
          </div>
        </div>
        <div className="w-full p-4 text-white rounded-lg shadow-md bg-mainpurple-100">
          <div className="absolute">
            <h2 className="relative ">Calorie Stats</h2>
          </div>
          <div className="flex items-center justify-center h-full p-4">
            <div>
              <h1 className="text-4xl font-bold">1234</h1>
              <h1 className="text-2xl">/ {infoUser?.calories}</h1>
            </div>
            <div>
              <h1 className="text-4xl font-light">Kcal</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Search  */}
      <div className="flex flex-row items-center my-5 space-x-2">
        <div className="w-8/12 lg:w-11/12">
          <input
            type="text"
            className="w-full p-4 text-black rounded-lg shadow-md bg-bluewhite"
            placeholder="Search for a Food"
            {...getInputProps()}
          />
          {groupedOptions.length > 0 ? (
            <div className="bg-white" {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <div {...getOptionProps({ option, index })}>{option.title}</div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex justify-center w-4/12 lg:w-1/12">
          <button
            type="button"
            className="w-full p-4 text-white rounded-lg bg-mainpurple-100"
          >
            Search
          </button>
        </div>
      </div>
      {/* Water */}
      <div className="p-4 rounded-lg shadow-md bg-bluewhite">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-medium">Water</h2>
          <h2 className="text-xl font-medium">{waterConsume} L</h2>
        </div>
        <hr className="my-4 border-t-2 rounded border-mainpurple-100" />
        <div className="flex items-center justify-center">
          <Rating
            name="customized-color"
            defaultValue={0}
            getLabelText={(value) => `${value} Water${value !== 1 ? "s" : ""}`}
            onChange={(event, newValue) => {
              setWaterConsume(newValue * 0.25);
            }}
            max={8}
            precision={1}
            icon={<Image src={waterFill} width={50} height={50} alt="about" />}
            emptyIcon={
              <Image src={waterNofill} width={50} height={50} alt="about" />
            }
          />
        </div>
      </div>
      {/* Recent Food */}
      <div className="p-4 my-4 rounded-lg shadow-md bg-bluewhite">
        <div>
          <h2 className="text-xl font-semibold">Recent Food</h2>
        </div>
        <div>
          {food.data.map((food) => (
            <div className="flex flex-col items-center w-full pb-4 mb-2 bg-white rounded-lg shadow-md lg:flex-row lg:p-4">
              <div className="w-full lg:w-1/6 lg:h-1/5">
                <img
                  className="object-cover w-full h-48 rounded-t-lg lg:rounded-lg"
                  src={food.img_url}
                  // width={100}
                  // height={100}
                  alt={food.title}
                />
              </div>
              <div className="flex flex-col items-center justify-between w-full px-4 lg:flex-row">
                <div className="flex justify-between w-full p-4">
                  <div>
                    <p className="text-xl">{food.title}</p>
                    <p>{food.serving_size.toFixed(2)} G</p>
                  </div>
                  <div>
                    <p className="text-xl">+{food.calories} Kcal</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/6">
                  <button className="w-full px-4 py-2 text-white rounded-lg bg-mainorange-100">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
