import React, { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import {
  FireIcon,
  MenuAlt2Icon,
  XIcon,
  ChevronDownIcon,
  LoginIcon,
  LogoutIcon,
  CogIcon,
  AdjustmentsIcon,
} from "@heroicons/react/solid";
import profile from "@/public/dummy.png";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";

export default function Nav(props) {
  const { location } = props;
  const [loc, setLoc] = useState("");
  const [offcanvas, setOffcanvas] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const infoUser = useSelector((state) => state.user);
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoc(location);
  }, [location]);

  const onCanvas = () => {
    setOffcanvas(!offcanvas);
  };

  const onDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const userNavList = [
    { title: "Dashboard", link: "/user/dashboard" },
    { title: "Meal Plan", link: "/user/mealplan" },
    { title: "Histories", link: "/user/histories" },
    { title: "Statistic", link: "/user/statistic" },
  ];

  const guestNavList = [
    { title: "Home", link: "/" },
    { title: "Calculator", link: "/calculator" },
  ];

  const userDropdownListLogin = [
    {
      title: "Dashboard",
      link: "/user/dashboard",
      icon: <CogIcon className="w-4 h-4" />,
    },
    {
      title: "Setting",
      link: "/user/update",
      icon: <CogIcon className="w-4 h-4" />,
    },
    {
      title: "Logout",
      link: "/user/logout",
      icon: <LogoutIcon className="w-4 h-4" />,
    },
  ];

  const userDropdownListLogout = [
    { title: "Login", link: "/entry/user" },
    { title: "Register", link: "/entry/register" },
  ];

  const spliceName = infoUser?.name ? infoUser?.name?.split(" ") : "Null";

  const onLogout = async () => {
    dispatch(clearUser());
    cookies.remove("token", { path: "/", domain: window.location.hostname });
    await router.push("/");
    router.reload(window.location.pathname);
  };

  console.log(loc);

  return (
    <nav
      className={`${
        loc === "guest"
          ? "bg-white text-mainpurple-100 shadow-lg"
          : loc === "user"
          ? "bg-mainpurple-100 text-white shadow-lg"
          : loc === "home"
          ? "text-mainpurple-100"
          : "bg-white"
      } py-2 absolute z-50 inset-x-0 top-0`}
    >
      <div className="container px-10 mx-auto">
        <div className="flex items-center">
          <div className="w-3/12 lg:hidden">
            <button type="button" onClick={() => setOffcanvas(!offcanvas)}>
              <MenuAlt2Icon className="w-8 h-8 " />
            </button>
          </div>
          <div className="flex items-center justify-center w-6/12 lg:w-3/12 lg:justify-start">
            <div className="flex items-center justify-center w-10 h-10 mr-4 rounded shadow-2xl bg-slate-200/70">
              <FireIcon className="w-5 h-5 " />
            </div>
            <span className="font-bold ">Daily Calorie</span>
          </div>
          <div className="w-3/12 text-right lg:hidden">
            <button type="button">
              {/* <div className="w-8 h-8 rounded-full bg-slate-800"></div> */}
            </button>
          </div>
          <div
            className={`lg:w-7/12 w-full bg-gradient-to-b from-mainpurple-100 to-indigo-800 lg:bg-none fixed lg:static lg:h-auto lg:p-0 top-0 z-50 h-full p-10 transition-all ${
              offcanvas ? "left-0 text-white" : "-left-full"
            }`}
          >
            <button
              type="button"
              onClick={onCanvas}
              className="absolute top-10 right-10 lg:hidden"
            >
              <XIcon className="w-8 h-8 " />
            </button>
            <ul className="flex flex-col mt-4 space-y-5 lg:space-x-14 lg:items-center lg:flex-row lg:mt-0 lg:space-y-0">
              {loc === "user"
                ? userNavList.map((item, index) => (
                    <li
                      key={index}
                      className={`font-regular group hover:text-mainorange-100 ${
                        router.asPath == item.link ? "text-mainorange-100 " : ""
                      }`}
                    >
                      <Link href={item.link}>{item.title}</Link>
                      <div className="h-0.5 bg-mainorange-100 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                    </li>
                  ))
                : guestNavList.map((item, index) => (
                    <li
                      key={index}
                      className="font-regular group hover:text-mainorange-100 "
                    >
                      <Link href={item.link}>{item.title}</Link>
                      <div className="h-0.5 bg-mainorange-100 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                    </li>
                  ))}
            </ul>
          </div>
          <div className="flex items-center justify-end w-2/12 space-x-2">
            <span className="hidden lg:block text-medium">
              Hello, {spliceName ? spliceName[0] : "Guest"}
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={onDropdown}
                className="flex items-center"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-mainorange-100 ring-offset-1">
                    <img
                      src={
                        infoUser.id !== 0 ? infoUser?.avatar_url : profile.src
                      }
                    />
                  </div>
                </div>
                <ChevronDownIcon
                  className={`ml-1 w-4 h-4 ${
                    loc === "guest"
                      ? " text-mainpurple-100"
                      : loc === "user"
                      ? " text-white"
                      : "bg-none"
                  }`}
                />
              </button>
              {userDropdown && (
                <ul
                  className={`absolute w-[150px] right-0 top-12 bg-mainpurple-100  rounded shadow-2xl z-auto  text-white transition-all`}
                >
                  {infoUser.id !== 0 ? (
                    <>
                      <li className="border-b border-white/60 last:border-0">
                        <Link href="/user/dashboard">
                          <button className="flex w-full items-center px-2 py-2 hover:bg-violet-900/50 hover:rounded">
                            Dashboard
                            <span className="ml-2">
                              <AdjustmentsIcon className="w-4 h-4" />
                            </span>
                          </button>
                        </Link>
                      </li>
                      <li className="border-b border-white/60 last:border-0">
                        <Link href="/user/update">
                          <button className="flex w-full items-center px-2 py-2 hover:bg-violet-900/50 hover:rounded">
                            Setting
                            <span className="ml-2">
                              <CogIcon className="w-4 h-4" />
                            </span>
                          </button>
                        </Link>
                      </li>
                      <li className="border-b border-white/60 last:border-0">
                        <button
                          onClick={onLogout}
                          className="flex w-full items-center px-2 py-2 hover:bg-violet-900/50 hover:rounded"
                        >
                          Logout
                          <span className="ml-2">
                            <LogoutIcon className="w-4 h-4" />
                          </span>
                        </button>
                      </li>
                    </>
                  ) : (
                    userDropdownListLogout.map((item, index) => (
                      <li
                        key={index}
                        className="border-b border-white/60 last:border-0"
                      >
                        <Link href={item.link}>
                          <button className="flex w-full items-center px-2 py-2 hover:bg-violet-900/50 hover:rounded">
                            {item.title}
                            <span className="ml-2">{item.icon}</span>
                          </button>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
