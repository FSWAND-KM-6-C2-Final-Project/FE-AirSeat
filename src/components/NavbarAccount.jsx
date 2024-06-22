import React, { useState, useEffect } from "react";
import { FiUser, FiBell, FiList } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavbarAccount = () => {
  const [activePage, setActivePage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

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

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <div className="bg-gray-100">
        <header className="bg-white shadow-md p-3">
          <div className="max-w-8xl mx-auto flex justify-between items-center">
            <a href="/" className="text-customBlue1 text-xl font-bold">
              AirSeat
            </a>
            <div className="flex space-x-4">
              {token && (
                <>
                  <button onClick={() => setActivePage("list")}>
                    <a href="/list">
                      <FiList
                        className={
                          activePage === "list"
                            ? "text-customBlue2"
                            : "text-black"
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
                          activePage === "profile"
                            ? "text-customBlue2"
                            : "text-black"
                        }
                        size={20}
                      />
                    </a>
                  </button>
                </>
              )}
              {!token && (
                <>
                  <button
                    onClick={handleNavigateSignIn}
                    className="bg-customBlue1 px-5 py-2 flex items-center text-white rounded-xl shadow-md"
                  >
                    <FaSignInAlt className="mr-2" />
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavbarAccount;
