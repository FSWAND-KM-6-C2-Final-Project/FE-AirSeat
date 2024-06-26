import React, { useState, useEffect } from "react";
import { FiUser, FiBell, FiList } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../services/auth.service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Logo from "../images/logo_airseat.png";

const NavbarAccount = () => {
  const [activePage, setActivePage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkUser = async () => {
      try {
        const response = await getUser(token);

        if (response) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        toast.error("Your session has expired, please log in again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        if (err.message === "jwt malformed" || err.message === "jwt expired") {
          localStorage.removeItem("token");
        }
      }
      setIsFetching(false);
    };

    if (token) {
      checkUser();
    } else {
      setIsFetching(false);
    }

    const currentPath = window.location.pathname;
    setActivePage(currentPath.slice(1));
  }, []);

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow-md p-3">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <Link
            className="text-customBlue1 flex items-end text-xl font-bold"
            to={"/"}
          >
            <img className="h-[2rem] mr-1" src={Logo} alt="Logo" />
            AirSeat
          </Link>
          <ToastContainer />
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <button onClick={() => setActivePage("list")}>
                  <Link to={"/order-history"}>
                    <FiList
                      className={
                        activePage === "order-history"
                          ? "text-customBlue2"
                          : "text-black"
                      }
                      size={20}
                    />
                  </Link>
                </button>
                <button onClick={() => setActivePage("notification")}>
                  <Link to={"/notification"}>
                    <FiBell
                      className={
                        activePage === "notification"
                          ? "text-customBlue2"
                          : "text-black"
                      }
                      size={20}
                    />
                  </Link>
                </button>
                <button onClick={() => setActivePage("profile")}>
                  <Link to={"/profile"}>
                    <FiUser
                      className={
                        activePage === "profile"
                          ? "text-customBlue2"
                          : "text-black"
                      }
                      size={20}
                    />
                  </Link>
                </button>
              </>
            ) : (
              <button
                onClick={handleNavigateSignIn}
                className="bg-customBlue1 px-5 py-2 flex items-center text-white rounded-xl shadow-md"
              >
                <FaSignInAlt className="mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarAccount;
