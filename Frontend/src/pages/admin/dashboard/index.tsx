import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Sidebar from "../../../components/sidebar";
import { BasicModal } from "../../../components/modal/modal";
import Input from "../../../components/input/input";
import { inviteSchema } from "@/utils/schemas";
import { toast, ToastContainer } from "react-toastify";
import { useRegisterUser } from "@/api/add-user";
import { useGetUsers } from "@/api/get-users";
import { useReinviteUser } from "@/api/reinvite-user";
import { SmallLoader } from "../../../utils/loader";
import withAuth from "@/utils/authentication";
import { Header } from "@/components/header/header";

export type registerUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [userIndex, setUserIndex] = useState<number>(5);
  const {
    mutate: registerUser,
    data: userResponse,
    isLoading: registerLoading,
  } = useRegisterUser();

  const { data: users } = useGetUsers();
  const methods = useForm<registerUser>({
    resolver: yupResolver(inviteSchema),
  });

  const { mutate: reinviteUser, isLoading: reinviteLoading } =
    useReinviteUser();

  useEffect(() => {
    if (
      userResponse &&
      userResponse?.response &&
      !userResponse.response?.data?.success
    ) {
      toast.error(userResponse.response?.data?.message);
    } else {
      toast.success(userResponse?.response?.data?.message);
      setShowModal(false);
      reset();
    }
  }, [userResponse]);

  const { handleSubmit, reset } = methods;

  const filteredUsres =
    users?.data?.users.length > 0 &&
    users.data.users.filter((user: any) => user.status === "pending");

  const onSubmit = (data: registerUser) => {
    registerUser(data);
  };

  const reInviteHandler = (email: string, idx: number) => {
    setUserIndex(idx);
    reinviteUser({ email });
  };

  return (
    <>
    <Header/>
      <div className="flex">
        <Sidebar />
        <div className="w-[86%] ml-auto p-6 pt-20">
          <div className="flex justify-end mb-2">
            <button
              className="bg-black rounded-sm text-white text-sm py-1 px-3 mb-2 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Invite
            </button>
            <BasicModal show={showModal} width="w-1/3">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Input name="firstName" label="First name" />
                    <Input name="lastName" label="Last name" />
                    <Input name="email" label="Email" />
                    <Input name="phone" label="Phone" />
                  </div>
                  <div className="flex justify-end">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="submit"
                        className="bg-black px-3 py-1 rounded-sm text-white border-none"
                      >
                        {registerLoading ? <SmallLoader /> : "Add"}
                      </button>

                      <button
                        className="bg-red-500 px-3 py-1 rounded-sm text-white border-none cursor-pointer"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </BasicModal>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr. No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    First name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    last name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsres.length > 0 &&
                  filteredUsres.map((d: any, idx: number) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      key={idx}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-6 py-4">{d.firstName}</td>
                      <td className="px-6 py-4">{d.lastName}</td>
                      <td className="px-6 py-4">{d.email}</td>
                      <td className="px-6 py-4">
                        {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                      </td>
                      <td
                        className={`${
                          reinviteLoading ? "py-2" : "py-4"
                        } px-6 text-blue-500 cursor-pointer`}
                      >
                        <button
                          disabled={reinviteLoading}
                          onClick={() =>reInviteHandler(d.email, idx)}
                        >
                          {reinviteLoading && userIndex === idx ? (
                            <SmallLoader />
                          ) : (
                            "Reinvite"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Dashboard;

// export default withAuth(Dashboard);
