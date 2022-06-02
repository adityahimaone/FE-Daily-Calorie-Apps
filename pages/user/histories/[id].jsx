import React from "react";
import Layout from "@/layouts/UserLayout";
import { useRouter } from "next/router";
import useGetHistoriesDetail from "@/hooks/user/useGetHistoriesDetail";
import { ChevronLeftIcon } from "@heroicons/react/outline";

export default function HistoriesDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate, error } = useGetHistoriesDetail(id);

  console.log(data, "data");
  return (
    <Layout>
      <div>
        <div className="mb-4 flex items-center">
          <button onClick={() => router.back()}>
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Histories Detail</h1>
        </div>
        <div className="flex flex-col space-y-4">
          {data?.data?.map((item, index) => {
            return (
              <div className="relative flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 w-full border-white bg-white ">
                <div className="w-full lg:w-1/12 bg-white grid place-items-center">
                  <img
                    src={
                      item.food_image
                        ? item.food_image
                        : "https://alxgroup.com.au/wp-content/uploads/2016/04/dummy-post-horisontal.jpg"
                    }
                    alt="food"
                    className="rounded-lg w-full object-cover md:w-[100px] h-[100px]"
                  />
                </div>
                <div className="w-full lg:w-11/12 bg-white flex flex-col justify-start  md:justify-between items-center md:flex-row space-y-2 space-x-2 p-3">
                  <div>
                    <h3 className="text-2xl font-semibold">{item.food_name}</h3>
                  </div>
                  <div className="flex flex-row shadow-md gap-5 space-x-4 p-2 bg-slate-100 rounded-lg">
                    <div className="flex flex-col text-center">
                      <p className="font-semibold">Calories</p>
                      <p>{item.food_calories.toFixed(0)} Kcal</p>
                    </div>
                    <div className="flex flex-col text-center">
                      <p className="font-semibold">Carbs</p>
                      <p>{item.food_carbs.toFixed(0)}g</p>
                    </div>
                    <div className="flex flex-col text-center">
                      <p className="font-semibold">Fat</p>
                      <p>{item.food_fat.toFixed(0)}g</p>
                    </div>
                    <div className="flex flex-col text-center">
                      <p className="font-semibold">Protein</p>
                      <p>{item.food_protein.toFixed(0)}g</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
