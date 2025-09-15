"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (formData: FieldValues) => {
 try {
    const {data} = await axiosInstance.post("/auth/register", formData);

    if(data.success){
      (await cookies()).set("accessToken", data.data.accessToken);
      (await cookies()).set("refreshToken", data.data.refreshToken);
    }
 } catch (error: any) {
    throw new Error(error.message || "Registration failed");
 }   
}