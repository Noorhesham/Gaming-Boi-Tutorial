import SignUp from "@/app/components/forms/Signup";
import React from "react";

const page = () => {
  return (
    <section
      style={{
        backgroundImage: "url(/bg2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      className=" flex  h-full py-10 items-center justify-center w-full"
    >
      <SignUp />
    </section>
  );
};

export default page;
