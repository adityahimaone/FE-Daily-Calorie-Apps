import React from "react";

export default function Sidebar(props) {
  const { isOpen } = props;

  console.log(isOpen, "is-open 2 3");

  const sidebarLink = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      name: "Setting",
      link: "/admin/dashboard",
    },
  ];
  return (
    <div
      className={`sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:h-screen md:translate-x-0 transition duration-200 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <a href="#" className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Daily Calories</span>
      </a>

      <nav>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
        >
          Home
        </a>
      </nav>
    </div>
  );
}
