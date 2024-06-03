import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/otp");
  };

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-customBlue4 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="flex flex-col justify-center items-center text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-customBlue2">AirSeat</h1>
          <p className="text-lg md:text-2xl text-customBlue2 mt-4">Your Traveling Partner</p>
        </div>
        <div className="hidden md:block absolute bottom-0 mb-10 md:mb-20">
          <img src={plantsImage} alt="Decoration" className="w-40 md:w-auto" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Phone</label>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <AiFillEyeInvisible size={24} />
                  ) : (
                    <AiFillEye size={24} />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-customBlue2 text-white py-2 rounded-md mt-12 flex items-center justify-center hover:bg-customBlue1"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <span
              className="text-customBlue2 hover:text-customBlue1 ml-2 font-bold cursor-pointer"
              onClick={handleSignIn}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
