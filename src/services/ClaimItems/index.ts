"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createClaimItems = async (fieldData: any) => {
  try {
    const { data } = await axiosInstance.post("/claim-request", fieldData);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
