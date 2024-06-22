import React, { useState, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Banner from "./Banner";
import FavoriteDestination from "./FavoriteDestination";
import { IoIosWoman } from "react-icons/io";
import { MdOutlineMan } from "react-icons/md";
import { FaBaby } from "react-icons/fa6";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import { TbArrowsExchange } from "react-icons/tb";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import slugify from "react-slugify";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { getFavoriteDestinations } from "../services/favoriteDestination.service";
import { getAirportData } from "../services/airport.service";
import dayjs from "dayjs";
import { getFlightData } from "../services/flight.service";

import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("All");
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showFromCityModal, setShowFromCityModal] = useState(false);
  const [showToCityModal, setShowToCityModal] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromCitySearch, setFromCitySearch] = useState("");
  const [toCitySearch, setToCitySearch] = useState("");
  const [economyPrice, setEconomyPrice] = useState("");
  const [premiumEconomyPrice, setPremiumEconomyPrice] = useState("");
  const [businessPrice, setBusinessPrice] = useState("");
  const [firstClassPrice, setFirstClassPrice] = useState("");
  const [formData, setFormData] = useState({
    deptAirport: null,
    arrAirport: null,
    deptTime: null,
  });
  const [deptDate, setDeptDate] = useState(0);
  const [deptCity, setDeptCity] = useState();
  const [arrCity, setArrCity] = useState();

  const [seatClass, setSeatClass] = useState("Economy");
  const [tempSeatClass, setTempSeatClass] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cities, setCities] = useState([]);
  const [favoriteDestination, setFavoriteDestination] = useState([]);
  const [continent, setContinent] = useState("");
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  // Pagination
  const [totalData, setTotalData] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  async function fetchData(data) {
    setIsFetching(true);
    try {
      const continentData = data;
      if (continentData) {
        const page = searchParams.get("page") || 1;
        const response = await getFavoriteDestinations(continentData, page);

        setFavoriteDestination(response.data.flights);

        // Pagination
        setTotalData(response.pagination.totalData);
        setTotalPages(response.pagination.totalPages);
        setPageNum(response.pagination.pageNum);
        setPageSize(response.pagination.pageSize);
      }
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setIsFetching(false);
  }

  useEffect(() => {
    fetchCity();
    setFavoriteDestination([]);
    const continentParams = searchParams.get("continent");
    if (continentParams === "asia") {
      setSelectedButton("Asia");
      setContinent("asia");
    } else if (continentParams === "america") {
      setSelectedButton("America");
      setContinent("america");
    } else if (continentParams === "australia") {
      setSelectedButton("Australia");
      setContinent("australia");
    } else if (continentParams === "europe") {
      setSelectedButton("Europe");
      setContinent("europe");
    } else if (continentParams === "africa") {
      setSelectedButton("Africa");
      setContinent("africa");
    } else if (continentParams === "all") {
      setSelectedButton("All");
      setContinent("all");
    } else {
      setSelectedButton("All");
      setContinent("all");
    }
    fetchData(continent);
  }, [continent, selectedButton, fromCity, toCity]);

  useEffect(() => {
    if (showClassModal) {
      setTempSeatClass("Economy");
    }
  }, [showClassModal]);

  const handleClickContinent = (button) => {
    if (button === "Asia") {
      navigate("?continent=asia");
      setContinent("asia");
    } else if (button === "America") {
      navigate("?continent=america");
      setContinent("america");
    } else if (button === "Australia") {
      navigate("?continent=australia");
      setContinent("australia");
    } else if (button === "Europe") {
      navigate("?continent=europe");
      setContinent("europe");
    } else if (button === "Africa") {
      navigate("?continent=africa");
      setContinent("africa");
    } else if (button === "All") {
      navigate("?continent=all");
      setContinent("all");
    }
    setSelectedButton(button);
  };

  const [tempPassengers, setTempPassengers] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const fetchCity = async () => {
    try {
      const response = await getAirportData();
      const airports = response.data.airports;

      const data = airports.map((airport) => ({
        id: airport.id,
        name: `${airport.airport_name} - ${airport.airport_city} (${airport.airport_city_code})`,
      }));

      setCities(data);
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const seatClassPrices = {
    Economy: "IDR 1,500,000",
    "Premium Economy": "IDR 3,000,000",
    Business: "IDR 5,000,000",
    "First Class": "IDR 8,000,000",
  };

  const toggleReturnDate = () => {
    setShowReturnDate(!showReturnDate);
  };

  const handlePassengerChange = (type, value) => {
    setTempPassengers({
      ...tempPassengers,
      [type]: value,
    });
  };

  const handleSavePassengers = () => {
    setPassengers(tempPassengers);
    setShowPassengerModal(false);
  };

  const handleSaveClass = () => {
    setSeatClass(tempSeatClass);
    setShowClassModal(false);
  };

  const handleSelectFromCity = (city) => {
    setFromCity(city.name);
    setDeptCity(city.id);
    setShowFromCityModal(false);
  };

  const handleSelectToCity = (city) => {
    setToCity(city.name);
    setArrCity(city.id);
    setShowToCityModal(false);
  };

  useEffect(() => {
    const storeFormData = () => ({
      deptAirport: deptCity,
      arrAirport: arrCity,
      deptDate: deptDate ? dayjs(deptDate).format("DD-MM-YYYY") : undefined,
      adult: tempPassengers.adults || 0,
      infant: tempPassengers.infants || 0,
      children: tempPassengers.children || 0,
      class: slugify(tempSeatClass, {
        delimiter: "_",
      }),
    });

    setFormData(storeFormData());
    if (
      storeFormData().deptAirport &&
      storeFormData().arrAirport &&
      storeFormData().deptDate &&
      (storeFormData().adult ||
        storeFormData().infant ||
        storeFormData().children)
    ) {
      fetchFlight(storeFormData());
    }
  }, [deptCity, arrCity, deptDate, tempPassengers, tempSeatClass]);

  const handleDepartureDate = (e) => {
    e.preventDefault();
    setDeptDate(e.target.value);
  };

  const fetchFlight = async (data) => {
    try {
      const deptAirport = data.deptAirport;
      const arrAirport = data.arrAirport;
      const deptDate = data.deptDate;

      const response = await getFlightData(deptAirport, arrAirport, deptDate);

      if (response.data.flights.length > 0) {
        setEconomyPrice(response.data.flights[0].price_economy);
        setPremiumEconomyPrice(response.data.flights[0].price_premium_economy);
        setBusinessPrice(response.data.flights[0].price_business);
        setFirstClassPrice(response.data.flights[0].price_first_class);
      } else {
        setEconomyPrice(0);
        setPremiumEconomyPrice(0);
        setBusinessPrice(0);
        setFirstClassPrice(0);
      }
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const displayPassengers = () => {
    const { adults, children, infants } = passengers;
    let display = [];
    if (adults > 0)
      display.push(`${adults} ${adults === 1 ? "Adult" : "Adult"}`);
    if (children > 0)
      display.push(`${children} ${children === 1 ? "Child" : "Children"}`);
    if (infants > 0)
      display.push(`${infants} ${infants === 1 ? "Infant" : "Infant"}`);
    return display.length > 0 ? display.join(", ") : "";
  };

  const handleExchange = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);

    const tempId = deptCity;
    setDeptCity(arrCity);
    setArrCity(tempId);
  };

  const filteredFromCities = cities.filter((city) =>
    city.name.toLowerCase().includes(fromCitySearch.toLowerCase())
  );

  const filteredToCities = cities.filter((city) =>
    city.name.toLowerCase().includes(toCitySearch.toLowerCase())
  );

  const today = new Date().toISOString().split("T")[0];

  const handleClickSearch = () => {
    const data = formData;

    if (
      data.deptAirport &&
      data.arrAirport &&
      data.deptDate &&
      (data.adult || data.infant || data.children)
    ) {
      navigate({
        pathname: "/search",
        search: createSearchParams(data).toString(),
      });
      navigate(0);
    } else {
      toast.error("Please choose your flight details first.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <main className="flex flex-col items-center">
      <Banner />
      <ToastContainer />

      <div className="max-w-full p-2 lg:mt-[-100px] md:mt-[-50px]">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl mb-10">
          <div className="lg:p-8 p-5 space-y-8 md:space-y-4">
            <h2 className="text-xl font-bold mb-4">
              Choose a special flight schedule at{" "}
              <span className="text-customBlue2">AirSeat!</span>
            </h2>

            <div className="flex flex-col md:flex-row p-2 space-y-4 md:space-y-0">
              <div className="flex flex-1 items-center justify-center">
                <div className="flex w-full gap-4 items-center">
                  <div className="flex flex-none w-28 items-center justify-center gap-2">
                    <FaPlaneDeparture className="text-xl" />
                    <label className="block text-gray-700">From</label>
                  </div>
                  <input
                    type="text"
                    value={fromCity}
                    onClick={() => setShowFromCityModal(true)}
                    readOnly
                    placeholder="Select a location"
                    className="w-full md:w-8/12 border-b-2 border-t-white border-l-white border-r-white rounded cursor-pointer"
                  />
                </div>
              </div>

              <TbArrowsExchange
                className="rounded-full bg-black text-white w-7 h-7 cursor-pointer self-center md:self-auto"
                onClick={handleExchange}
              />

              <div className="flex flex-1 items-center justify-center">
                <div className="flex w-full gap-4 items-center">
                  <div className="flex flex-none w-28 items-center justify-center gap-2">
                    <FaPlaneArrival className="text-xl" />
                    <label className="block text-gray-700">To</label>
                  </div>
                  <input
                    type="text"
                    value={toCity}
                    onClick={() => setShowToCityModal(true)}
                    readOnly
                    placeholder="Select a location"
                    className="w-full md:w-9/12 border-b-2 border-t-white border-l-white border-r-white rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row w-full space-y-4 xl:space-y-0">
              <div className="flex flex-1 items-center justify-center w-full">
                <div className="flex w-full gap-4">
                  <div className="flex flex-none w-32 items-center justify-center gap-2">
                    <IoCalendarSharp className="text-xl" />
                    <label className="block text-gray-700">Date</label>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row w-full gap-4">
                      <div className="flex flex-1 items-center justify-center p-2">
                        <div className="flex flex-col w-full space-y-2 max-w-xs">
                          <label className="block text-gray-700">
                            Departure
                          </label>
                          <input
                            type="date"
                            min={today}
                            onChange={handleDepartureDate}
                            className="w-full border-b-2 border-t-white border-l-white border-r-white rounded"
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 items-center justify-center p-2">
                        <div className="flex flex-col w-full space-y-2 max-w-xs">
                          <label className="block text-gray-700">Arrival</label>
                          <input
                            type="date"
                            placeholder=""
                            disabled={!showReturnDate}
                            className={`w-full border-b-2 border-t-white border-l-white border-r-white rounded ${
                              showReturnDate ? "bg-white" : "cursor-not-allowed"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end items-start mt-2 p-2">
                        <input
                          type="checkbox"
                          className="toggle-checkbox"
                          id="returnToggle"
                          onChange={toggleReturnDate}
                        />
                        <label
                          htmlFor="returnToggle"
                          className="toggle-label"
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center w-full">
                <div className="flex w-full gap-4">
                  <div className="flex flex-none w-32 items-center justify-center gap-2">
                    <MdOutlineAirlineSeatReclineNormal className="text-2xl" />
                    <label className="block text-gray-700">Seat</label>
                  </div>
                  <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="flex flex-1 p-2 items-center justify-center">
                      <div className="flex flex-col w-full space-y-2">
                        <label className="block text-gray-700">
                          Passengers
                        </label>
                        <input
                          type="text"
                          value={displayPassengers()}
                          onClick={() => {
                            setTempPassengers(passengers);
                            setShowPassengerModal(true);
                          }}
                          readOnly
                          placeholder="Choose passengers"
                          className="w-full border-b-2 border-t-white border-l-white border-r-white rounded cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 p-2 items-center justify-center">
                      <div className="flex flex-col w-full space-y-2">
                        <label className="block text-gray-700">Class</label>
                        <input
                          type="text"
                          value={seatClass}
                          onClick={() => {
                            setTempSeatClass("");
                            setShowClassModal(true);
                          }}
                          readOnly
                          className="w-full border-b-2 border-t-white border-l-white border-r-white rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleClickSearch}
            className="mt-6 w-full bg-customBlue2 hover:bg-customBlue1 text-white rounded py-3"
            style={{
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            Search Flights
          </button>
        </div>
      </div>

      {showPassengerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-[80%] max-h-[90%] md:w-[50%] md:max-h-[70%] lg:w-[30%] lg:max-h-[50%]">
            <button
              onClick={() => setShowPassengerModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Select Passengers</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-5">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    <MdOutlineMan />
                  </div>
                  <div>
                    <p>Adult</p>
                    <p>(Age 12 and over)</p>
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    value={tempPassengers.adults}
                    onChange={(e) =>
                      handlePassengerChange("adults", parseInt(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg py-2 px-4"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-5 space-x-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    <IoIosWoman />
                  </div>
                  <div>
                    <p>Child</p>
                    <p>(Age 2 - 11) </p>
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    value={tempPassengers.children}
                    onChange={(e) =>
                      handlePassengerChange(
                        "children",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg py-2 px-4"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    <FaBaby />
                  </div>
                  <div>
                    <p>Infant</p>
                    <p>(Below age 2)</p>
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    value={tempPassengers.infants}
                    onChange={(e) =>
                      handlePassengerChange("infants", parseInt(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg py-2 px-4"
                    min="0"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSavePassengers}
              className="mt-6 w-full bg-customBlue2 hover:bg-customBlue1 text-white rounded-lg py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-[80%] max-h-[70%] md:w-[50%] md:max-h-[70%] lg:w-[30%] lg:max-h-[60%]">
            <button
              onClick={() => setShowClassModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>

            <h3 className="text-lg font-bold mb-4">Select Seat Class</h3>
            <div className="space-y-4">
              {Object.keys(seatClassPrices).map((cls) => (
                <div
                  key={cls}
                  className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer ${
                    tempSeatClass === cls
                      ? "bg-customBlue2 text-white hover:text-white"
                      : ""
                  }`}
                  onClick={() => setTempSeatClass(cls)}
                >
                  <div>
                    <h4>{cls}</h4>
                    <p>
                      {cls === "Economy" &&
                        `${new Intl.NumberFormat("id", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(economyPrice)}`}
                      {cls === "Premium Economy" &&
                        `${new Intl.NumberFormat("id", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(premiumEconomyPrice)}`}
                      {cls === "Business" &&
                        `${new Intl.NumberFormat("id", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(businessPrice)}`}
                      {cls === "First Class" &&
                        `${new Intl.NumberFormat("id", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(firstClassPrice)}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveClass}
              className="mt-6 w-full bg-customBlue2 hover:bg-customBlue1 text-white rounded-lg py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showFromCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-[90%] max-h-[90%] md:w-[50%] md:max-h-[70%] lg:w-[50%] lg:max-h-[50%]">
            <div className="flex item-center relative gap-3">
              <button
                onClick={() => setShowFromCityModal(false)}
                className="absolute right-2 text-gray-700 text-3xl hover:text-gray-900"
              >
                &times;
              </button>
              <input
                type="text"
                value={fromCitySearch}
                onChange={(e) => setFromCitySearch(e.target.value)}
                placeholder="Please select a location"
                className="w-11/12 border border-gray-300 rounded-lg py-2 px-4 mb-4"
              />
            </div>
            <div className="flex justify-between item-center ml-2 mt-3 mb-3 text-lg">
              <p className="font-bold">Popular Cities or Airports</p>
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {filteredFromCities.map((city) => (
                <div
                  key={city.id}
                  className="p-2 border-b rounded cursor-pointer hover:bg-customBlue2 hover:text-white"
                  onClick={() => handleSelectFromCity(city)}
                >
                  {city.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showToCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-[90%] max-h-[90%] md:w-[50%] md:max-h-[70%] lg:w-[50%] lg:max-h-[50%]">
            <div className="flex item-center relative gap-3">
              <button
                onClick={() => setShowToCityModal(false)}
                className="absolute right-2 text-gray-700 text-3xl hover:text-gray-900"
              >
                &times;
              </button>
              <input
                type="text"
                value={toCitySearch}
                onChange={(e) => setToCitySearch(e.target.value)}
                placeholder="Please select a location"
                className="w-11/12 border border-gray-300 rounded-lg py-2 px-4 mb-4"
              />
            </div>
            <div className="flex justify-between item-center ml-2 mt-3 mb-4 text-lg">
              <p className="font-bold">Popular Cities or Airports</p>
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {filteredToCities.map((city) => (
                <div
                  key={city.id}
                  className="p-2 border-b rounded cursor-pointer hover:bg-customBlue2 hover:text-white"
                  onClick={() => handleSelectToCity(city)}
                >
                  {city.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 w-full max-w-7xl px-4">
        <h2 className="text-2xl font-bold mb-6">Favorite Destinations</h2>
        <div className="flex overflow-x-auto whitespace-nowrap  gap-5 mb-4 ">
          <button
            className={`px-4 py-3 flex items-center rounded-xl ${
              selectedButton === "All"
                ? "bg-customBlue1 text-white"
                : "bg-blue-100 text-black hover:bg-customBlue2 hover:text-white"
            }`}
            onClick={() => handleClickContinent("All")}
          >
            <FiSearch className="mr-3" />
            All
          </button>
          <button
            className={`px-4 py-2 flex items-center rounded-xl ${
              selectedButton === "Asia"
                ? "bg-customBlue1 text-white"
                : "bg-blue-100 text-black hover:bg-customBlue2 hover:text-white"
            }`}
            onClick={() => handleClickContinent("Asia")}
          >
            <FiSearch className="mr-3" />
            Asia
          </button>
          <button
            className={`px-4 py-2 flex items-center rounded-xl ${
              selectedButton === "America"
                ? "bg-customBlue1 text-white"
                : "bg-blue-100 text-black hover:bg-customBlue2 hover:text-white"
            }`}
            onClick={() => handleClickContinent("America")}
          >
            <FiSearch className="mr-3" />
            America
          </button>
          <button
            className={`px-4 py-2 flex items-center rounded-xl ${
              selectedButton === "Australia"
                ? "bg-customBlue1 text-white"
                : "bg-blue-100 text-black hover:bg-customBlue2 hover:text-white"
            }`}
            onClick={() => handleClickContinent("Australia")}
          >
            <FiSearch className="mr-3" />
            Australia
          </button>
          <button
            className={`px-4 py-2 flex items-center rounded-xl ${
              selectedButton === "Europe"
                ? "bg-customBlue1 text-white"
                : "bg-blue-100 text-black hover:bg-customBlue2 hover:text-white"
            }`}
            onClick={() => handleClickContinent("Europe")}
          >
            <FiSearch className="mr-3" />
            Europe
          </button>
          <button
            className={`px-4 py-2 flex items-center rounded-xl ${
              selectedButton === "Africa"
                ? "bg-customBlue1 text-white"
                : "bg-blue-100 text-black hover:bg-customBlue2 hover:text-white"
            }`}
            onClick={() => handleClickContinent("Africa")}
          >
            <FiSearch className="mr-3" />
            Africa
          </button>
        </div>
        <FavoriteDestination
          data={favoriteDestination}
          isFetching={isFetching}
          totalData={totalData}
          totalPages={totalPages}
          pageNum={pageNum}
          pageSize={pageSize}
        />
      </div>

      <style>
        {`
    .toggle-checkbox:checked + .toggle-label {
        background-color: #4c51bf;
    }

    .toggle-checkbox:checked + .toggle-label::after {
        transform: translateX(100%);
    }

    .toggle-checkbox {
        display: none;
    }

    .toggle-label {
        display: block;
        width: 40px;
        height: 20px;
        background-color: #e2e8f0;
        border-radius: 9999px;
        cursor: pointer;
        position: relative;
        transition: background-color 0.2s;
    }

    .toggle-label::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 9999px;
        transition: transform 0.2s;
    }

    .cursor-not-allowed {
        cursor: not-allowed;
    }

    .hover\\:bg-gray-200:hover {
        background-color: #e2e8f0;
    }

    .grid-item:hover {
      transform: scale(1.05);
      transition: transform 0.35s ease-in-out, box-shadow 0.35s ease-in-out;
    }

    @media (max-width: 768px) {
      .grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grid-cols-3 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grid-cols-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grid-cols-5 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .flex.gap-2.mb-4 {
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .flex.gap-2.mb-4 > button {
        flex: 1 1 calc(50% - 0.5rem);
        margin-bottom: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .grid-cols-2 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }

      .grid-cols-3 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }

      .grid-cols-4 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }

      .grid-cols-5 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }

      .flex.gap-2.mb-4 {
        flex-direction: column;
        gap: 0.5rem;
      }

      .flex.gap-2.mb-4 > button {
        flex: 1 1 100%;
        margin-bottom: 0.5rem;
      }
    }
  `}
      </style>
    </main>
  );
};

export default Home;
