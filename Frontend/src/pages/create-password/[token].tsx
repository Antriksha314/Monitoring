import { PasswordProps, useCreatePassword } from "../../api/password/create-password";
import { CreatePasswordSchema } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { SmallLoader } from "@/utils/loader";
import { BasicModal } from "@/components/modal/modal";
import Input from "@/components/input/input";

const CreatePassword = () => {
  const [showModal, setShowModal] = useState(true);

  const methods = useForm<PasswordProps>({
    resolver: yupResolver(CreatePasswordSchema),
  });

  const routerQuery = useRouter().query;
  const token = routerQuery.token as string;

  const { mutate: CreatePassword, isLoading: creatingNewPassword } =
    useCreatePassword();

  const { handleSubmit } = methods;

  const onSubmit = (data: PasswordProps) => {
    CreatePassword({ ...data, token: token });
  };

  return (
    <div>
      <BasicModal show={showModal} width="w-1/3">
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
                  className="bg-black px-3 py-1 rounded-sm text-white border-none"
                >
                  {creatingNewPassword ? <SmallLoader /> : "Create"}
                </button>

                <button
                  className="px-3 py-1 text-white bg-red-300 rounded focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled
                >
                  Close
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

export default CreatePassword;
