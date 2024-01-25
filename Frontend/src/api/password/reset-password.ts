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

const resetPasswordLink = async (body: { email: string }) => {
    const requestOption = {
        method: 'POST',
        url: `${BASE_URL}user/reset/password-link`,
        headers: {
            "Content-type": "application/json"
        },
        data: JSON.stringify(body)
    }

    try {
        const { data } = await axios(requestOption)
        return data
    } catch (error: any) {
        return toast.error(error?.response?.data?.message)
    }
}

export const useResetPasswordLink = () => {
    const { push } = useRouter()
    return useMutation(((reqOption: { email: string }) => resetPasswordLink(reqOption)), {
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message, { autoClose: 2000 })
                setTimeout(() => {
                    push("/")
                }, 2000)
            } else {
                toast.error(data.message);
            }
        },
        onError: (error: any) => {
            toast.error(`Somthing went wrong: ${error.message}`)
        }
    })
}

const createResetPassword = async (body: TokenProp) => {
    console.log('body', body)
    const requestOption = {
        method: 'POST',
        url: `${BASE_URL}user/reset/password/${body.token}`,
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

export const useCreateResetPassword = () => {
    const { push } = useRouter()
    return useMutation(((reqOption: TokenProp) => createResetPassword(reqOption)), {
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message, { autoClose: 2000 })
                setTimeout(() => {
                    push("/")
                }, 2000)
            } else {
                toast.error(data.message);
            }
        },
        onError: (error: any) => {
            toast.error(`Somthing went wrong: ${error.message}`)
        }
    })
}

