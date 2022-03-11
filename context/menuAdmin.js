import { HomeIcon, UsersIcon } from "@heroicons/react/outline";

const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
    path: "/admin/dashboard",
  },
  {
    text: "Management User",
    icon: <UsersIcon className="h-5 w-5 mr-2" />,
    path: "/admin/management/user",
  },
];

export default menuItems;
