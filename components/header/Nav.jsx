import Link from "next/link";
import React, { useState } from "react";
import Container from "@/components/Container";
import {
  FireIcon,
  MenuAlt2Icon,
  XIcon,
  ChevronDownIcon,
  LoginIcon,
  LogoutIcon,
  CogIcon,
} from "@heroicons/react/solid";
import profile from "@/public/dummy.png";
import Image from "next/image";

export default function Nav(props) {
  const { location } = props;
  const [offcanvas, setOffcanvas] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const userNavList = [
    { title: "Dashboard", link: "/user/dashboard" },
    { title: "Meal Plan", link: "/user/mealplan" },
    { title: "Histories", link: "/user/histories" },
    { title: "Statistic", link: "/user/statistic" },
  ];

  const guestNavList = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
  ];

  const userDropdownListLogin = [
    {
      title: "Setting",
      link: "/setting",
      icon: <CogIcon className="h-4 w-4" />,
    },
    {
      title: "Logout",
      link: "/logout",
      icon: <LogoutIcon className="h-4 w-4" />,
    },
  ];

  const userDropdownListLogout = [{ title: "Login", link: "/login" }];

  return (
    <nav
      className={`${
        location === "guest"
          ? "bg-white text-mainpurple-100"
          : location === "user"
          ? "bg-mainpurple-100 text-white"
          : "bg-white"
      } py-2 shadow-lg absolute z-50 inset-x-0 top-0`}
    >
      <Container>
        <div className="flex items-center ">
          <div className="w-3/12 lg:hidden">
            <button type="button" onClick={() => setOffcanvas(!offcanvas)}>
              <MenuAlt2Icon className="w-8 h-8 " />
            </button>
          </div>
          <div className="lg:w-3/12 w-6/12 flex items-center justify-center lg:justify-start">
            <div className="w-10 h-10 bg-slate-200/70 rounded flex justify-center items-center shadow-2xl mr-4">
              <FireIcon className="w-5 h-5 " />
            </div>
            <span className=" font-bold">Daily Calorie</span>
          </div>
          <div className="w-3/12 lg:hidden text-right">
            <button type="button">
              {/* <div className="w-8 h-8 bg-slate-800 rounded-full"></div> */}
            </button>
          </div>
          <div
            className={`lg:w-7/12 w-full bg-gradient-to-b from-mainpurple-100 to-indigo-800 lg:bg-none fixed lg:static lg:h-auto lg:p-0 top-0 z-50 h-full p-10 transition-all ${
              offcanvas ? "left-0 text-white" : "-left-full"
            }`}
          >
            <button
              type="button"
              onClick={() => setOffcanvas(!offcanvas)}
              className="absolute top-10 right-10 lg:hidden"
            >
              <XIcon className="w-8 h-8 " />
            </button>
            <ul className="lg:space-x-14 flex lg:items-center flex-col lg:flex-row mt-4 lg:mt-0 space-y-5 lg:space-y-0">
              {location === "guest"
                ? guestNavList.map((item, index) => (
                    <li
                      key={index}
                      className="font-regular hover:text-mainorange-100"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))
                : userNavList.map((item, index) => (
                    <li
                      key={index}
                      className="font-regular hover:text-mainorange-100"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="w-2/12 flex items-center justify-end space-x-2">
            <span className="hidden lg:block text-medium">Hello, User</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center"
              >
                <div className="border-2 border-mainorange-100 rounded-full w-8 h-8">
                  <Image
                    src={profile}
                    width={30}
                    height={30}
                    className="rounded-full object-cover w-8 h-8 "
                  />
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 ${
                    location === "guest"
                      ? " text-mainpurple-100"
                      : location === "user"
                      ? " text-white"
                      : "bg-none"
                  }`}
                />
              </button>
              {userDropdown && (
                <ul
                  className={`absolute w-[150px] right-0 top-12 bg-mainpurple-100  rounded shadow-2xl z-auto  text-white transition-all`}
                >
                  {userDropdownListLogin.map((item, index) => (
                    <li
                      key={index}
                      className="border-b border-white/60 last:border-0"
                    >
                      <Link href={item.link}>
                        <span className="flex py-2 px-2 hover:bg-violet-900/50 hover:rounded items-center">
                          {item.title} <span className="ml-2">{item.icon}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
