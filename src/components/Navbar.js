import React from "react";
import { FaSearch, FaBell, FaUser, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-white-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">AirSeat</h1>
        </div>
        <div className="absolute mx-20">
          <input
            type="text"
            placeholder="Cari di sini..."
            className="w-64 py-1 pl-3 pr-8 text-sm rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <FaSearch className="absolute top-0 right-0 mt-2 mr-3 text-gray-500 pointer-events-none text-sm" />
        </div>

        <div className="flex items-center space-x-4">
          <FaBars className="text-gray-500 cursor-pointer hover:text-gray-700" />
          <FaBell className="text-gray-500 cursor-pointer hover:text-gray-700" />
          <FaUser className="text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
