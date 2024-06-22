import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Logo from "../images/logo_airseat.png";
import { signIn } from "../services/auth.service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Loading from "./Loading";
import FormValidation from "./FormValidation";

const SignIn = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async () => {
    setEmailError("");
    setPasswordError("");

    let valid = true;
    if (!emailOrPhone) {
      setEmailError("Email or Phone is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    setIsFetching(true);

    try {
      const reqBody = JSON.stringify({
        email: emailOrPhone,
        password: password,
      });

      const response = await signIn(reqBody);

      const token = response.token;

      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
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
    setIsFetching(false);
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-customBlue4 flex flex-col justify-center items-center p-4 md:p-0">
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
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">
            Sign In
          </h2>
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
            {emailError && <FormValidation errorMessage={emailError} />}
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
            {passwordError && <FormValidation errorMessage={passwordError} />}

            <span
              className="text-sm text-customBlue2 hover:text-customBlue1 font-bold float-right mb-10 mt-3 cursor-pointer"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </span>
          </div>
          <button
            disabled={isFetching}
            onClick={handleSignIn}
            className="w-full bg-customBlue2 text-white py-2 rounded-md flex items-center justify-center hover:bg-customBlue1"
          >
            {isFetching && <Loading />}
            {!isFetching && "Sign In"}
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
