import React, { useState } from "react";
import { FaSearch, FaBell, FaUser, FaBars } from "react-icons/fa";

const NavbarBook= () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      status: "Unpaid",
      date: "20 Maret, 14:04",
      message: "Selesaikan pembayaran Anda sebelum tanggal 10 Maret 2023!",
    },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const clearNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div>
      <div className="bg-white shadow-md">
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
            <div className="relative">
              <FaBell
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-10">
                  {notifications.length === 0 ? (
                    <div className="text-gray-500 text-sm">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex justify-between items-start mb-2"
                      >
                        <div className="flex">
                          <div className="flex-shrink-0 pt-1">
                            <FaBell className="text-purple-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-700">
                              Status Pembayaran ({notification.status})
                            </div>
                            <div className="text-sm text-gray-500">
                              {notification.date}
                            </div>
                            <div className="mt-1 text-sm text-gray-800">
                              {notification.message}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => clearNotification(notification.id)}
                          className="ml-4 text-gray-500 hover:text-gray-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <FaUser className="text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBook;
