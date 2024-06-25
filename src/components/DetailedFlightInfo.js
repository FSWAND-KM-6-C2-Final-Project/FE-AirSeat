import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaInfoCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Swal from "sweetalert2";

import { seoTitle } from "string-fn";
import { bookingFlight } from "../services/booking.service";

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const DetailedFlightInfo = ({
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
  booking_code,
  arrival_airport,
  bookingData,
  departure_airport_city_code,
  arrival_airport_city_code,
  seatClass,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-3 text-[#164765] border-b-2 border-gray-300 pb-3">
        Booking Code : {booking_code}
      </h2>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <FaPlaneDeparture className="text-customBlue1 mr-3" size={20} />
          <h3 className="text-xl font-bold text-customBlue1">Departure</h3>
        </div>
        <p className="text-lg font-bold text-gray-700">
          {dayjs(departure_time).format("HH:mm")}
        </p>
        <p className="text-md font-medium text-gray-600">
          {dayjs(departure_time).format("DD MMMM YYYY")}
        </p>
        <p className="text-md font-medium text-gray-600">
          {departure_airport && departure_airport} –{" "}
          {departure_terminal && departure_terminal}
        </p>
      </div>

      <div className="mb-6 border-t flex items-center border-gray-200 pt-4">
        <div>
          <img className="w-[50px] mr-4" src={airline_picture} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-customBlue1">
            {airline_name && airline_name} - {seatClass && seoTitle(seatClass)}
          </h3>
          <p className="text-lg mb-3 font-bold text-customBlue1">
            {flight_number && flight_number}
          </p>
          <div className="flex items-center mt-2">
            <h3 className="text-md font-bold  text-customBlue1">
              Information :
            </h3>
          </div>
          <ul className="list-disc list-inside text-md text">
            <p className="whitespace-pre-wrap font-medium text-gray-600">
              {information && information}
            </p>
          </ul>
        </div>
      </div>

      <div className="mb-6 border-t border-gray-200 pt-4">
        <div className="flex items-center mb-2">
          <FaPlaneArrival className="text-customBlue1 mr-2" size={20} />
          <h3 className="text-xl font-bold text-customBlue1">Arrival</h3>
        </div>
        <p className="text-lg font-bold text-gray-700">
          {dayjs(arrival_time).format("HH:mm")}
        </p>
        <p className="text-md font-medium text-gray-600">
          {dayjs(arrival_time).format("DD MMMM YYYY")}
        </p>
        <p className="text-md font-medium text-gray-600">
          {arrival_airport && arrival_airport}
        </p>
      </div>

      <div className="mb-3 border-t border-gray-200 pt-4">
        <h3 className="text-xl font-bold text-customBlue1 pb-3">
          Price Details
        </h3>
        <div className="flex justify-between py-1 ">
          <span className="text-md font-medium">{adult} Adults</span>
          <span className="text-md font-medium">
            {new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(parseFloat(price) * parseInt(adult))}
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-md font-medium">{infant} Infant</span>
          <span className="text-md font-medium">
            {new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(parseFloat(price) * parseInt(infant))}
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-md font-medium">{children} Children</span>
          <span className="text-md font-medium">
            {new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(parseFloat(price) * parseInt(children))}
          </span>
        </div>
        <div className="flex justify-between py-1 mb-2">
          <span className="text-md font-medium">Tax</span>
          <span className="text-md font-medium">
            {new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(0)}
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <span className="text-xl font-bold text-customBlue1">Total</span>
          <span className="text-xl font-bold text-customBlue1">
            {new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(
              parseFloat(price) * parseInt(adult) +
                parseFloat(price) * parseInt(infant) +
                parseFloat(price) * parseInt(children)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailedFlightInfo;
