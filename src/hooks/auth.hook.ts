import { useMutation } from "@tanstack/react-query"
import { loginUser, registerUser } from "../services/AuthService"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_REGISTER"],
        mutationFn: async(userData: FieldValues) => await registerUser(userData),
        onSuccess: () => {
            // Handle successful registration
            console.log("User registered successfully");
            toast.success("Registration successful! Please log in.", {
                position: "bottom-center"
            });
        },  
       
    })
}
export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_LOGIN"],
        mutationFn: async(userData: FieldValues) => await loginUser(userData),
        onSuccess: () => {
            // Handle successful login
            console.log("User logged in successfully");
            toast.success("Login successful! Welcome back.", {
                position: "bottom-center"
            });
        },  
        onError: () => {
            // Handle login error
            console.log("User login failed");
            toast.error("Login failed. Please try again.", {
                position: "bottom-center"
            });
        },  
       
    })
}