import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Banner from "./Banner";
import FavoriteDestination from "./FavoriteDestination";

import { getFavoriteDestinations } from "../services/favoriteDestination.service";

const Home = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("All");
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showFromCityModal, setShowFromCityModal] = useState(false);
  const [showToCityModal, setShowToCityModal] = useState(false);
  const [fromCity, setFromCity] = useState("Jakarta (JKTA)");
  const [toCity, setToCity] = useState("Melbourne (MLB)");
  const [fromCitySearch, setFromCitySearch] = useState("");
  const [toCitySearch, setToCitySearch] = useState("");
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [favoriteDestination, setFavoriteDestination] = useState([]);
  const [continent, setContinent] = useState("");

  async function fetchData(data) {
    setIsFetching(true);
    try {
      const continentData = data;
      if (continentData) {
        const response = await getFavoriteDestinations(continentData);

        setFavoriteDestination(response.data.flights);
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  }

  useEffect(() => {
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
    }
    fetchData(continent);

    console.log(favoriteDestination);
  }, [continent, selectedButton]);

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
  const [seatClass, setSeatClass] = useState("Economy");
  const [tempSeatClass, setTempSeatClass] = useState("");

  const cities = [
    "Jakarta (JKTA)",
    "Surabaya (SBY)",
    "Bandung (BDO)",
    "Bali (DPS)",
    "Melbourne (MLB)",
  ];

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
    setFromCity(city);
    setShowFromCityModal(false);
  };

  const handleSelectToCity = (city) => {
    setToCity(city);
    setShowToCityModal(false);
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
    return display.length > 0 ? display.join(", ") : "Passengers";
  };

  const filteredFromCities = cities.filter((city) =>
    city.toLowerCase().includes(fromCitySearch.toLowerCase())
  );

  const filteredToCities = cities.filter((city) =>
    city.toLowerCase().includes(toCitySearch.toLowerCase())
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="flex flex-col items-center p-2 lg:p-0">
      <Banner />
      <div className="w-full lg:max-w-[70%] mb-10 m-10   lg:mt-[-100px] md:mt-[-50px] ">
        <div className="bg-white rounded-t-xl  p-6  shadow-xl">
          <h2 className="text-xl font-bold mb-4">
            Choose a special flight schedule at{" "}
            <span className="text-customBlue2">AirSeat!</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">From</label>
              <input
                type="text"
                value={fromCity}
                onClick={() => setShowFromCityModal(true)}
                readOnly
                className="w-full border border-gray-300 rounded py-2 px-4 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-gray-700">To</label>
              <input
                type="text"
                value={toCity}
                onClick={() => setShowToCityModal(true)}
                readOnly
                className="w-full border border-gray-300 rounded py-2 px-4 cursor-pointer"
              />
            </div>
            <div className="col-span-2 flex items-center space-x-4">
              <div className="flex-grow">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  defaultValue={today}
                  min={today}
                  className="w-1/2 border border-gray-300 rounded py-2 px-4"
                />
              </div>

              <div className="flex-grow">
                <label className="block text-gray-700">Return Date</label>
                <input
                  type="date"
                  disabled={!showReturnDate}
                  className={`w-1/2 border rounded py-2 px-4 ${
                    showReturnDate
                      ? "border-gray-300 bg-white"
                      : "border-gray-300 bg-gray-200 cursor-not-allowed"
                  }`}
                />
              </div>
              <div className="flex items-end">
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  id="returnToggle"
                  onChange={toggleReturnDate}
                />
                <label htmlFor="returnToggle" className="toggle-label"></label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Passengers</label>
              <input
                type="text"
                value={displayPassengers()}
                onClick={() => {
                  setTempPassengers(passengers);
                  setShowPassengerModal(true);
                }}
                readOnly
                className="w-full border border-gray-300 rounded py-2 px-4 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-gray-700">Seat Class</label>
              <input
                type="text"
                value={seatClass}
                onClick={() => {
                  setTempSeatClass("");
                  setShowClassModal(true);
                }}
                readOnly
                className="w-full border border-gray-300 rounded py-2 px-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="rounded-b-xl ">
          <button
            onClick={() => {
              window.location.href = "/search";
            }}
            className="w-full bg-customBlue2 hover:bg-customBlue1 shadow-xl rounded-b-xl text-white  py-3"
          >
            Search Flights
          </button>
        </div>
      </div>

      {showPassengerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowPassengerModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Select Passengers</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Adult</label>
                <input
                  type="number"
                  value={tempPassengers.adults}
                  onChange={(e) =>
                    handlePassengerChange("adults", parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded py-2 px-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700">Child</label>
                <input
                  type="number"
                  value={tempPassengers.children}
                  onChange={(e) =>
                    handlePassengerChange("children", parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded py-2 px-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700">Infant</label>
                <input
                  type="number"
                  value={tempPassengers.infants}
                  onChange={(e) =>
                    handlePassengerChange("infants", parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded py-2 px-4"
                  min="0"
                />
              </div>
            </div>
            <button
              onClick={handleSavePassengers}
              className="mt-6 w-full bg-customBlue2 hover:bg-customBlue1 text-white rounded py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
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
                  className={`flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-customBlue2 ${
                    tempSeatClass === cls ? "bg-customBlue2 text-white" : ""
                  }`}
                  onClick={() => setTempSeatClass(cls)}
                >
                  <div>
                    <h4
                      className={`text-black ${
                        tempSeatClass === cls ? "text-white" : ""
                      }`}
                    >
                      {cls}
                    </h4>
                    <p
                      className={`text-sm text-customBlue2 ${
                        tempSeatClass === cls ? "text-white" : ""
                      }`}
                    >
                      {seatClassPrices[cls]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveClass}
              className="mt-6 w-full bg-customBlue2 hover:bg-customBlue1 text-white rounded py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showFromCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative min-w-[600px] max-w-lg max-h-[90%]">
            <button
              onClick={() => setShowFromCityModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <input
              type="text"
              value={fromCitySearch}
              onChange={(e) => setFromCitySearch(e.target.value)}
              placeholder="Search for a country or city"
              className="w-full border border-gray-300 rounded py-2 px-4 mb-4"
            />
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {filteredToCities.map((city) => (
                <div
                  key={city}
                  className="p-2 border rounded cursor-pointer hover:bg-customBlue2 hover:text-white"
                  onClick={() => handleSelectFromCity(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showToCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative  min-w-[600px] max-w-lg max-h-[90%]">
            <button
              onClick={() => setShowToCityModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <input
              type="text"
              value={toCitySearch}
              onChange={(e) => setToCitySearch(e.target.value)}
              placeholder="Search for a country or city"
              className="w-full border border-gray-300 rounded py-2 px-4 mb-4"
            />
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {filteredToCities.map((city) => (
                <div
                  key={city}
                  className="p-2 border rounded cursor-pointer hover:bg-customBlue2 hover:text-white"
                  onClick={() => handleSelectToCity(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 w-full max-w-7xl px-4">
        <h2 className="text-2xl font-bold mb-6">Favorite Destinations</h2>
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 flex items-center rounded ${
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
            className={`px-4 py-2 flex items-center rounded ${
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
            className={`px-4 py-2 flex items-center rounded ${
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
            className={`px-4 py-2 flex items-center rounded ${
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
            className={`px-4 py-2 flex items-center rounded ${
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
            className={`px-4 py-2 flex items-center rounded ${
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
