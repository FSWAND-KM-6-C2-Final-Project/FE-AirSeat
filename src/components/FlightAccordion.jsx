import React from "react";
import { useState } from "react";
import thumbnail from "../icons/thumbnail.svg";
import baggage from "../icons/baggage.svg";

export default function FlightAccordion(props) {
  const {
    airline,
    flightClass,
    departureTime,
    arrivalTime,
    totalTime,
    type,
    departureAirportId,
    arrivalAirportId,
    price,
    date,
    dep_airport,
    code,
    arr_airport,
  } = props;
  const [accordionOpen, setAccordionOpen] = useState(false); // State untuk mengontrol status terbuka atau tertutupnya accordion

  function toggleAccordion() {
    setAccordionOpen(!accordionOpen); // Toggle state accordionOpen
  }

  return (
    <div>
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className={`flex items-center w-full justify-between p-5 font-medium rtl:text-right ${
              accordionOpen
                ? "rounded-t-xl border border-t-customBlue2 border-l-customBlue2 border-r-customBlue2 border-b-none"
                : "rounded-xl border"
            } shadow-inner gap-3`}
            onClick={toggleAccordion}
            aria-expanded={accordionOpen ? "true" : "false"}
            aria-controls="accordion-collapse-body-1"
          >
            <span className="w-full">
              <div className="flex items-center gap-3">
                <img src={thumbnail} alt="" />
                <div className="">
                  <p class="">
                    {airline} - {flightClass}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex w-full items-center mt-5 text-xs sm:text-xs md:text-base lg:text-base xl:text-base">
                  <div>
                    <p className="font-bold">{departureTime}</p>
                    <p className="font-semibold">{departureAirportId}</p>
                  </div>
                  <div className="flex-grow">
                    <p>{totalTime}</p>
                    <hr className="my-2 border-gray-200" />
                    <p>{type}</p>
                  </div>
                  <div>
                    <p className="font-bold">{arrivalTime}</p>
                    <p className="font-semibold">{arrivalAirportId}</p>
                  </div>
                </div>
                {/* <div className="flex flex-col items-center space-y-2 w-56">
                  <p className="text-customBlue1 font-bold xl:text-xl lg:text-lg sm:text-sm">
                    {price}
                  </p>
                  <button className="bg-customBlue2 rounded-xl w-20 p-1 sm:w-24 sm:p-2 md:w-28 md:p-3 lg:w-32 lg:p-4 hover:bg-customBlue1 text-white text-xs sm:text-sm md:text-base lg:text-lg">
                    Select
                  </button>
                </div> */}
                <div className="flex flex-col items-center space-y-2 w-56">
                  <p className="text-customBlue1 font-bold xl:text-xl lg:text-lg sm:text-sm">
                    {price}
                  </p>
                  <button className="bg-customBlue2 rounded-lg w-20 p-1 sm:w-20 sm:p-2 md:w-20 md:p-2 lg:w-32 lg:p-2 hover:bg-customBlue1 text-white text-xs sm:text-sm md:text-sm lg:text-lg">
                    Select
                  </button>
                </div>
              </div>
            </span>
            <svg
              data-accordion-icon=""
              className={`w-3 h-3 rotate-${
                accordionOpen ? "180" : "0"
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>

        <div
          id="accordion-collapse-body-1"
          className={`px-10 py-5 rounded-b-xl  ${
            accordionOpen
              ? "border border-b-customBlue2 border-r-customBlue2 border-l-customBlue2 border-t-none"
              : "hidden border"
          }`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div>
            <div>
              <p className="font-bold text-customBlue2 text-lg">
                Flight Details
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <p className="font-bold">07:00</p>
                <p>{date}</p>
                <p className="font-semibold">{dep_airport}</p>
              </div>
              <div>
                <p className="font-bold text-lg text-customBlue3">Departure</p>
              </div>
            </div>
            <div>
              <hr className="my-5 border-gray-300" />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <img src={thumbnail} alt="" />
              </div>
              <div>
                <div>
                  <p className="font-bold">
                    {airline} - {flightClass}
                  </p>
                  <p className="font-bold">{code}</p>
                </div>
                <div className="mt-3">
                  <p className="font-bold">Information:</p>
                  <p>Baggage 20 kg</p>
                  <p>Cabin Baggage 7 kg</p>
                  <p>In Flight Entertaimet</p>
                </div>
              </div>
            </div>
            <div>
              <hr className="my-5 border-gray-300" />
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <p className="font-bold">{arrivalTime}</p>
                <p>{date}</p>
                <p className="font-semibold">{arr_airport}</p>
              </div>
              <div>
                <p className="font-bold text-lg text-customBlue3">Arrival</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
