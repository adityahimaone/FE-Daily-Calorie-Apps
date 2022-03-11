import { HomeIcon, UsersIcon, CakeIcon } from "@heroicons/react/outline";

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
  {
    text: "Management Food",
    icon: <CakeIcon className="h-5 w-5 mr-2" />,
    path: "/admin/management/food",
  },
];

export default menuItems;
