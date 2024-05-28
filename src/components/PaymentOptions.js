import React, { useState } from "react";
import DetailedFlightInfo from "./DetailedFlightInfo";

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState("Gopay");

  return (
    <div className="flex flex-col md:flex-row p-8 space-y-8 md:space-y-0 md:space-x-8">
      <div className="w-full md:w-1/2 p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Isi Data Pembayaran
        </h2>
        <div className="space-y-4">
          <button
            className={`w-full text-left p-4 border rounded-lg text-lg font-medium transition ${
              selectedOption === "Gopay"
                ? "bg-gray-800 text-white"
                : "border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedOption("Gopay")}
          >
            Gopay
          </button>
          <button
            className={`w-full text-left p-4 border rounded-lg text-lg font-medium transition ${
              selectedOption === "Virtual Account"
                ? "bg-gray-800 text-white"
                : "border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedOption("Virtual Account")}
          >
            Virtual Account
          </button>
          <button
            className={`w-full text-left p-4 border rounded-lg text-lg font-medium transition ${
              selectedOption === "Credit Card"
                ? "bg-gray-800 text-white"
                : "border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedOption("Credit Card")}
          >
            Credit Card
          </button>
        </div>
        {selectedOption === "Credit Card" && (
          <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              Credit Card
            </h3>
            <div className="flex space-x-2 mb-4">
              <img
                src="https://img.icons8.com/color/48/000000/mastercard.png"
                alt="MasterCard"
              />
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="Visa"
              />
              <img
                src="https://img.icons8.com/color/48/000000/amex.png"
                alt="American Express"
              />
              <img
                src="https://img.icons8.com/color/48/000000/paypal.png"
                alt="PayPal"
              />
            </div>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Card number"
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="text"
                placeholder="Card holder name"
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                  type="text"
                  placeholder="Expiry date"
                  className="w-1/2 border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>
          </div>
        )}
        <button className="w-full bg-[#164765] text-white p-4 rounded-lg mt-6 text-lg font-medium hover:bg-gray-900 transition">
          Bayar
        </button>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <DetailedFlightInfo />
      </div>
    </div>
  );
};

export default PaymentOptions;
