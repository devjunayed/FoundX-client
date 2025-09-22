"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export const registerUser = async (formData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", formData);

    if (data.success) {
      (await cookies()).set("accessToken", data.data.accessToken);
      (await cookies()).set("refreshToken", data.data.refreshToken);
    }
  } catch (error: any) {
    throw new Error(error.message || "Registration failed");
  }
};
export const loginUser = async (formData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", formData);

    if (data.success) {
      (await cookies()).set("accessToken", data.data.accessToken);
      (await cookies()).set("refreshToken", data.data.refreshToken);
    }
  } catch (error: any) {
    throw new Error(error.message || "Registration failed");
  }
};

export const logoutUser = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  redirect("/login");
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      email: decodedToken?.email,
      mobileNumber: decodedToken?.mobileNumber,
      role: decodedToken?.role,
      status: decodedToken?.status,
      profilePhoto: decodedToken?.profilePhoto
    };
  }
  return decodedToken;
};
