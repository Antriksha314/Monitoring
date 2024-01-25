import axios from "axios"
import { useRouter } from "next/router";
import { useMutation } from "react-query"
import { BASE_URL } from "../get-users"
import { toast } from "react-toastify";

export interface PasswordProps {
    newPassword: string;
    confirmNewPassword: string;
}

export interface TokenProp extends PasswordProps {
    token: string
}

const createPassword = async (body: TokenProp) => {
    const requestOption = {
        method: 'POST',
        url: `${BASE_URL}password/set/${body.token}`,
        headers: {
            "Content-type": "application/json"
        },
        data: JSON.stringify({ newPassword: body.newPassword, confirmNewPassword: body.confirmNewPassword })
    }

    try {
        const { data } = await axios(requestOption)
        return data
    } catch (error: any) {
        return toast.error(error?.response?.data?.message)
    }
}

export const useCreatePassword = () => {
    const { push } = useRouter()
    return useMutation(((reqOption: TokenProp) => createPassword(reqOption)), {
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message, { autoClose: 2000 })
                setTimeout(() => {
                    push("/")
                }, 2000)
            }
        }
    })
}