import React from "react";
import Adminlayout from "@/layouts/AdminLayout";
import useGetAllUser from "@/hooks/admin/useGetAllUser";
import useGetAllFood from "@/hooks/admin/useGetAllFood";
import { UserIcon, CakeIcon } from "@heroicons/react/outline";

export default function Dashboard() {
  const { data: dataUser, mutate: mutateGetUser } = useGetAllUser();
  const { data: dataFood, mutate: mutateGetFood } = useGetAllFood();
  const countUser = dataUser?.data?.length;
  const countFood = dataFood?.data?.length;
  return (
    <Adminlayout pageTitle="Dashboard">
      <div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Dahboard</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex py-4 px-4 space-x-4 w-full md:w-64 justify-start items-center bg-bluewhite rounded-lg shadow-lg">
            <div className=" bg-mainorange-100 rounded-full p-2">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-md font-thin">Total User</h3>
              <h1 className="text-2xl font-semibold">
                {countUser ? countUser : "0"}
              </h1>
            </div>
          </div>
          <div className="flex py-4 px-4 space-x-4 w-full md:w-64 justify-start items-center bg-bluewhite rounded-lg shadow-lg">
            <div className=" bg-mainpurple-100 rounded-full p-2">
              <CakeIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-md font-thin">Total Food</h3>
              <h1 className="text-2xl font-semibold">
                {countFood ? countFood : "0"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Adminlayout>
  );
}
