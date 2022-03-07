import React, { useEffect, useState } from "react";
import Layout from "@/layouts/UserLayout";
import useGetAllHistories from "@/hooks/user/useGetAllHistories";
import CaloriesStat from "@/components/chart/CaloriesStat";

export default function statistic() {
  const { data, error } = useGetAllHistories();

  console.log(data, "data all hitoriess");

  let dataset = {};

  if (data?.data !== undefined) {
    dataset = {
      labels: data?.data?.map((item) => item.date),
      datasets: [
        {
          label: "Calories Stat",
          data: data?.data?.map((item) => item.total_calories),
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  }

  console.log(dataset, "dataset");
  return (
    <Layout>
      <div>
        <div>
          <h1>Statistic</h1>
        </div>
        <div>
          <CaloriesStat dataset={dataset} />
        </div>
      </div>
    </Layout>
  );
}
