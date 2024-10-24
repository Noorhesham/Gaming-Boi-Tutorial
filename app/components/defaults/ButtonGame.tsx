import { Button } from "@/components/ui/button";
import React, { ReactElement } from "react";
import ButtonSvg from "../ButtonSvg";
import Link from "next/link";
import Spinner from "./Spinner";

const ButtonGame = ({
  className,
  text,
  onClick,
  icon,
  disabled,
  link,
  white,
}: {
  className?: string;
  text: string;
  onClick?: any;
  icon?: ReactElement;
  disabled?: boolean;
  link?: string;
  white?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className || ""} 
       px-7  inline-flex items-center hover:text-rose-500 font-[400] duration-150  justify-center h-11  relative`}
    >
      {ButtonSvg(white || false)}
      <span className=" relative">{disabled ? <Spinner /> : link ? <Link href={link}>{text}</Link> : text}</span>
      {icon}
    </button>
  );
};

export default ButtonGame;
