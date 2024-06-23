import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../images/logo_airseat.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Loading from "./Loading";
import FormValidation from "./FormValidation";
import { signUp } from "../services/auth.service";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Form Error state
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    let valid = true;
    if (!fullName) {
      setFullNameError("Full name is required");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required");
      valid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password !== confirmPassword) {
      setPasswordError("Password & Confirm Password do not match");
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
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
        password: password,
        confirm_password: confirmPassword,
      });

      const response = await signUp(reqBody);

      if (response) {
        toast.success(
          "Registration successful! Please check your email for verification.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );

        navigate("/activation/otp", {
          state: {
            email: response.data.email,
            resend_at: response.data.verification_user_resend_at,
          },
        });
      }
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

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-customBlue4 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="flex flex-col justify-center items-center text-center md:text-left">
          <ToastContainer />

          <img className="w-[200px] mb-3" src={Logo} />

          <h1 className="text-3xl md:text-5xl font-bold text-customBlue2">
            AirSeat
          </h1>
          <p className="text-lg md:text-2xl text-customBlue2 mt-4">
            Your Traveling Partner
          </p>
        </div>
        <div className="hidden md:block absolute bottom-0 mb-10 md:mb-20">
          <img src={plantsImage} alt="Decoration" className="w-40 md:w-auto" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Sign Up
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
            />
            {fullNameError && <FormValidation errorMessage={fullNameError} />}
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
            {emailError && <FormValidation errorMessage={emailError} />}
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
            {phoneNumberError && (
              <FormValidation errorMessage={phoneNumberError} />
            )}
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
            {confirmPasswordError && (
              <FormValidation errorMessage={confirmPasswordError} />
            )}
          </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-customBlue2 text-white py-2 rounded-md mt-12 flex items-center justify-center hover:bg-customBlue1"
          >
            {isFetching && <Loading />}
            {!isFetching && "Sign Up"}
          </button>
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
