"use client";
import { FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormInput = ({ name, label, type }: { name: string; label: string; type: "text" | "password" | "email" }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className=" text-white ">
          <FormLabel className="  text-gray-100 text-base">{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={`Enter ${label}`} {...field} />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage className=" font-semibold text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
