import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');

          .flight-details, h2, p, button {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          .bg-light-blue {
            background-color: #DEF2FD;
          }

          .text-blue {
            color: #447C9D;
          }
        `}
      </style>
      <img src="img.png" alt="icon sukses" className="w-36 mb-5" />
      <h2 className="text-blue text-2xl mb-2">Selamat!</h2>
      <p className="text-black text-lg mb-8">
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
  );
};

export default PaymentSuccess;
