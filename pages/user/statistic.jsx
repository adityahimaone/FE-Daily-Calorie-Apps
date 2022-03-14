import React, { useEffect, useState } from "react";
import Layout from "@/layouts/UserLayout";
import useGetAllHistories from "@/hooks/user/useGetAllHistories";
import CaloriesStat from "@/components/chart/CaloriesStat";
import {
  VariableIcon,
  ChartSquareBarIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import profile from "@/public/dummy.png";

export default function statistic() {
  const { data, error } = useGetAllHistories();
  const infoUser = useSelector((state) => state.user);

  console.log(data, "data all hitoriess");

  let dataset = {};

  let dataCard = {};

  if (data?.data !== undefined) {
    dataset = {
      labels: data?.data?.map((item) => item.date),
      datasets: [
        {
          label: "Calories",
          data: data?.data?.map((item) => item.total_calories),
          backgroundColor: "#F96E41",
          borderColor: "#50429B",
        },
      ],
    };
    dataCard = {
      total_food: data?.data?.map((item) => item.total_food),
      total_calories: data?.data?.map((item) => item.total_calories),
      water: data?.data?.map((item) => item.water),
    };
  }

  let averageCalories = 0;
  let averageTotalFood = 0;
  // mean dataset.data
  if (data?.data !== undefined) {
    averageCalories =
      dataCard?.total_calories?.reduce((a, b) => a + b, 0) /
      dataCard?.total_calories?.length;
    averageTotalFood =
      dataCard?.total_food?.reduce((a, b) => a + b, 0) /
      dataCard?.total_food?.length;
  }

  console.log(infoUser, "dataset");
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Statistic</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-stretch content-center">
          <div className="">
            <div className="bg-slate-50 rounded-lg shadow-lg p-4 h-full ">
              <div className="flex justify-start items-center space-x-1">
                <ChartSquareBarIcon className="h-5 w-5 " />
                <h1 className="font-semibold">Graph</h1>
              </div>
              <div className="flex items-center">
                <CaloriesStat dataset={dataset} />
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
              <div className="col-span-2 bg-slate-50 w-full py-5 px-12 rounded-lg flex flex-col  gap-x-5 shadow-lg">
                <div className="flex justify-start items-center space-x-1">
                  <UserCircleIcon className="h-5 w-5" />
                  <h1 className="font-semibold">Info User</h1>
                </div>
                <div className="flex flex-col justify-center items-center my-4">
                  <div class="avatar">
                    <div class="w-20 rounded-full ring ring-mainorange-100  ring-offset-0">
                      <img
                        src={
                          infoUser.id !== 0 ? infoUser?.avatar_url : profile.src
                        }
                      />
                    </div>
                  </div>
                  <h2 className="my-2 text-lg font-semibold">
                    {infoUser.name}
                  </h2>
                </div>
                <div>
                  <div className="flex flex-row bg-slate-200 justify-around rounded-lg py-5">
                    <div className="flex flex-col">
                      <p className="text-lg text-center font-bold">
                        {infoUser.calories} Kcal
                      </p>
                      <p className="text-center text-slate-500">
                        Calories Need
                      </p>
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
              </div>
              <div className="bg-slate-50 col-span-2 lg:col-span-1 py-5 px-10 rounded-lg flex justify-center items-center gap-x-5 shadow-lg">
                <div className=" bg-mainpurple-100 p-4 rounded-lg">
                  <VariableIcon className="text-white h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-sm font-medium text-slate-400">
                    Average Calories Per Day
                  </h1>
                  <h1 className="text-xl font-bold">
                    {averageCalories.toFixed(0)} Kcal
                  </h1>
                </div>
              </div>
              <div className="bg-slate-50 col-span-2 lg:col-span-1 py-5 px-10 rounded-lg flex justify-center items-center gap-x-5 shadow-lg">
                <div className=" bg-mainpurple-100 p-4 rounded-lg">
                  <VariableIcon className="text-white h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-sm font-medium text-slate-400">
                    Average Food Per Day
                  </h1>
                  <h1 className="text-xl font-bold">
                    {averageTotalFood.toFixed(0)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
