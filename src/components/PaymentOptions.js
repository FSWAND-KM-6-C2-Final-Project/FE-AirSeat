import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import DetailedFlightInfo from "./DetailedFlightInfo";

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState("Gopay");
  const [selectedVirtualAccount, setSelectedVirtualAccount] = useState("");

  const virtualAccountOptions = [
    "Permata",
    "Mandiri",
    "BCA",
    "BRI",
    "BNI",
    "CIMB",
  ];

  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');
          .font-plus-jakarta-sans {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        `}
      </style>
      <div className="payment-container flex flex-col md:flex-row p-8 space-y-8 md:space-y-0 md:space-x-8 font-plus-jakarta-sans">
        <div className="w-full md:w-1/2 p-8 shadow-lg rounded-lg bg-white">
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
            {selectedOption === "Virtual Account" && (
              <div className="mt-4">
                <Listbox
                  value={selectedVirtualAccount}
                  onChange={setSelectedVirtualAccount}
                >
                  <div className="relative">
                    <Listbox.Button className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 flex justify-between items-center">
                      <span>
                        {selectedVirtualAccount || "-- Pilih Bank --"}
                      </span>
                      <SelectorIcon className="h-5 w-5 text-gray-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                      {virtualAccountOptions.map((option, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-white bg-gray-600"
                                : "text-gray-900"
                            }`
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {option}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-gray-600"
                                  }`}
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            )}
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
    </div>
  );
};

export default PaymentOptions;
