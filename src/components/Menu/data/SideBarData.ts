import { ISideBar } from "../types/SideBar";

export const sideBarData: ISideBar[] = [
  {
    routeUrl: "/",
    label: "Users",
    icon: "fa-solid fa-users",
    isOpen: true,
  },
  {
    routeUrl: "/login",
    label: "Sign out",
    icon: "fa-solid fa-arrow-right-from-bracket",
    isOpen: true,
  }
];
