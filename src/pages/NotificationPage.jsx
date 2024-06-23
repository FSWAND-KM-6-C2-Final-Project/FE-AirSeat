import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAccount from "../components/NavbarAccount";
import Notification from "../components/Notification";
import { getUser } from "../services/auth.service";
import { ToastContainer, toast, Bounce } from "react-toastify";

const NotificationPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkUser = async () => {
      try {
        const response = await getUser(token);

        if (response) {
          setIsAuthenticated(true);
        } else {
          navigate("/restricted");
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
        localStorage.removeItem("token");
      }
    };

    if (!token) {
      navigate("/restricted");
    } else {
      checkUser();
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <>
      <NavbarAccount />
      <Notification />
      <ToastContainer />
    </>
  );
};

export default NotificationPage;
