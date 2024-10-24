"use client";
import React, { useTransition } from "react";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Logo from "../defaults/Logo";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signup } from "@/app/actions/auth"; // Update action to handle signup
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FormInput from "../inputs/FormInput";
import ButtonGame from "../defaults/ButtonGame";
import MotionItem from "../defaults/MotionItem";
import Link from "next/link";
import { FileUploadDemo } from "../inputs/FileUpload";
import { GridPattern } from "../ui/file-upload";

// Update schema for signup
const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password is too short, min is 6 characters" }),
    confirmPassword: z.string().min(6),
    avatar: z.any(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // set the error path to confirmPassword field
  });

const SignUp = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });
  const [serverError, setServerError] = React.useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    console.log(data);
    if (data.avatar) {
      const formData = new FormData();
      formData.append("file", data.avatar[0]);
      // Ensure you're using the correct environment variable for the upload preset
      formData.append("upload_preset", "ml_default");

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
          method: "POST",
          body: formData,
        });

        console.log(res);
        if (!res.ok) {
          const errorResponse = await res.json(); // Show Cloudinary error details
          console.error("Cloudinary Error:", errorResponse);
          throw new Error("Failed to upload photo");
        }

        const cloudinaryData = await res.json();
        data.avatar = {
          secure_url: cloudinaryData.secure_url,
          public_id: cloudinaryData.public_id,
        };
      } catch (error) {
        console.error("Photo upload failed:", error);
        return;
      }
    }

    startTransition(async () => {
      const res = await signup(data);
      console.log(res);
      if (res?.success) {
        toast.success(res.success);
        router.push("/login");
      }
      if (res?.error) setServerError(res.error);
    });
  };

  return (
    <MotionItem
      className="w-full"
      nohover
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
    >
      <MaxWidthWrapper className="h-[90%] relative  lg:w-[60%] xl:w-[40%] w-full flex items-center justify-center border border-rose-400 rounded-2xl bg-black/80">
        <div className="flex  flex-col w-full py-5 px-10 items-center justify-center">
          <Logo />
          <Form {...form}>
            {/* Prevents default form submission */}
            <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FileUploadDemo name="avatar" />
              <FormInput name="name" type="text" label="Name" />
              <FormInput name="email" type="email" label="Email" />
              <FormInput name="password" type="password" label="Password" />
              <FormInput name="confirmPassword" type="password" label="Confirm Password" />
              <ButtonGame disabled={isPending} text="Signup" onClick={form.handleSubmit(onSubmit)} />
            </form>
            {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
          </Form>
          <div className="flex items-center mt-6 gap-2">
            <p className="text-gray-50 text-nowrap">Already have an account?</p>
            <Link href="/login" className="text-rose-500 text-nowrap hover:underline duration-150">
              Login Here!
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default SignUp;
