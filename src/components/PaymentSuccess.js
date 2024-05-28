import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <img src="img.png" alt="icon suskes" className="w-36 mb-5" />
      <h2 className="text-[#447C9D] text-2xl mb-2">Selamat!</h2>
      <p className="text-black text-lg mb-8">
        Transaksi Pembayaran Tiket sukses!
      </p>
      <div className="flex flex-col gap-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded">
          Terbitkan Tiket
        </button>
        <button className="bg-[#DEF2FD] text-white py-2 px-4 rounded">
          Cari Penerbangan Lain
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
