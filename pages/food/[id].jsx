import React from "react";
import Layout from "@/layouts/UserLayout";
import { useRouter } from "next/router";
import useGetFoodByID from "@/hooks/food/useGetFoodByID";

export default function FoodDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate, error } = useGetFoodByID(id);

  console.log(data, "food");
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Food Detail</h1>
        </div>
        <div className="flex flex-col xl:flex-row my-10">
          <div className="flex-1 border flex justify-center">
            <img
              src={data?.data?.img_url}
              alt="food"
              className=" rounded-lg shadow-lg w-[350px] h-[350px] object-fill"
            />
          </div>
          <div className="flex-grow border flex flex-col justify-start space-y-5">
            <div>
              <h2 className="text-2xl">{data?.data?.title}</h2>
              <h4>Serving Size : {data?.data?.serving_size} G</h4>
            </div>
            <div className=" bg-bluewhite rounded-lg w-full shadow-lg p-4">
              <div className="mb-4">
                <h2>Ringkasan Gizi</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className=" bg-white rounded-md p-5 flex flex-col items-center">
                  <h1 className="font-semibold">Calories</h1>
                  <h1>{data?.data?.calories} Kcal</h1>
                </div>
                <div className=" bg-white rounded-md p-5 flex flex-col items-center">
                  <h1 className="font-semibold">Protein</h1>
                  <h1>{data?.data?.protein} G</h1>
                </div>
                <div className=" bg-white rounded-md p-5 flex flex-col items-center">
                  <h1 className="font-semibold">Carbs</h1>
                  <h1>{data?.data?.carbs} G</h1>
                </div>
                <div className=" bg-white rounded-md p-5 flex flex-col items-center">
                  <h1 className="font-semibold">Fat</h1>
                  <h1>{data?.data?.fat} G</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
