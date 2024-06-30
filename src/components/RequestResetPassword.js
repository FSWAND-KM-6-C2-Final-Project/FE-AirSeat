import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import FormValidation from "./FormValidation";
import validator from "validator";
import Logo from "../images/logo_airseat.png";
import { requestReset } from "../services/resetPassword.service";
import Loading from "./Loading";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleRequestReset = async () => {
    setEmailError("");

    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validator.isEmail(email)) {
      setEmailError("Email format is not correct");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!valid) {
      return;
    }

    setIsFetching(true);

    try {
      const reqBody = JSON.stringify({
        email,
      });

      const response = await requestReset(reqBody);

      navigate("/reset-password/otp", {
        state: {
          email: response.data.email,
          resend_at: response.data.reset_password_resend_at,
        },
      });
    } catch (err) {
      if (
        err.message ===
        "Your reset password is exist, if your OTP is expired please resend it"
      ) {
        navigate("/reset-password/otp", {
          state: {
            email,
          },
        });
      } else {
        toast.error(err.message, {
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
      }
    }

    setIsFetching(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 bg-customBlue4 flex flex-col justify-center items-center p-4 md:p-0 hidden md:flex">
          <div className="flex flex-col justify-center items-center text-center md:text-left">
            <ToastContainer />
            <img className="w-[200px] mb-3" src={Logo} />
            <h1 className="text-4xl md:text-5xl font-bold text-customBlue2">
              AirSeat
            </h1>
            <p className="text-lg md:text-2xl text-customBlue2 mt-4">
              Your Traveling Partner
            </p>
          </div>
          <div className="absolute bottom-0 mb-10 md:mb-20 hidden md:block">
            <img src={plantsImage} alt="Decoration" />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-0">
          <div className="w-full max-w-md px-4 md:px-8">
            <div className="md:hidden flex items-center mb-8">
              <img className="w-[50px]" src={Logo} />
              <h1 className="text-3xl font-bold text-customBlue2 ml-2">
                AirSeat
              </h1>
            </div>
            <h2 className="text-xl font-bold mb-4">Reset Password Request</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 mb-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
              />
              {emailError && <FormValidation errorMessage={emailError} />}
            </div>
            <button
              onClick={handleRequestReset}
              className="w-full bg-customBlue2 text-white py-2 rounded-md flex items-center justify-center hover:bg-customBlue1"
            >
              {isFetching && <Loading />}
              {!isFetching && "Reset My Password"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestResetPassword;
