import axios from "axios"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { BASE_URL } from "./get-users"

interface ReinviteProp {
    email: string
}

const reinviteUser = async (body: ReinviteProp) => {
    const requestOption = {
        method: 'POST',
        url: BASE_URL + 'user/reinvite',
        headers: {
            "Content-type": "application/json"
        },
        data: JSON.stringify(body)
    }

    try {
        const { data } = await axios(requestOption)
        return data
    } catch (error) {
        return error
    }
}

export const useReinviteUser = () => {
    return useMutation(((reqOption: ReinviteProp) => reinviteUser(reqOption)), {
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        },
        onError: (error: any) => {
            toast.error(`Somthing went wrong: ${error.message}`)
        }
    })
}