import Login from "@/app/components/forms/Login";
import React from "react";

const page = () => {
  return (
    <section
      style={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className=" flex  h-screen items-center justify-center w-full"
    >
      <Login />
    </section>
  );
};

export default page;
