import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setShowNotification(true);
      } else {
        console.error("Passwords do not match.");
      }
    } else {
      console.error("Please fill in both fields.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:flex-1 bg-customBlue4 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-customBlue2">
            AirSeat
          </h1>
          <p className="text-xl md:text-2xl text-customBlue2 mt-4">
            Your Traveling Partner
          </p>
        </div>
        <div className="absolute bottom-0 mb-20 hidden md:block">
          <img src={plantsImage} alt="Decoration" className="max-w-full" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            </div>
            <button
              type="submit"
              className="w-full bg-customBlue2 text-white py-2 rounded-md flex items-center justify-center hover:bg-customBlue1"
            >
              Save
            </button>
          </form>
          {showNotification && (
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
          )}
          {showNotification && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg z-20">
              <p>Password successfully reset!</p>
              <button
                onClick={() => navigate("/sign-in")}
                className="bg-customBlue2 hover:bg-customBlue1 text-white px-4 py-2 rounded-md mt-4"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
