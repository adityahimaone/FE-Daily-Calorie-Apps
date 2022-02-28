import React, { useState, useEffect } from "react";
import Layout from "@/layouts/UserLayout";
import ProgessCircular from "@/components/dashboardUser/ProgessCircular";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { SearchIcon, PlusIcon } from "@heroicons/react/solid";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import food from "./dataFood";
import Image from "next/image";
import waterFill from "@/public/water-fill.png";
import waterNofill from "@/public/water-nofill.png";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import GetFood from "@/hooks/GetFood";
import debounce from "lodash.debounce";
import AddHistories from "@/hooks/user/AddHistories";
import GetHistories from "@/hooks/user/GetHistories";
import useFetch from "@/hooks/useFetch";
import { mainApiAuth } from "@/services/Api";

export default function Dashboard() {
  const { sendDataToServer: addHitory, response: respHistory } = AddHistories();
  const [refresh, setRefresh] = useState(true);
  const { sendDataToServer, response } = GetFood();
  const { mutate, error, data: respGetHistories } = GetHistories(refresh);
  const [waterConsume, setWaterConsume] = useState(0);
  const [offcanvas, setOffcanvas] = useState(false);
  const infoUser = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchQuery);
  console.log(response, "response");
  console.log(searchResult, "searchResult");
  console.log(respGetHistories, "respGetHistories");
  const [dataUserHistories, setdataUserHistories] = useState({});
  useEffect(() => {
    setdataUserHistories(respGetHistories?.data);
    setRefresh(!refresh);
  }, [respGetHistories, infoUser]);

  console.log(dataUserHistories, "dataUserHistories");
  console.log(infoUser.name, "infoUser");

  useEffect(() => {
    if (infoUser.id !== 0) {
      setRefresh(!refresh);
    }
  }, [dataUserHistories, infoUser.id]);

  const fetchData = async (searchQuery, cb) => {
    console.warn("fetching" + searchQuery);
    const res = await sendDataToServer(searchQuery);
    cb(res);
  };

  const debounceSearch = debounce((searchQuery, cb) => {
    fetchData(searchQuery, cb);
  }, 500);

  useEffect(() => {
    debounceSearch(searchQuery, (res) => {
      setSearchResult(res);
    });
  }, [searchQuery]);

  useEffect(() => {
    setSearchResult(response.data);
  }, [response]);

  const onClickFood = (item) => {
    console.log(item, "item");
    addHitory(item);
    setRefresh(!refresh);
  };

  return (
    <Layout pageTitle="Dashboard">
      {/* Profile Info */}
      <div className="w-full p-4 my-5 rounded-lg shadow-xl bg-bluewhite">
        <div className="flex items-center">
          <div class="avatar">
            <div class="w-10 rounded-full ring ring-mainorange-100 ring-offset-1">
              <img
                src={infoUser.id !== 0 ? infoUser?.avatar_url : profile.src}
              />
            </div>
          </div>
          <div className="flex flex-col mx-5">
            <p className="font-semibold">Hello, {infoUser.name}</p>
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
              <h1 className="text-4xl font-bold">
                {dataUserHistories?.total_calories}
              </h1>
              <h1 className="text-2xl">/ {infoUser?.calories} </h1>
            </div>
            <div>
              <h1 className="text-4xl font-light">Kcal</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Search  */}
      <div className="flex flex-col items-center my-5 space-x-2">
        <div class="bg-white w-full h-16 rounded-xl mb-3 shadow-lg p-2">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            class="w-full h-full text-2xl rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="bg-white w-full rounded-xl shadow-xl overflow-hidden p-1">
          {searchResult ? (
            searchResult?.slice(0, 5).map((item) => (
              <div
                key={item.id}
                class="w-full flex p-3 pl-4 items-center justify-between space-x-2 hover:bg-gray-300 rounded-lg cursor-pointer"
              >
                <div className="flex items-center">
                  <div class="mr-4">
                    <div class="h-12 w-12 rounded-md flex items-center justify-center text-3xl">
                      {item.img_url ? (
                        <img src={item.img_url} alt="food" />
                      ) : (
                        <img
                          src="https://assets.materialup.com/uploads/98622f57-ac59-4b44-8db2-3355bb43efed/preview.jpg"
                          alt="food"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div class="font-bold text-lg">{item.title}</div>
                    <div class="text-xs text-gray-500">
                      <span class="mr-2">
                        Calories: {item.calories.toFixed(2)} Kcal
                      </span>
                      <span class="mr-2">
                        Carbs: {item.carbs.toFixed(2)} Kcal
                      </span>
                      <span class="mr-2">
                        Protein: {item.protein.toFixed(2)} Kcal
                      </span>
                      <span class="mr-2">Fat: {item.fat.toFixed(2)} Kcal</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <button onClick={() => onClickFood(item)}>
                    <PlusIcon className="w-6 h-6 p-1 text-white rounded-sm bg-mainorange-100"></PlusIcon>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div class="w-full flex p-3 pl-4 items-center hover:bg-gray-300 rounded-lg cursor-pointer">
              <h1>No Food</h1>
            </div>
          )}
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
          {dataUserHistories?.histories_details?.map((food) => (
            <div className="flex flex-col items-center w-full pb-4 mb-2 bg-white rounded-lg shadow-md lg:flex-row lg:p-4">
              <div className="w-full lg:w-1/6 lg:h-1/5">
                <img
                  className="object-cover w-full h-48 rounded-t-lg lg:rounded-lg"
                  src={
                    food?.food?.imgURL
                      ? food?.food?.imgURL
                      : "https://assets.materialup.com/uploads/98622f57-ac59-4b44-8db2-3355bb43efed/preview.jpg"
                  }
                  // width={100}
                  // height={100}
                  alt={food?.food?.title}
                />
              </div>
              <div className="flex flex-col items-center justify-between w-full px-4 lg:flex-row">
                <div className="flex justify-between w-full p-4">
                  <div>
                    <p className="text-xl">{food?.food?.title}</p>
                    <p>{food?.food?.serving_size} G</p>
                  </div>
                  <div>
                    <p className="text-xl">
                      +{food?.food?.calories.toFixed(0)} Kcal
                    </p>
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
