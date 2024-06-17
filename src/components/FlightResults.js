import React, { useState, useEffect } from "react";
import LongArrowIcon from "../icons/long_arrow.svg";
import Modal from "./modal";
import FlightAccordion from "./FlightAccordion";
import flights from "../utils/api";

import { FiBox } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import loadingIcon from "../icons/loading.svg";
import emptyIcon from "../icons/empty.svg"

const FlightResults = () => {
  const [showModal, setShowModal] = useState(false);
  const flightData = flights;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      handleLoading();
    }, 1000);
  }, []);

  const handleLoading = () => {
    if (isLoading == false) {
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState({
    month: "January",
    bookingCode: "6723y2GHK",
    totalTime: "4h 0m",
    departureAirportId: "JKT",
    departureTime: "07.00",
    departureAirportName: "Soekarno Hatta - Terminal 1A Domestik",
    arrivalAirportId: "CGK",
    arrivalTime: "11.00",
    arrivalAirportName: "11.00 International Airport",
    flight: "Jet Air-Economy",
    flightNumber: "JT-203",
  });
  const [selectedOrderId, setSelectedOrderId] = useState(1);

  const flightdetails = [
    {
      id: 1,
      totalTime: "4h 0m",
      departureAirportId: "JKT",
      departureTime: "07.00",
      arrivalAirportId: "DPS",
      arrivalTime: "12.00",
      arrivalAirportName: "11.00 International Airport",
      flight: "Jet Air-Economy",
      flightNumber: "JT-203",
    },
    {
      id: 2,
      month: "January",
      bookingCode: "6756232OG",
      totalTime: "1h 15m",
      departureAirportId: "JKT",
      departureTime: "07.00",
      departureAirportName: "Soekarno Hatta - Terminal 1A Domestik",
      arrivalAirportId: "MLB",
      arrivalTime: "17.00",
      arrivalAirportName: "Bali International Airport",
      flight: "Jet Air-Business",
      flightNumber: "JT-205",
    },
  ];

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setSelectedOrderId(order.id);
  };

  return (
<div className="grid p-4 space-y-4 max-w-7xl mx-auto">
  <button
    onClick={toggleModal}
    type="button"
    className="border-2 border-customBlue2 text-customBlue2 px-8 py-2 rounded-full justify-self-end"
  >
    <span className="flex items-center gap-1">
      {<LuArrowUpDown />}
      Termurah
    </span>
  </button>
  <Modal showModal={showModal} toggleModal={toggleModal} />

  <div className="grid grid-cols-1 2xl:grid-cols-6">
    <div className="p-4">
      <div className="p-5 bg-background shadow-[0_3px_15px_-3px_rgba(0,0,0,0.3)] aspect-square w-40 rounded-2xl">
        <div className="self-center space-y-2">
          <div className="mt-3 mb-5">
            <p className="font-semibold text-base">Filter</p>
          </div>
          <div className="flex items-center gap-2 border-b pb-2 text-lg">
            <FiBox />
            <p>Transit</p>
          </div>
          <div className="flex items-center gap-2 border-b pb-2 text-lg">
            <CiHeart />
            <p>Fasilitas</p>
          </div>
          <div className="flex items-center gap-2 border-b pb-2 text-lg">
            <FiDollarSign />
            <p>Harga</p>
          </div>
        </div>
      </div>
    </div>

    <div className="p-4 col-span-5">
      <div className="space-y-5">
        {!isLoading ? (
          <div className="flex justify-center">
            <img src={loadingIcon} alt="load" className="aspect-square w-1/5" />
          </div>
        ) : (
          <div className="space-y-4">
            {flightData.length > 0 ? (
              flightData.map((data) => (
                <FlightAccordion
                  key={data.id}
                  airline={data.airline}
                  flightClass={data.class}
                  departureTime={data.departureTime}
                  arrivalTime={data.arrivalTime}
                  totalTime={data.totalTime}
                  type={data.type}
                  departureAirportId={data.departureAirportId}
                  arrivalAirportId={data.arrivalAirportId}
                  price={data.price}
                  date={data.date}
                  dep_airport={data.dep_airport}
                  code={data.code}
                  arr_airport={data.arr_airport}
                />
              ))
            ) : (
              <div className="flex justify-center">
                <img src={emptyIcon} alt="empty" className="aspect-square w-1/5" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default FlightResults;
