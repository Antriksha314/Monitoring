import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 px-4 py-8 fixed left-0 top-[56px]">
      <ul>
        <li className="text-white mb-2 hover:text-gray-300 cursor-pointer">
          <Link className="link link-hover mt-2" href={"/admin/dashboard"}>
            Invite
          </Link>
        </li>
        <li className="text-white mb-2 hover:text-gray-300 cursor-pointer">
          <Link
            className="link link-hover mt-2"
            href={"/admin/dashboard/users"}
          >
            Users
          </Link>
        </li>
        <li className="text-white mb-2 hover:text-gray-300 cursor-pointer">
          <Link
            className="link link-hover mt-2"
            href={"/admin/dashboard/user-bucket"}
          >
            Bucket
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
