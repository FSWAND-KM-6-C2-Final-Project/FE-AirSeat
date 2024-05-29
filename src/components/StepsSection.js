import React from "react";
import { useLocation } from "react-router-dom";

const StepsSection = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex justify-start my-10 pl-40">
      <div className="flex items-center space-x-4 text-sm">
        <span
          className={`font-medium ${
            currentPath === "/booking" ? "text-black" : "text-gray-500"
          }`}
        >
          Isi Data Diri
        </span>
        <span className="text-gray-500">{">"}</span>
        <span
          className={`font-medium ${
            currentPath === "/payment" ? "text-black" : "text-gray-500"
          }`}
        >
          Bayar
        </span>
        <span className="text-gray-500">{">"}</span>
        <span
          className={`font-medium ${
            currentPath === "/payment-success" ? "text-black" : "text-gray-500"
          }`}
        >
          Selesai
        </span>
      </div>
    </div>
  );
};

export default StepsSection;
