import axios from "axios"
import { useQuery } from "react-query"

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const fetchUsers = async () => {
    const requestOption = {
        method: 'GET',
        url: BASE_URL + 'users/get',
        headers: {
            "Content-type": "application/json"
        }
    }

    try {
        const { data } = await axios(requestOption)
        return data
    } catch (error) {
        return error
    }
}

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['get-users'],
        queryFn: () => fetchUsers(),
    })
}