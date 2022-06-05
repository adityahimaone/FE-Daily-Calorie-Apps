import React, { useState, useEffect } from "react";
import Layout from "@/layouts/UserLayout";
import ProgessCircular from "@/components/dashboardUser/ProgessCircular";
import { SearchIcon, PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import waterFill from "@/public/waterfill.png";
import waterNofill from "@/public/waternofill.png";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import GetFood from "@/hooks/GetFood";
import profile from "@/public/dummy.png";
import debounce from "lodash.debounce";
import AddHistories from "@/hooks/user/AddHistories";
import useGetUser from "@/hooks/user/useGetUser";
import useGetFood from "@/hooks/useGetFood";
import useDeleteHistory from "@/hooks/user/useDeleteHistory";
import useAddWater from "@/hooks/user/useAddWater";
import useGetLastHistories from "@/hooks/user/useGetLastHistories";
import { useRouter } from "next/router";
import CardHistories from "@/components/dashboardUser/CardHistories";

export default function Dashboard() {
  const infoUser = useSelector((state) => state.user);
  const router = useRouter();

  // UseState
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [dataUserHistories, setdataUserHistories] = useState({});
  const [waterConsume, setWaterConsume] = useState(
    respGetHistories?.data?.water
  );
  const [itemID, setItemID] = useState(0);
  const [caloriePercent, setCaloriePercent] = useState(0);
  const [offcanvas, setOffcanvas] = useState(false);

  // Custom Hook
  const { sendDataToServer: addHistory, response: respHistory } =
    AddHistories();

  const {
    mutate: mutateGetHistories,
    error,
    data: respGetHistories,
  } = useGetLastHistories();

  useEffect(() => {
    setWaterConsume(respGetHistories?.data?.water);
  }, [respGetHistories?.data?.water]);

  const {
    data: dataUser,
    mutate: mutateGetUser,
    error: errGetUser,
    isLoading,
  } = useGetUser(infoUser.id);

  const {
    data: respDeleteHitory,
    mutate: mutateDeleteHistory,
    error: errDeleteHistory,
  } = useDeleteHistory(itemID);

  const { response, mutate: mutateGetFood } = useGetFood(searchQuery);

  const { data: dataWater, mutate: mutateAddWater } = useAddWater(waterConsume);

  useEffect(() => {
    mutateGetUser();
    mutateGetHistories();
    setdataUserHistories(respGetHistories?.data);
  }, [respGetHistories, infoUser]);

  const fetchData = async (searchQuery, cb) => {
    // console.warn("fetching" + searchQuery);
    const res = await mutateGetFood(searchQuery);
    cb(res);
  };

  const debounceSearch = debounce((searchQuery, cb) => {
    fetchData(searchQuery, cb);
  }, 2000);

  useEffect(() => {
    debounceSearch(searchQuery, (res) => {
      setSearchResult(res);
      mutateGetHistories();
    });
  }, [searchQuery]);

  const onClickFood = (item) => {
    // console.log(item, "item");
    addHistory(item);
    mutateGetHistories(null, true);
  };
  // console.log(waterFill.src, "waterFill");

  useEffect(() => {
    let percentage =
      (dataUserHistories?.total_calories / infoUser?.calories) * 100;
    setCaloriePercent(percentage.toFixed(0));
  }, [dataUserHistories?.total_calories]);

  const onClickDeleteHistory = (id) => {
    // console.log(id, "item id");
    setItemID(id);
    // mutateDeleteHistory();
  };

  const onDelete = (id) => {
    setItemID(id);
    mutateGetHistories(null, false);
  };

  const onGoHistoryPage = (id) => {
    let foodID = id;
    router.push(`/food/${foodID}`);
  };

  // console.log(dataUserHistories?.histories_details, "dataUserHistories");

  return (
    <Layout pageTitle="Dashboard">
      {/* Profile Info */}
      <div className="w-full p-4 my-5 rounded-lg shadow-xl bg-bluewhite">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-mainorange-100 ring-offset-1">
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
            <ProgessCircular progress={caloriePercent} />
          </div>
        </div>
        <div className="w-full p-4 text-white rounded-lg shadow-md bg-mainpurple-100">
          <div className="absolute">
            <h2 className="relative">Calorie Stats</h2>
          </div>
          <div className="flex items-center justify-center h-full p-6">
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
        <div className="bg-white w-full h-16 rounded-xl mb-3 shadow-lg p-2">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full text-2xl rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="bg-white w-full rounded-xl shadow-xl overflow-hidden p-1">
          {searchResult !== null ? (
            searchResult?.data?.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="w-full flex p-3 pl-4 items-center justify-between space-x-2 hover:bg-gray-300 rounded-lg cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="h-12 w-12 rounded-md flex items-center justify-center text-3xl">
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
                    <div className="font-bold text-lg">{item.title}</div>
                    <div className="text-xs text-gray-500">
                      <span className="mr-2">
                        Calories: {item.calories.toFixed(2)} Kcal
                      </span>
                      <span className="mr-2">
                        Carbs: {item.carbs.toFixed(2)} Kcal
                      </span>
                      <span className="mr-2">
                        Protein: {item.protein.toFixed(2)} Kcal
                      </span>
                      <span className="mr-2">
                        Fat: {item.fat.toFixed(2)} Kcal
                      </span>
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
            <div className="w-full flex p-3 pl-4 items-center hover:bg-gray-300 rounded-lg cursor-pointer">
              <h1>No Food</h1>
            </div>
          )}
        </div>
      </div>
      {/* Water */}
      <div className="p-4 rounded-lg shadow-md bg-bluewhite">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-medium">Water</h2>
          <h2 className="text-xl font-medium">
            {respGetHistories?.data?.water
              ? respGetHistories?.data?.water * 0.25
              : 0}
            L
          </h2>
        </div>
        <hr className="my-4 border-t-2 rounded border-mainpurple-100" />
        <div className="flex items-center justify-center">
          <Rating
            name="simple-controlled"
            value={waterConsume}
            // getLabelText={(value) => `${value} Water${value !== 1 ? "s" : ""}`}
            onChange={async (event, newValue) => {
              await setWaterConsume(newValue);
              mutateAddWater(newValue, true);
            }}
            max={8}
            precision={1}
            icon={
              <img src={waterFill.src} width={50} height={50} alt="waterFIll" />
            }
            emptyIcon={
              <img
                src={waterNofill.src}
                width={50}
                height={50}
                alt="waterNofill"
              />
            }
          />
        </div>
      </div>
      <img src={waterFill} alt="" />
      {/* Recent Food */}
      <div className="p-4 my-4 rounded-lg shadow-md bg-bluewhite">
        <div>
          <h2 className="text-xl font-semibold">Recent Food</h2>
        </div>
        <div>
          {dataUserHistories?.histories_details?.length <= 0 && (
            <div className="text-center p-4">Histories Not Found</div>
          )}
          {dataUserHistories?.histories_details?.map((food) => (
            <CardHistories
              key={food?.food?.ID}
              id={food?.food?.ID}
              title={food?.food?.title}
              image={food?.food?.imgURL}
              serving_size={food?.food?.serving_size}
              calories={food?.food?.calories}
              onDelete={onDelete}
              onGoHistoryPage={onGoHistoryPage}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
