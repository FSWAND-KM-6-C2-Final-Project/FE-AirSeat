import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { ToastContainer, toast, Bounce } from "react-toastify";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const OTPInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const navigate = useNavigate();
  const location = useLocation();
  const { email, resend_at } = location.state || {};

  const initialTimer = Math.max(dayjs(resend_at).diff(dayjs(), "second"), 0);
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    if (!email && !resend_at) {
      Swal.fire({
        title: "You don't have user activation request, please sign up first",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Sign Up",
        confirmButtonColor: "#447C9D",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-up");
        } else if (result.dismiss) {
          navigate("/sign-up");
        }
      });
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    try {
      const response = await fetch(
        "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/auth/activation/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: otpCode,
          }),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "OTP verification failed");
      }

      Swal.fire({
        title: resData.message,
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "Sign In",
        confirmButtonColor: "#447C9D",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        } else if (result.dismiss) {
          navigate("/sign-in");
        }
      });
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

  const handleResend = async () => {
    try {
      const response = await fetch(
        "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/auth/activation/resend",
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
      <form
        className="mt-4 mb-8 space-y-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
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
            type="submit"
            className="w-full mt-10 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-customBlue2 hover:bg-customBlue1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPInput;
