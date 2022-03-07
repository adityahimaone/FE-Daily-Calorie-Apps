import React, { useEffect, useState } from "react";
import Layout from "@/layouts/UserLayout";
import useGetAllHistories from "@/hooks/user/useGetAllHistories";
import CaloriesStat from "@/components/chart/CaloriesStat";
import { VariableIcon } from "@heroicons/react/solid";

export default function statistic() {
  const { data, error } = useGetAllHistories();

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
      dataCard?.total_calories.reduce((a, b) => a + b, 0) /
      dataCard?.total_calories.length;
    averageTotalFood =
      dataCard?.total_food.reduce((a, b) => a + b, 0) /
      dataCard?.total_food.length;
  }

  console.log(dataCard, "dataset");
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Statistic</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="bg-slate-50 rounded-lg shadow-lg p-4">
              <CaloriesStat dataset={dataset} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-5">
              <div className="bg-slate-50 py-5 px-12 rounded-lg flex justify-center items-center gap-x-5 shadow-lg">
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
              <div className="bg-slate-50 py-5 px-12 rounded-lg flex justify-center items-center gap-x-5 shadow-lg">
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
