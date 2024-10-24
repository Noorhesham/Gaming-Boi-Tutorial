"use client";
import { protect } from "@/app/actions/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data: user, isLoading } = useQuery({
    queryFn: async () => protect(),
    queryKey: ["user"],
  });
  return { user, isLoading };
};
