import React, { useState } from "react";

const Home = () => {
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
      display.push(`${adults} ${adults === 1 ? "Adult" : "Adults"}`);
    if (children > 0)
      display.push(`${children} ${children === 1 ? "Child" : "Children"}`);
    if (infants > 0)
      display.push(`${infants} ${infants === 1 ? "Infant" : "Infants"}`);
    return display.length > 0 ? display.join(", ") : "Passengers";
  };

  const filteredFromCities = cities.filter((city) =>
    city.toLowerCase().includes(fromCitySearch.toLowerCase())
  );

  const filteredToCities = cities.filter((city) =>
    city.toLowerCase().includes(toCitySearch.toLowerCase())
  );

  return (
    <main className="flex justify-center mt-10">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-7xl">
        <h2 className="text-xl font-bold mb-4">
          Choose a special flight schedule at{" "}
          <span className="text-purple-600">AirSeat!</span>
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
                defaultValue="2023-03-01"
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
                setTempSeatClass(""); // Ensure no class is selected by default
                setShowClassModal(true);
              }}
              readOnly
              className="w-full border border-gray-300 rounded py-2 px-4 cursor-pointer"
            />
          </div>
        </div>
        <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white rounded py-3">
          Search Flights
        </button>
      </div>

      {showPassengerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white rounded py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                  className={`flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-gray-200 ${
                    tempSeatClass === cls ? "bg-purple-600 text-white" : ""
                  }`}
                  onClick={() => setTempSeatClass(cls)}
                >
                  <div>
                    <h4
                      className={`text-gray-700 ${
                        tempSeatClass === cls ? "text-white" : ""
                      }`}
                    >
                      {cls}
                    </h4>
                    <p
                      className={`text-sm text-gray-500 ${
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
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white rounded py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showFromCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowFromCityModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Select City</h3>
            <input
              type="text"
              value={fromCitySearch}
              onChange={(e) => setFromCitySearch(e.target.value)}
              placeholder="Search city"
              className="w-full border border-gray-300 rounded py-2 px-4 mb-4"
            />
            <div className="space-y-4">
              {filteredFromCities.map((city) => (
                <div
                  key={city}
                  className="p-2 border rounded cursor-pointer hover:bg-gray-200"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowToCityModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Select City</h3>
            <input
              type="text"
              value={toCitySearch}
              onChange={(e) => setToCitySearch(e.target.value)}
              placeholder="Search city"
              className="w-full border border-gray-300 rounded py-2 px-4 mb-4"
            />
            <div className="space-y-4">
              {filteredToCities.map((city) => (
                <div
                  key={city}
                  className="p-2 border rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectToCity(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

          .hover\\:bg-purple-700:hover {
              background-color: #4c51bf;
          }

          .bg-purple-600 {
              background-color: #6b46c1;
          }

          .bg-purple-700 {
              background-color: #4c51bf;
          }
        `}
      </style>
    </main>
  );
};

export default Home;