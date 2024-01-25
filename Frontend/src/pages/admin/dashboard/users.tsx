import Sidebar from "../../../components/sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useGetUsers } from "@/api/get-users";
import { SmallLoader } from "@/utils/loader";
import withAuth from "@/utils/authentication";
import { Header } from "@/components/header/header";

const UserList = () => {
  const { data: users, isLoading: gettingUsers } = useGetUsers();
  const filteredUsres =
    users?.data?.users?.length > 0 &&
    users.data.users.filter((user: any) => user.status === "approved");
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-[86%] p-6 ml-auto pt-20">
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
                </tr>
              </thead>
              <tbody>
                {gettingUsers ? (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <SmallLoader />
                    </td>
                    <td className="px-6 py-4">
                      <SmallLoader />
                    </td>
                    <td className="px-6 py-4">
                      <SmallLoader />
                    </td>
                    <td className="px-6 py-4">
                      <SmallLoader />
                    </td>
                    <td className="px-6 py-4">
                      <SmallLoader />
                    </td>
                  </tr>
                ) : (
                  <>
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
                          <td className="px-6 py-4">{d.status}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default withAuth(UserList);
