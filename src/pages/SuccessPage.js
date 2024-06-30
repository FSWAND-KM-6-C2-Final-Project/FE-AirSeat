import React, { useEffect, useState } from "react";
import PaymentSuccess from "../components/PaymentSuccess";
import StepsSection from "../components/StepsSection";
import UserNavbar from "../components/NavbarAccount";
import { getUser } from "../services/auth.service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const SuccessPage = () => {
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
        if (err.message === "jwt malformed" || err.message === "jwt expired") {
          localStorage.removeItem("token");
        }
      }
    };

    if (!token) {
      navigate("/restricted");
    } else {
      checkUser();
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div>
      <Title text={"Payment Success"} />
      <UserNavbar />
      <StepsSection />
      <PaymentSuccess />
    </div>
  );
};

export default SuccessPage;
