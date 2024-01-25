import { withAuthUser } from "@/utils/authentication";
import React from "react";

const CommingSoon = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-5xl text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-green-500 py-3">
        Coming Soon
      </p>
    </div>
  );
};

export default withAuthUser(CommingSoon);
