"use client";
import React, { useTransition } from "react";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Logo from "../defaults/Logo";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { login } from "@/app/actions/auth";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FormInput from "../inputs/FormInput";
import ButtonGame from "../defaults/ButtonGame";
import MotionItem from "../defaults/MotionItem";
import Link from "next/link";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: "Password is too short , min is 4 characters" }),
});
const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [serverError, setServerError] = React.useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const res = await login({
        email: data.email,
        password: data.password,
      });
      console.log(res);
      if (res?.success) router.push("/");
      if (res?.error) setServerError(res.error);
    });
  };
  return (
    <MotionItem
      className=" w-full"
      nohover
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
    >
      <MaxWidthWrapper className=" h-full lg:w-[60%] xl:w-[40%] w-full  w-full flex items-center justify-center border border-rose-400 rounded-2xl  bg-black/30">
        <div className="flex  flex-col  w-full py-5 px-10 items-center justify-center ">
          <Logo />
          <Form {...form}>
            {/*pervents default of form submission*/}
            <form className=" w-full flex flex-col  gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput type="text" name="email" label="Email" />
              <FormInput name="password" type="password" label="Password" />
              <ButtonGame disabled={isPending} text="Login" onClick={form.handleSubmit(onSubmit)} />
            </form>
            {serverError && <p className="text-red-500   mt-4">{serverError}</p>}
          </Form>
          <div className="flex items-center mt-6 gap-2">
            <p className="text-gray-50  text-nowrap">Don't have an account ?</p>
            <Link href="/signup" className="text-rose-500  text-nowrap hover:underline duration-150">
              Register here
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Login;
