"use client";
import React from "react";
import SearchBox from "../SearchBox";
import { Button } from "@/components/ui/button";
import ButtonGame from "../defaults/ButtonGame";
import { useGetUser } from "@/lib/queryFns";
import { Skeleton } from "@/components/ui/skeleton";
import User from "../User";

const NavBar = () => {
  const { user, isLoading } = useGetUser();
  console.log(user);
  return (
    <nav className=" w-full sticky inset-0">
      <header className=" flex items-center gap-5">
        <SearchBox />
        <div className=" ml-auto flex items-center gap-5">
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : !user.data ? (
            <>
              <ButtonGame link="/login" text="Login" />
              <ButtonGame link="/signup" text="Register" />
            </>
          ) : (
            <User user={user.data} />
          )}
        </div>
      </header>
    </nav>
  );
};

export default NavBar;
