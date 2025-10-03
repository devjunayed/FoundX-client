import { useMutation } from "@tanstack/react-query"
import { createPost } from "../services/Post"
import { toast } from "sonner"

export const useCreatePost = () => {
    return useMutation<any, Error, FormData>({
        mutationKey: ["CREATE_POST"], 
        mutationFn: async(postData) => await createPost(postData),
        onSuccess: () => {
            toast.success("Post create successfully");
        },
        onError: (error: any) => {
            toast.error(error.message)
        }
    })
}