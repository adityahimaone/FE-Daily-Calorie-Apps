import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import GuestLayout from "@/layouts/GuestLayout";
import Hero from "@/public/hero.svg";
import { useDispatch } from "react-redux";
import { setPrivilege } from "store/appSlice";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(setPrivilege("guest"));

  return (
    <GuestLayout>
      {/* Hero */}
      <div className="flex flex-col-reverse lg:flex-row max-h-fit py-10 lg:py-28 items-center">
        <div className="flex-1 flex flex-col space-y-5">
          <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-medium text-mainorange-100">
            <p>Track Your Daily Calories</p> <p>To Help Your Diet </p>
            <p>Program</p>
          </h1>
          <p className="lg:text-lg text-center lg:text-left">
            a food diary application, calorie calculation, and food database
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className=" bg-mainpurple-100 px-4 py-1 text-white rounded-lg w-fit">
              START FOR FREE
            </button>
          </div>
        </div>
        <div className="flex-1 flex w-full justify-center">
          <Image src={Hero} width={400} height={400} />
        </div>
      </div>
    </GuestLayout>
  );
}
