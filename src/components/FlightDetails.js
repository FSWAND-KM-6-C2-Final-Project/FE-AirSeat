import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaInfoCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

import { seoTitle } from "string-fn";

const FlightDetails = ({
  airline_name,
  airline_picture,
  flight_number,
  departure_time,
  arrival_time,
  information,
  adult,
  infant,
  children,
  price,
  departure_airport,
  departure_terminal,
  arrival_airport,
  bookingData,
}) => {
  const navigate = useNavigate();
  const [seatClass, setSeatClass] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const dayjs = require("dayjs");
  const utc = require("dayjs/plugin/utc");
  const customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat);
  dayjs.extend(utc);

  const handlePaymentRedirect = () => {
    console.log(bookingData);
    // navigate("/payment");
  };

  useEffect(() => {
    setSeatClass(searchParams.get("class"));
  }, []);

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
      <div className="md:w-1/3 max-h-screen p-6 bg-white rounded-lg shadow-lg my-6 border border-gray-200 flight-details overflow-y-hidden">
        <h2 className="text-3xl font-bold mb-6 text-[#164765] border-b-2 border-gray-300 pb-3">
          Detail Flight
        </h2>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaPlaneDeparture className="text-[#447C9D] mr-2" size={20} />
            <h3 className="text-xl font-semibold text-[#164765]">Departure</h3>
          </div>
          <p className="text-lg font-medium text-gray-700">
            {dayjs(departure_time).format("HH:mm")}
          </p>
          <p className="text-md text-gray-600">
            {dayjs(departure_time).format("DD MMMM YYYY")}
          </p>
          <p className="text-md text-gray-600">
            {departure_airport && departure_airport} –{" "}
            {departure_terminal && departure_terminal}
          </p>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold text-[#164765]">
            {airline_name && airline_name} - {seatClass && seoTitle(seatClass)}
          </h3>
          <p className="text-md text">{flight_number && flight_number}</p>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="flex items-center mb-2">
            <FaInfoCircle className="text-[#447C9D] mr-2" size={20} />
            <h3 className="text-xl font-semibold text-[#164765]">
              Information
            </h3>
          </div>
          <ul className="list-disc list-inside text-md text">
            <p className="whitespace-pre-wrap">{information && information}</p>
          </ul>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="flex items-center mb-2">
            <FaPlaneArrival className="text-[#447C9D] mr-2" size={20} />
            <h3 className="text-xl font-semibold text-[#164765]">Arrival</h3>
          </div>
          <p className="text-lg font-medium text-gray-700">
            {dayjs(arrival_time).format("HH:mm")}
          </p>
          <p className="text-md text-gray-600">
            {dayjs(arrival_time).format("DD MMMM YYYY")}
          </p>
          <p className="text-md text-gray-600">
            {arrival_airport && arrival_airport}
          </p>
        </div>

        <div className="mb-3 border-t border-gray-200 pt-max">
          <h3 className="text-xl font-semibold text-[#164765]">
            Price Details
          </h3>
          <div className="flex justify-between py-1">
            <span className="text-md text">2 Adults</span>
            <span className="text-md text">IDR 9.550.000</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-md text">1 Baby</span>
            <span className="text-md text">IDR 0</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-md text">Tax</span>
            <span className="text-md text">IDR 300.000</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-2">
            <span className="text-xl font-bold text-[#164765]">Total</span>
            <span className="text-xl font-bold text-[#447C9D]">
              IDR 9.850.000
            </span>
          </div>
          <button
            className="w-full py-3 md:py-3 sm:py-2 my-5 text-white bg-[#164765] rounded-lg hover:bg-[#447C9D] focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75 text-lg md:text-lg sm:text-md"
            onClick={handlePaymentRedirect}
          >
            Continue To Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
