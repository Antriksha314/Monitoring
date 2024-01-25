import axios from "axios"
import { useQuery } from "react-query"
import { BASE_URL } from "./get-users"


const fetchBucket = async () => {
    const requestOption = {
        method: 'GET',
        url: BASE_URL + 'get-bucket',
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

export const useGetBucket = () => {
    return useQuery({
        queryKey: ['get-bucket'],
        queryFn: () => fetchBucket(),
    })
}