import React, { useState, useEffect } from "react";
import { FiBox, FiDollarSign } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { LuArrowUpDown } from "react-icons/lu";
import FlightAccordion from "./FlightAccordion";
import LongArrowIcon from "../icons/long_arrow.svg";
import loadingIcon from "../images/loading.png";
import emptyIcon from "../icons/not-found-flight.svg";
import { getFlightData } from "../services/flight.service";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

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
  const [selectedOption, setSelectedOption] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dayjs = require("dayjs");
  const utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);

  useEffect(() => {
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");
    const seatClass = searchParams.get("class");

    if (sortBy === `price_${seatClass}` && order === "asc") {
      setSelectedOption(0);
    } else if (sortBy === `price_${seatClass}` && order === "desc") {
      setSelectedOption(1);
    } else if (sortBy === "duration" && order === "asc") {
      setSelectedOption(2);
    } else if (sortBy === "departure_time" && order === "asc") {
      setSelectedOption(3);
    } else if (sortBy === "departure_time" && order === "desc") {
      setSelectedOption(4);
    } else if (sortBy === "arrival_time" && order === "asc") {
      setSelectedOption(5);
    } else if (sortBy === "arrival_time" && order === "desc") {
      setSelectedOption(6);
    } else {
      setSelectedOption(0);
    }
  }, [showModal, searchParams]);

  const handleOptionClicked = (index, option) => {
    setSelectedOption(index);
  };

  const handleSelectClick = () => {
    let searchParamsObject = {
      deptAirport: searchParams.get("deptAirport"),
      arrAirport: searchParams.get("arrAirport"),
      deptDate: searchParams.get("deptDate"),
      adult: searchParams.get("adult"),
      infant: searchParams.get("infant"),
      children: searchParams.get("children"),
      class: searchParams.get("class"),
    };

    if (selectedOption === 0) {
      searchParamsObject.sortBy = `price_${searchParams.get("class")}`;
      searchParamsObject.order = "asc";
    } else if (selectedOption === 1) {
      searchParamsObject.sortBy = `price_${searchParams.get("class")}`;
      searchParamsObject.order = "desc";
    } else if (selectedOption === 2) {
      searchParamsObject.sortBy = "duration";
      searchParamsObject.order = "asc";
    } else if (selectedOption === 3) {
      searchParamsObject.sortBy = "departure_time";
      searchParamsObject.order = "asc";
    } else if (selectedOption === 4) {
      searchParamsObject.sortBy = "departure_time";
      searchParamsObject.order = "desc";
    } else if (selectedOption === 5) {
      searchParamsObject.sortBy = "arrival_time";
      searchParamsObject.order = "asc";
    } else if (selectedOption === 6) {
      searchParamsObject.sortBy = "arrival_time";
      searchParamsObject.order = "desc";
    }

    const flightId = searchParams.get("flightId");
    if (flightId) {
      searchParamsObject = {
        ...searchParamsObject,
        flightId: flightId,
      };
    }

    const returnDate = searchParams.get("returnDate");

    if (returnDate) {
      searchParamsObject = {
        ...searchParamsObject,
        returnDate: returnDate,
      };
    }

    navigate({
      pathname: "/search",
      search: createSearchParams(searchParamsObject).toString(),
    });

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
                    onClick={() => handleOptionClicked(index, option)}
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
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const departure_airport_id = searchParams.get("deptAirport");
  const arrival_airport_id = searchParams.get("arrAirport");
  const departure_data = searchParams.get("deptDate");
  const adult = searchParams.get("adult");
  const children = searchParams.get("children");
  const infant = searchParams.get("infant");
  const seatClass = searchParams.get("class");
  const sortBy = searchParams.get("sortBy") || `price_${seatClass}`;
  const order = searchParams.get("order") || "asc";

  useEffect(() => {
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");
    const seatClass = searchParams.get("class");

    if (sortBy === `price_${seatClass}` && order === "asc") {
      setSelectedSortOption(0);
    } else if (sortBy === `price_${seatClass}` && order === "desc") {
      setSelectedSortOption(1);
    } else if (sortBy === "duration" && order === "asc") {
      setSelectedSortOption(2);
    } else if (sortBy === "departure_time" && order === "asc") {
      setSelectedSortOption(3);
    } else if (sortBy === "departure_time" && order === "desc") {
      setSelectedSortOption(4);
    } else if (sortBy === "arrival_time" && order === "asc") {
      setSelectedSortOption(5);
    } else if (sortBy === "arrival_time" && order === "desc") {
      setSelectedSortOption(6);
    } else {
      setSelectedSortOption(0);
    }
    fetchFlightData();
  }, [showModal, searchParams]);

  const fetchFlightData = async () => {
    setIsLoading(true);
    try {
      const flights = await getFlightData(
        departure_airport_id,
        arrival_airport_id,
        departure_data,
        sortBy,
        order
      );

      setFlightData(flights.data.flights);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
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
              <div className="flex cursor-pointer items-center gap-2 border-b pb-2 text-lg">
                <FiBox />
                <p>Transit</p>
              </div>
              <div className="flex cursor-pointer items-center gap-2 border-b pb-2 text-lg">
                <CiHeart />
                <p>Fasilitas</p>
              </div>
              <div className="flex cursor-pointer items-center gap-2 border-b pb-2 text-lg">
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
                  className="w-[80%] sm:w-[20%]"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {flightData.length > 0 ? (
                  flightData.map((data) => {
                    const seatClass = searchParams.get("class");
                    let price;

                    switch (seatClass) {
                      case "economy":
                        price = data.price_economy;
                        break;
                      case "premium_economy":
                        price = data.price_premium_economy;
                        break;
                      case "business":
                        price = data.price_business;
                        break;
                      case "first_class":
                        price = data.price_first_class;
                        break;
                      default:
                        price = data.price_economy;
                    }

                    return (
                      <FlightAccordion
                        key={data.id}
                        airline={data.airline.airline_name}
                        flightClass={seatClass}
                        departureTime={data.departure_time}
                        arrivalTime={data.arrival_time}
                        totalTime={data.duration}
                        type={"Direct"}
                        idFlight={data.id}
                        logo={data.airline.airline_picture}
                        departureAirportId={
                          data.departureAirport.airport_city_code
                        }
                        arrivalAirportId={data.arrivalAirport.airport_city_code}
                        price={price}
                        date={data.date}
                        information={data.information}
                        dep_airport={data.departureAirport.airport_name}
                        code={data.flight_number}
                        arr_airport={data.arrivalAirport.airport_name}
                      />
                    );
                  })
                ) : (
                  <div className="flex justify-center">
                    <img
                      src={emptyIcon}
                      alt="empty"
                      className="w-[80%] sm:w-[30%]"
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
