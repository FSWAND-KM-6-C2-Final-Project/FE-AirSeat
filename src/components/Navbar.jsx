import React, { useState, useEffect } from "react";
import { FiUser, FiBell, FiList } from "react-icons/fi";

const Navbar = () => {
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
      setActivePage("home");
    } else if (currentPath === "/list") {
      setActivePage("list");
    } else if (currentPath === "/notification") {
      setActivePage("notification");
    } else if (currentPath === "/profile") {
      setActivePage("profile");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow-md p-3">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <a href="/" className="text-customBlue1 text-xl font-bold">
            AirSeat
          </a>
          <div className="flex space-x-4">
            <button onClick={() => setActivePage("list")}>
              <a href="/list">
                <FiList
                  className={
                    activePage === "list" ? "text-customBlue2" : "text-black"
                  }
                  size={20}
                />
              </a>
            </button>
            <button onClick={() => setActivePage("notification")}>
              <a href="/notification">
                <FiBell
                  className={
                    activePage === "notification"
                      ? "text-customBlue2"
                      : "text-black"
                  }
                  size={20}
                />
              </a>
            </button>
            <button onClick={() => setActivePage("profile")}>
              <a href="/profile">
                <FiUser
                  className={
                    activePage === "profile" ? "text-customBlue2" : "text-black"
                  }
                  size={20}
                />
              </a>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
