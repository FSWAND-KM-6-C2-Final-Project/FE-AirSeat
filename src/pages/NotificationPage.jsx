import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAccount from "../components/NavbarAccount";
import Notification from "../components/Notification";
import { getUser } from "../services/auth.service";

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
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!token) {
      navigate("/");
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
    </>
  );
};

export default NotificationPage;
