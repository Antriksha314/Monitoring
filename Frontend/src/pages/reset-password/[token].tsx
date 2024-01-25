import { PasswordProps } from "@/api/password/create-password";
import { useCreateResetPassword } from "@/api/password/reset-password";
import Input from "@/components/input/input";
import { BasicModal } from "@/components/modal/modal";
import { CreatePasswordSchema } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const ChangePasword = () => {
  const methods = useForm<PasswordProps>({
    resolver: yupResolver(CreatePasswordSchema),
  });
  const router = useRouter();

  const { handleSubmit } = methods;

  const { mutate: createResetPass } = useCreateResetPassword();


  const routerQuery = useRouter().query;
  const token = routerQuery.token as string;


  const onSubmit = (data: PasswordProps) => {
    createResetPass({...data, token});
  };

  return (
    <div>
      <BasicModal show={true} width="w-1/3">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="newPassword"
              label="New password"
              placeholder="Enter a new password"
            />
            <Input
              name="confirmNewPassword"
              label="Confirm new password"
              placeholder="Confirm new password"
            />
            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="bg-black px-3 py-1 rounded text-white border-none"
                >
                  {/* {creatingNewPassword ? <SmallLoader /> : "Create"} */}
                  Submit
                </button>

                <button
                  className="px-3 py-1 text-white bg-red-500 rounded border-none"
                  type="button"
                  onClick={() => router.back()}
                  // disabled
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </BasicModal>
      <ToastContainer />
    </div>
  );
};

export default ChangePasword;
