import React, { useEffect, useState } from "react";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../images/logo_airseat.png";
import { changePassword } from "../services/resetPassword.service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Swal from "sweetalert2";
import FormValidation from "./FormValidation";
import Loading from "./Loading";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resend_at, code } = location.state || {};
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (!email || !code) {
      navigate(-1);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResetPassword = async () => {
    setPasswordError("");
    setConfirmPasswordError("");

    let valid = true;

    if (!newPassword) {
      setPasswordError("Password is required");
      valid = false;
    } else if (newPassword !== confirmNewPassword) {
      setPasswordError("Password & Confirm Password do not match");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmNewPassword) {
      setConfirmPasswordError("Confirm Password is required");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!valid) {
      return;
    }

    setIsFetching(true);

    const reqBody = JSON.stringify({
      email: email,
      password: newPassword,
      confirm_password: confirmNewPassword,
      code: code,
    });
    try {
      const response = await changePassword(reqBody);
      if (response) {
        Swal.fire({
          title: response.message,
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
      }
    } catch (err) {
      if (err.message === "OTP Code is wrong") {
        navigate("/reset-password/otp", {
          state: {
            email: email,
            resend_at: resend_at,
            error_message: err.message,
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
        <ToastContainer />
        <div className="flex-1 bg-customBlue4 flex flex-col justify-center items-center p-4 md:p-0 hidden md:flex">
          <div className="flex flex-col justify-center items-center text-center md:text-left">
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
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">
              Reset Password
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 mt-1 flex items-center cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {passwordVisible ? (
                    <AiFillEyeInvisible size={24} />
                  ) : (
                    <AiFillEye size={24} />
                  )}
                </div>
              </div>
              {passwordError && <FormValidation errorMessage={passwordError} />}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 mt-1 flex items-center cursor-pointer text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {confirmPasswordVisible ? (
                    <AiFillEyeInvisible size={24} />
                  ) : (
                    <AiFillEye size={24} />
                  )}
                </div>
              </div>
              {confirmPasswordError && (
                <FormValidation errorMessage={confirmPasswordError} />
              )}
            </div>
            <button
              disabled={isFetching}
              onClick={handleResetPassword}
              className="w-full bg-customBlue2 text-white py-2 mt-10 rounded-md flex items-center justify-center hover:bg-customBlue1"
            >
              {isFetching && <Loading />}
              {!isFetching && "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
