import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className=" text-white text-3xl font-medium flex items-center ">
      GAME <span className="text-rose-500 ml-2 "> BOI</span>
    </Link>
  );
};

export default Logo;
