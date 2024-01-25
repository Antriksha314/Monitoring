import { decodeToken } from "@/utils/token";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BASE_URL } from "./get-users";

interface LoginProps {
  email: string;
  password: string;
}

const loginUser = async (body: LoginProps) => {
  const requestOption = {
    method: "POST",
    url: BASE_URL + "login",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(body),
  };

  try {
    const { data } = await axios(requestOption);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation((reqOption: LoginProps) => loginUser(reqOption), {
    onSuccess: async (data) => {
      if (data && data.success && typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.data.token);
        await decodeToken(data.data.token).then(async (res: any) => {
          if (res && res?.role === "user") {
            push("/coming-soon");
          } else if (res && res?.role === "admin") {
            push("/admin/dashboard");
          }
        });
        queryClient.invalidateQueries("get-users");
      } else {
        toast.error(data.message);
      }
    },
  });
};
