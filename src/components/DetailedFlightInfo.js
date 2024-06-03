import React from "react";

const DetailedFlightInfo = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-left">
        Booking Code: <span className="text-[#447C9D]">6723y2GHK</span>
      </h2>
      <div className="space-y-8">
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-[#447C9D] mb-2">
            Keberangkatan
          </h3>
          <p className="text-2xl font-bold">07:00</p>
          <p className="text-gray-500">3 Maret 2023</p>
          <p className="text-gray-500">Soekarno Hatta - Terminal 1A Domestik</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Jet Air - Economy
          </h3>
          <p className="text-gray-500">JT - 203</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Informasi:</h3>
          <ul className="list-disc list-inside text-gray-500 space-y-1">
            <li>Baggage 20 kg</li>
            <li>Cabin baggage 7 kg</li>
            <li>In Flight Entertainment</li>
          </ul>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-[#447C9D] mb-2">Kedatangan</h3>
          <p className="text-2xl font-bold">11:00</p>
          <p className="text-gray-500">3 Maret 2023</p>
          <p className="text-gray-500">Melbourne International Airport</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Rincian Harga
          </h3>
          <div className="text-gray-500 space-y-1">
            <p>2 Adults: IDR 9.550.000</p>
            <p>1 Baby: IDR 0</p>
            <p>Tax: IDR 300.000</p>
          </div>
          <p className="text-xl font-bold mt-2">
            Total: <span className="text-[#447C9D]">IDR 9.850.000</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailedFlightInfo;
