import { registerUser } from "@/pages/admin/dashboard"
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { BASE_URL } from "./get-users"

const registerUser = async (body: registerUser) => {
    let token = '';
    if (typeof window !== "undefined") {
        token = localStorage.getItem('accessToken') as string
    }

    const requestOption = {
        method: 'POST',
        url: BASE_URL + 'register',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        data: JSON.stringify(body),
    }

    try {
        const { data } = await axios(requestOption)
        return data
    } catch (error) {
        return error
    }
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation(((reqOption: registerUser) => registerUser(reqOption)), {
        onSuccess: () => {
            queryClient.invalidateQueries('get-users')
        }
    })
}