import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../services/AuthService"
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