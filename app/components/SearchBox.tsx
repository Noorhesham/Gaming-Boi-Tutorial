import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBox = () => {
  return (
    <div className=" flex w-[40%] items-center bg-[#333839]  border-input border-2 justify-between px-4 rounded-2xl py-2">
      <input
        placeholder="Seach"
        className=" bg-transparent text-gray-50  border-none   outline-none active:outline-none ring-0 placeholder:text-gray-400"
        type="text"
      />
      <SearchIcon />
    </div>
  );
};

export default SearchBox;
