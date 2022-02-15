import Link from "next/link";
import React, { useState } from "react";
import Container from "@/components/Container";
import { FireIcon, MenuAlt2Icon, XIcon } from "@heroicons/react/solid";
import profile from "@/public/dummy.png";
import Image from "next/image";

export default function NavUser() {
  const [offcanvas, setOffcanvas] = useState(false);
  return (
    <nav className="bg-mainpurple-100 py-2">
      <Container>
        <div className="flex items-center">
          <div className="w-3/12 lg:hidden">
            <button type="button" onClick={() => setOffcanvas(!offcanvas)}>
              <MenuAlt2Icon className="w-8 h-8 text-white" />
            </button>
          </div>
          <div className="lg:w-3/12 w-6/12 flex items-center justify-center lg:justify-start">
            <div className="w-10 h-10 bg-slate-500/70 rounded flex justify-center items-center shadow-2xl mr-4">
              <FireIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold">Daily Calorie</span>
          </div>
          <div className="w-3/12 lg:hidden text-right">
            <button type="button">
              {/* <div className="w-8 h-8 bg-slate-800 rounded-full"></div> */}
            </button>
          </div>
          <div
            className={`lg:w-7/12 w-full bg-gradient-to-b from-mainpurple-100 to-indigo-800 lg:bg-none fixed lg:static lg:h-auto lg:p-0 top-0 z-50 h-full p-10 transition-all ${
              offcanvas ? "left-0" : "-left-full"
            }`}
          >
            <button
              type="button"
              onClick={() => setOffcanvas(!offcanvas)}
              className="absolute top-10 right-10 lg:hidden "
            >
              <XIcon className="w-8 h-8 text-white" />
            </button>
            <ul className="lg:space-x-14 flex lg:items-center flex-col lg:flex-row mt-4 lg:mt-0 space-y-5 lg:space-y-0">
              <li className="text-white font-regular hover:text-mainorange-100">
                <Link href="/user/dashboard">Dashboard</Link>
              </li>
              <li className="text-white font-regular hover:text-mainorange-100">
                <Link href="/user/mealplan">Meal Plan</Link>
              </li>
              <li className="text-white font-regular hover:text-mainorange-100">
                <Link href="/user/histories">Histories</Link>
              </li>
              <li className="text-white font-regular hover:text-mainorange-100">
                <Link href="/user/statistic">Statistic</Link>
              </li>
            </ul>
          </div>
          <div className="w-2/12 flex items-center justify-end space-x-2">
            <span className="text-white hidden lg:block text-medium">
              Hello, User
            </span>
            <button className="rounded-full inline-flex border-mainorange-100 border-2 w-8 h-8 items-center">
              <Image
                src={profile}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
