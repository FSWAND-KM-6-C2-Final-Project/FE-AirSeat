import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            email: email,
            phone_number: phoneNumber,
            password: password,
            confirm_password: confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      alert("Registration successful! Please log in.");
      navigate("/otp");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-customBlue4 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-customBlue2">AirSeat</h1>
          <p className="text-2xl text-customBlue2 mt-4">
            Your Traveling Partner
          </p>
        </div>
        <div className="absolute bottom-0 mb-20">
          <img src={plantsImage} alt="Decoration" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-bold mb-7">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Phone</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone"
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
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
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
