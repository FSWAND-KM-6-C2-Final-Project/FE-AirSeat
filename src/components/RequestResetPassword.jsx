import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsImage from "../images/plants.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
        console.log(err.message);
      }
    }

    setIsFetching(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:flex-1 bg-customBlue4 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[200px] mb-3" src={Logo} />

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
            <h2 className="text-2xl font-bold mb-4">Reset Password Request</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email/Phone"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue2"
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
