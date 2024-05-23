import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaInfoCircle } from "react-icons/fa";

const FlightDetails = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

          .flight-details {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        `}
      </style>
      <div className="md:w-1/3 max-h-screen p-6 bg-white rounded-lg shadow-lg my-6 border border-gray-200 flight-details">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-3">
          Detail Penerbangan
        </h2>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaPlaneDeparture className="text-purple-600 mr-2" size={20} />
            <h3 className="text-xl font-semibold text-gray-800">
              Keberangkatan
            </h3>
          </div>
          <p className="text-lg font-medium text-gray-700">07:00</p>
          <p className="text-md text-gray-600">3 Maret 2023</p>
          <p className="text-md text-gray-600">
            Soekarno Hatta – Terminal 1A Domestik
          </p>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Jet Air - Economy
          </h3>
          <p className="text-md text-gray-600">JT - 203</p>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="flex items-center mb-2">
            <FaInfoCircle className="text-purple-600 mr-2" size={20} />
            <h3 className="text-xl font-semibold text-gray-800">Informasi</h3>
          </div>
          <ul className="list-disc list-inside text-md text-gray-600">
            <li>Baggage 20 kg</li>
            <li>Cabin baggage 7 kg</li>
            <li>In Flight Entertainment</li>
          </ul>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="flex items-center mb-2">
            <FaPlaneArrival className="text-purple-600 mr-2" size={20} />
            <h3 className="text-xl font-semibold text-gray-800">Kedatangan</h3>
          </div>
          <p className="text-lg font-medium text-gray-700">11:00</p>
          <p className="text-md text-gray-600">3 Maret 2023</p>
          <p className="text-md text-gray-600">
            Melbourne International Airport
          </p>
        </div>

        <div className="mb-3 border-t border-gray-200 pt-max">
          <h3 className="text-xl font-semibold text-gray-800">Rincian Harga</h3>
          <div className="flex justify-between py-1">
            <span className="text-md text-gray-600">2 Adults</span>
            <span className="text-md text-gray-600">IDR 9.550.000</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-md text-gray-600">1 Baby</span>
            <span className="text-md text-gray-600">IDR 0</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-md text-gray-600">Tax</span>
            <span className="text-md text-gray-600">IDR 300.000</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-2">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className="text-xl font-bold text-purple-600">
              IDR 9.850.000
            </span>
          </div>
        </div>
        <button className="w-full py-3 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
          Lanjut Bayar
        </button>
      </div>
    </>
  );
};

export default FlightDetails;
