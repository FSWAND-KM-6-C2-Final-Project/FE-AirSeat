import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarBook = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://airseat.akbarrahmatm.my.id/api/v1/notification")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });

    axios
      .get("https://airseat.akbarrahmatm.my.id/api/v1/auth/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const clearNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-customBlue1">AirSeat</h1>
          </div>
          <div className="absolute mx-20">
            <input
              type="text"
              placeholder="Search here ..."
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
            <div className="flex items-center">
              {user && <span className="text-gray-700 mr-2">{user.name}</span>}
              <FaUser
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleProfileClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBook;
