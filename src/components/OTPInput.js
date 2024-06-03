import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const OTPInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP submit logic
    console.log("OTP Submitted:", otp.join(""));
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
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
        We have sent the verification code to <strong>j*****@gmail.com</strong>
      </p>
      <form className="mt-4 mb-8 space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
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
            <p className="text-gray-600">Resend OTP in <strong>{timer}s</strong></p>
          ) : (
            <p className="text-gray-600">
              Didn’t receive the code? <button className="text-customBlue2 hover:text-customBlue1" onClick={() => setTimer(60)}><strong> Resend Code</strong></button>
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
