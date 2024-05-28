import React from "react";

const DetailedFlightInfo = () => {
  return (
    <div className="p-8 bg-white-50 shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6">
        Booking Code: <span className="text-[#447C9D]">6723y2GHK</span>
      </h2>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-[#447C9D] mb-1">
            Keberangkatan
          </h3>
          <p className="text-2xl font-bold">07:00</p>
          <p className="text-gray-500">3 Maret 2023</p>
          <p className="text-gray-500">Soekarno Hatta - Terminal 1A Domestik</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Jet Air - Economy
          </h3>
          <p className="text-gray-500">JT - 203</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">Informasi:</h3>
          <p className="text-gray-500">Baggage 20 kg</p>
          <p className="text-gray-500">Cabin baggage 7 kg</p>
          <p className="text-gray-500">In Flight Entertainment</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-[#447C9D] mb-1">Kedatangan</h3>
          <p className="text-2xl font-bold">11:00</p>
          <p className="text-gray-500">3 Maret 2023</p>
          <p className="text-gray-500">Melbourne International Airport</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Rincian Harga
          </h3>
          <p className="text-gray-500">2 Adults: IDR 9.550.000</p>
          <p className="text-gray-500">1 Baby: IDR 0</p>
          <p className="text-gray-500">Tax: IDR 300.000</p>
          <p className="text-xl font-bold">
            Total: <span className="text-[#447C9D]">IDR 9.850.000</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailedFlightInfo;
