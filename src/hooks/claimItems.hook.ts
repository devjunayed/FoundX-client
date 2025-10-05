import { useMutation } from "@tanstack/react-query"
import { createClaimItems } from "../services/ClaimItems"
import { toast } from "sonner"
import { FieldValues } from "react-hook-form"

export const useCreateClaimRequest = () => {
    return  useMutation<any, Error, FieldValues>({
        mutationKey: ["CREATE_CLAIM_REQUEST"],
        mutationFn: async (data) => await createClaimItems(data),
        onError: (error: any) => {
            console.log(error)
            toast.error("Something is wrong!")
        }
    })
}