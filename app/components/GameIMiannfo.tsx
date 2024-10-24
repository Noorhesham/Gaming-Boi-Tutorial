import React from "react";
import MotionItem from "./defaults/MotionItem";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "../styles/cyberBunk.scss";
const GameIMiannfo = ({
  paragraph,
  title,
  image,
  btnClasses,
  cyperBunk,
}: {
  paragraph: string;
  title: string;
  image: string;
  btnClasses?: string;
  cyperBunk?: boolean;
}) => {
  return (
    <MotionItem
      nohover
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
      className=" max-w-lg items-start w-full absolute z-10 top-20  left-20 flex flex-col gap-3"
    >
      <div className=" w-96 h-40 relative">
        <Image
          src={image}
          alt="poster"
          className=" w-full h-full object-contain object-top rounded-2xl  inset-0"
          fill
        />
      </div>
      <h1 className=" font-semibold text-xl lg:text-2xl">{title}</h1>
      <p>{paragraph}</p>
      {cyperBunk ? (
        <button className={` ${btnClasses}`}> Find out more !</button>
      ) : (
        <Button className={` ${btnClasses} rounded-full`}>Find out more !</Button>
      )}
    </MotionItem>
  );
};

export default GameIMiannfo;
