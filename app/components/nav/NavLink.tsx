"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";
//how active link works
//how hooks works
//next link good side
const NavLink = ({ navLink }: { navLink: { link: string; label: string; icon: ReactElement } }) => {
  const pathName = usePathname(); //exopalin the hooks
  console.log(pathName);
  const { link, label, icon } = navLink;
  //explain the good sides of next js link
  return (
    <Link
      className={`${
        pathName === link ? "text-rose-500" : " text-gray-50"
      } hover:text-rose-400 duration-150  font-[400] flex my-2  items-center gap-2`}
      href={link}
    >
      {React.cloneElement(icon, { className: "w-5 h-5" })}
      {label}
    </Link>
  );
};

export default NavLink;
