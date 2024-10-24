import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({ className, text }: { className?: string; text: string }) => {
  return <h1 className={cn("lg:text-4xl text-2xl font-semibold text-white", className)}>{text}</h1>;
};

export default Heading;
