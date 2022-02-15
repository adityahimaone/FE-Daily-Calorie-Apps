import Link from "next/link";
import React, { useState } from "react";
import Container from "@/components/Container";
import { FireIcon } from "@heroicons/react/solid";

export default function NavUser() {
  const [offcanvas, setOffcanvas] = useState(false);
  return (
    <nav className="bg-mainpurple-100 py-2">
      <Container>
        <div className="flex items-center">
          <div className="w-3/12 flex items-center">
            <div className="w-10 h-10 bg-slate-500/70 rounded flex justify-center items-center shadow-2xl mr-4">
              <FireIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold">Daily Calorie</span>
          </div>
          <div className="w-7/12">
            <ul className="lg:space-x-14 flex lg:items-center flex-col lg:flex-row space-y-4 lg:space-y-0">
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
          <div className="w-2/12">
            <div className="rounded-full w-10 h-10 bg-gray-700"></div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
