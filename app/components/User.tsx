"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const User = ({ user, className }: { className?: string; user: any }) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar className={`${className || ""} w-14 h-14 relative gap-2`}>
        <AvatarImage className=" object-cover" src={user.avatar.secure_url} />
        <AvatarFallback>{user.firstName}</AvatarFallback>
      </Avatar>
      <div className=" flex items-start  flex-col">
        <h1 className="  text-white font-semibold text-base">{user.name}</h1>
        <p className="  text-sm text-gray-300">{user.email}</p>
      </div>
    </div>
  );
};

export default User;
