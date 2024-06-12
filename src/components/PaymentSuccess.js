import React, { useState } from "react";
import imgSuccessPayment from "../icons/success_payment.svg";

const PaymentSuccess = () => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {/* Alert Success */}
      {showAlert && (
        <div
          id="alert-border-3"
          class="flex items-center p-4 mb-0 mx-32 text-green-800 border-t-4 border-green-600 bg-customGreen1  dark:text-green-400 dark:bg-gray-800 dark:border-green-800 rounded-md"
          onClick={() => setShowAlert(false)}
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">
            Terimakasih atas pembayaran transaksi
          </div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-3"
            aria-label="Close"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex flex-col items-center justify-center mt-20 bg-white text-center">
        <style>
          {`
          .bg-light-blue {
            background-color: #DEF2FD;
          }

          .text-blue {
            color: #447C9D;
          }
        `}
        </style>
        <img src={imgSuccessPayment} alt="icon sukses" className="w-36 mb-5" />
        <h2 className="text-blue text-2xl mb-2 font-bold">Selamat!</h2>
        <p className="text-black text-lg mb-8 font-semibold">
          Transaksi Pembayaran Tiket sukses!
        </p>
        <div className="flex flex-col gap-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded">
            Terbitkan Tiket
          </button>
          <button className="bg-light-blue text-black py-2 px-4 rounded">
            Cari Penerbangan Lain
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
