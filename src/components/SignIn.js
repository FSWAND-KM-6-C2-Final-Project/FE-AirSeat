import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailOrPhone,
          password: password,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      const token = data.token;
      localStorage.setItem("token", token);
      // Navigate to home page or dashboard
      navigate("/");
    } else {
      // Handle error
      console.error(data);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleGoogleSignIn = () => {
    // Add your Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-customBlue4 flex flex-col justify-center items-center p-4 md:p-0">
        <div className="flex flex-col justify-center items-center text-center md:text-left">
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
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">
            Sign In
          </h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">
                Email or Phone
              </label>
              <input
                type="email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email/Phone"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
              />
            </div>
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
              <span
                className="text-sm text-customBlue2 hover:text-customBlue1 font-bold float-right mb-10 mt-3 cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-customBlue2 text-white py-2 rounded-md flex items-center justify-center hover:bg-customBlue1"
            >
              Sign In
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-100"
          >
            <FcGoogle size={24} className="mr-2" />
            Continue with Google
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <span
              className="text-customBlue2 hover:text-customBlue1 ml-2 font-bold cursor-pointer"
              onClick={handleSignUp}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
