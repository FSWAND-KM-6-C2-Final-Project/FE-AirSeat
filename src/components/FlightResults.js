import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiBox, FiDollarSign } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { LuArrowUpDown } from "react-icons/lu";
import FlightAccordion from "./FlightAccordion";
import LongArrowIcon from "../icons/long_arrow.svg";
import loadingIcon from "../icons/loading.svg";
import emptyIcon from "../icons/empty.svg";

const sortingOptions = [
  "Price - Cheapest",
  "Price - Highest",
  "Duration - Shortest",
  "Departure - Earliest",
  "Departure - Latest",
  "Arrival - Earliest",
  "Arrival - Latest",
];

const Modal = ({ showModal, toggleModal, handleOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    setSelectedOption(0);
  }, [showModal]);

  const handleOptionClicked = (index) => {
    setSelectedOption(index);
  };

  const handleSelectClick = () => {
    handleOptionSelect(selectedOption);
    toggleModal();
  };

  return (
    <>
      {showModal && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-2 md:p-3 rounded-t dark:border-gray-600">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div>
                {sortingOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-5 border-b ${
                      selectedOption === index
                        ? "bg-customBlue2 text-white"
                        : ""
                    } cursor-pointer`}
                    onClick={() => handleOptionClicked(index)}
                  >
                    <p className="font-bold text-md">{option}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end p-7">
                <button
                  type="button"
                  className="font-bold bg-customBlue2 hover:bg-customBlue1 rounded-2xl p-3 w-32 text-white"
                  onClick={handleSelectClick}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FlightResults = () => {
  const [showModal, setShowModal] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(0);

  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://plucky-agent-424606-s3.et.r.appspot.com/api/v1/flight");
      setFlightData(response.data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedSortOption(optionIndex);
  };

  return (
    <div className="grid p-4 space-y-2 max-w-7xl mx-auto">
      <button
        onClick={toggleModal}
        type="button"
        className="border-2 border-customBlue2 text-customBlue2 px-8 py-2 rounded-full justify-self-end hover:bg-customBlue2 hover:text-white"
      >
        <span className="flex items-center gap-1 text-xs sm:text-sm md:text-base lg:text-base xl:text-base">
          <LuArrowUpDown />
          {sortingOptions[selectedSortOption]}
        </span>
      </button>
      <Modal
        showModal={showModal}
        toggleModal={toggleModal}
        handleOptionSelect={handleOptionSelect}
      />

      <div className="grid grid-cols-1 2xl:grid-cols-6">
        <div className="p-4 hidden xl:block">
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
            {isLoading ? (
              <div className="flex justify-center">
                <img
                  src={loadingIcon}
                  alt="load"
                  className="aspect-square w-1/5"
                />
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
                    <img
                      src={emptyIcon}
                      alt="empty"
                      className="aspect-square w-1/5"
                    />
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
