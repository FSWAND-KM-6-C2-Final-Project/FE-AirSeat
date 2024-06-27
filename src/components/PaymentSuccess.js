import React, { useState } from "react";
import imgSuccessPayment from "../images/payment_success.png";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleClickSearchFlight = () => {
    navigate("/");
  };

  const handleShowBookingTransaction = () => {
    navigate("/order-history");
    navigate(0);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white text-center">
        <img
          src={imgSuccessPayment}
          alt="icon sukses"
          className="w-36 sm:w-[250px] mb-5"
        />
        <h2 className="text-blue text-2xl mb-2 font-bold">Congratulations!</h2>
        <p className="text-black text-lg mb-8 font-semibold">
          Ticket payment transaction successful!
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleShowBookingTransaction}
            className="bg-customBlue1 text-white font-semibold py-4 px-[50px] sm:px-[200px]  rounded-lg"
          >
            Show Booking Transaction
          </button>
          <button
            onClick={handleClickSearchFlight}
            className="bg-customBlue2 text-white font-semibold py-4 rounded rounded-lg"
          >
            Search Other Flights
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
