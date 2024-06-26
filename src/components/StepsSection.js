import React from "react";
import { useLocation } from "react-router-dom";

const StepsSection = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex justify-start my-10 pl-5 sm:pl-[280px]">
      <div className="flex items-center space-x-4 text-sm">
        <span
          className={`font-bold text-sm sm:text-xl ${
            currentPath === "/booking" ? "text-black" : "text-gray-500"
          }`}
        >
          Order Data
        </span>
        <span className="text-gray-500">{">"}</span>
        <span
          className={`font-bold text-sm sm:text-xl ${
            currentPath === "/payment" ? "text-black" : "text-gray-500"
          }`}
        >
          Payment
        </span>
        <span className="text-gray-500">{">"}</span>
        <span
          className={`font-bold text-sm sm:text-xl ${
            currentPath === "/payment-success" ? "text-black" : "text-gray-500"
          }`}
        >
          Complete
        </span>
      </div>
    </div>
  );
};

export default StepsSection;
