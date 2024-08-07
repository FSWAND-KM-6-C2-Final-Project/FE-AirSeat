import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { ToastContainer, toast, Bounce } from "react-toastify";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";

const OTPInputResetPassword = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const navigate = useNavigate();
  const location = useLocation();
  const { email, resend_at, error_message } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const initialTimer = Math.max(dayjs(resend_at).diff(dayjs(), "second"), 0);
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    if (error_message) {
      toast.error(error_message, {
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
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otpInput${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    navigate("/reset-password", {
      state: {
        code: otp.join(""),
        email: email,
        resend_at: resend_at,
      },
    });
  };

  const handleResend = async () => {
    try {
      const response = await fetch(
        "https://airseat.akbarrahmatm.my.id/api/v1/auth/password-reset/resend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to resend OTP");
      }

      toast.success("OTP has been resent. Please check your email.", {
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
      setTimer(60);
    } catch (error) {
      toast.error(error.message, {
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
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center px-4">
        <ToastContainer />
        <div className="flex items-center w-full max-w-md mb-2 mt-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none mr-4"
          >
            <IoArrowBackOutline className="h-6 w-6" />
          </button>
          <h2 className="flex-grow text-2xl font-bold text-gray-900">
            Verification Code
          </h2>
        </div>
        <p className="mt-5 text-center text-sm text-gray-600">
          We have sent the verification code to <strong>{email}</strong>
        </p>
        <div className="mt-4 mb-8 space-y-6 w-full max-w-md">
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 border border-gray-300 rounded-2xl mt-5 mb-2 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-customBlue2"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                id={`otpInput${index}`}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {timer > 0 ? (
              <p className="text-gray-600">
                Resend OTP in <strong>{timer}s</strong>
              </p>
            ) : (
              <p className="text-gray-600">
                Didn’t receive the code?{" "}
                <button
                  type="button"
                  className="text-customBlue2 hover:text-customBlue1"
                  onClick={handleResend}
                >
                  <strong>Resend Code</strong>
                </button>
              </p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSubmit}
              className="w-full mt-10 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-customBlue2 hover:bg-customBlue1"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPInputResetPassword;
