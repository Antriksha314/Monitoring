import Input from "../input/input";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUser } from "../../api/login";
import { ToastContainer } from "react-toastify";
import { SmallLoader } from "@/utils/loader";

const loginSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
});

export const Login = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { handleSubmit } = methods;

  const { mutate: loginUser, isLoading: loginLoader } = useLoginUser();

  const onSubmit = async (data: any) => {
    loginUser(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex ">
          <div className="flex-1">
            <Image src="/login.png" width={500} height={500} alt={"test"} />
          </div>
          <div className="flex-1 p-10">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  Login
                </h2>
                <div className="space-y-4">
                  <Input label="Email" name="email" />
                  <Input label="Password" type="password" name="password" />
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    className="bg-gray-500 px-3 py-2 border-none rounded-sm text-white mt-2"
                    type="submit"
                  >
                    {loginLoader ? <SmallLoader /> : "Log in"}
                  </button>
                  <Link href={"/reset-password"} className="text-blue-500">
                    Reset password
                  </Link>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
