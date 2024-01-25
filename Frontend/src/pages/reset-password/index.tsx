import { useResetPasswordLink } from "@/api/password/reset-password";
import Input from "@/components/input/input";
import { BasicModal } from "@/components/modal/modal";
import { EmailValidate } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

interface resetPasswordProps {
  email: string;
}

const ResetPasswordLink = () => {
  const methods = useForm<resetPasswordProps>({
    resolver: yupResolver(EmailValidate),
  });
  const router = useRouter();

  const { handleSubmit } = methods;

  const { mutate: resetPassLink } = useResetPasswordLink();

  const onSubmit = (data: { email: string }) => {
    resetPassLink(data);
  };

  return (
    <>
      <BasicModal show={true} width="w-1/3">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name="email" label="Email" placeholder="Enter email" />
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
    </>
  );
};

export default ResetPasswordLink;
