"use client";
import { HeartIcon, HomeIcon, LayoutDashboardIcon, LogOutIcon, Settings } from "lucide-react";
import React from "react";
import { GoPeople } from "react-icons/go";
import Logo from "../defaults/Logo";
import NavLink from "./NavLink";
import { useGetUser } from "@/lib/queryFns";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const NAV_LINKS = [
  {
    link: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    link: "/category",
    label: "Category",
    icon: <LayoutDashboardIcon />,
  },
  {
    link: "/wishlist",
    label: "WIshlist",
    icon: <HeartIcon />,
  },
  {
    link: "/friends",
    label: "Friends",
    icon: <GoPeople />,
  },
];

const SideBar = () => {
  const { user, isLoading } = useGetUser();
  const router = useRouter();
  return (
    <div className=" h-screen bg-black/30  sticky  inset-0 col-span-2">
      <div className=" px-10 h-full py-8 gap-8 flex flex-col items-start">
        <Logo />
        <div className=" flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <NavLink navLink={link} />
          ))}
        </div>
        <div className="  mt-auto">
          <NavLink navLink={{ link: "/settings", label: "Settings", icon: <Settings /> }} />
          {user?.data && (
            <button
              onClick={async () => {
                const res = await logout();
                if (res.success) {
                  toast.success(res.success);
                  router.refresh();
                }
              }}
              className="w-full justify-between  my-2 hover:bg-gray-200 rounded-2xl py-2 flex items-center gap-2"
            >
              <LogOutIcon /> <p>Logout</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
