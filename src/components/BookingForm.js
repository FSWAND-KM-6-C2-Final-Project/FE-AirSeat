import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast, Bounce } from "react-toastify";

import { seoTitle } from "string-fn";
import dayjs from "dayjs";

const seatLayout = [
  {
    type: "First Class",
    rows: [
      ["1A", "", "", "", "", "", "1B"],
      ["2A", "", "", "", "", "", "2B"],
    ],
  },
  {
    type: "Business Class",
    rows: [
      ["3A", "3B", "", "", "", "3C", "3D"],
      ["4A", "4B", "", "", "", "4C", "4D"],
      ["5A", "5B", "", "", "", "5C", "5D"],
      ["6A", "6B", "", "", "", "6C", "6D"],
      ["7A", "7B", "", "", "", "7C", "7D"],
    ],
  },
  {
    type: "Premium Economy",
    rows: [
      ["8A", "8B", "", "", "", "8C", "8D"],
      ["9A", "9B", "", "", "", "9C", "9D"],
      ["10A", "10B", "", "", "", "10C", "10D"],
      ["11A", "11B", "", "", "", "11C", "11D"],
      ["12A", "12B", "", "", "", "12C", "12D"],
      ["13A", "13B", "", "", "", "13C", "13D"],
    ],
  },
  {
    type: "Economy",
    rows: [
      ["14A", "14B", "14C", "", "14D", "14E", "14F"],
      ["15A", "15B", "15C", "", "15D", "15E", "15F"],
      ["16A", "16B", "16C", "", "16D", "16E", "16F"],
      ["17A", "17B", "17C", "", "17D", "17E", "17F"],
      ["18A", "18B", "18C", "", "18D", "18E", "18F"],
      ["19A", "19B", "19C", "", "19D", "19E", "19F"],
      ["20A", "20B", "20C", "", "20D", "20E", "20F"],
      ["21A", "21B", "21C", "", "21D", "21E", "21F"],
      ["22A", "22B", "22C", "", "22D", "22E", "22F"],
      ["23A", "23B", "23C", "", "23D", "23E", "23F"],
      ["24A", "24B", "24C", "", "24D", "24E", "24F"],
      ["25A", "25B", "25C", "", "25D", "25E", "25F"],
    ],
  },
];

const classTypes = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business Class",
  first_class: "First Class",
};

const BookingForm = ({
  initialClass,
  onBookingData,
  seatStatus,
  seatStatusReturn,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [filteredReturnSeats, setFilteredReturnSeats] = useState([]);
  const [maxSeatCount, setMaxSeatCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [orderData, setOrderData] = useState({
    fullName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    hasLastName: true,
  });

  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const adultCount = parseInt(searchParams.get("adult")) || 0;
    const infantCount = parseInt(searchParams.get("infant")) || 0;
    const childrenCount = parseInt(searchParams.get("children")) || 0;
    const seatClass = searchParams.get("class") || "economy";

    const totalPassengers = adultCount + childrenCount;
    setMaxSeatCount(totalPassengers);

    const adultFormTemplate = {
      title: "Mr.",
      fullName: "",
      lastName: "",
      dob: "",
      nationality: "",
      idType: "ktp",
      idNumber: "",
      issuingCountry: "",
      expiryDate: "",
      hasLastName: true,
      type: "adult",
    };

    const infantFormTemplate = {
      title: "Mr.",
      fullName: "",
      lastName: "",
      dob: "",
      nationality: "",
      idType: "ktp",
      idNumber: "",
      issuingCountry: "",
      expiryDate: "",
      hasLastName: true,
      type: "infant",
    };

    const childrenFormTemplate = {
      title: "Mr.",
      fullName: "",
      lastName: "",
      dob: "",
      nationality: "",
      idType: "ktp",
      idNumber: "",
      issuingCountry: "",
      expiryDate: "",
      hasLastName: true,
      type: "children",
    };

    const adults = Array(adultCount)
      .fill()
      .map(() => ({ ...adultFormTemplate }));
    const infants = Array(infantCount)
      .fill()
      .map(() => ({ ...infantFormTemplate }));
    const children = Array(childrenCount)
      .fill()
      .map(() => ({ ...childrenFormTemplate }));

    const allPassengers = [...adults, ...infants, ...children];

    setPassengers(allPassengers);

    const selectedClassType = classTypes[seatClass];
    const filtered = seatLayout.find(
      (layout) => layout.type === selectedClassType
    );
    setFilteredSeats([filtered]);
  }, []);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsReturn, setSelectedSeatsReturn] = useState([]);
  const [selectedInfantSeats, setSelectedInfantSeats] = useState([]);
  const [selectedInfantSeatsReturn, setSelectedInfantSeatsReturn] = useState(
    []
  );

  const handleOrderChange = (e) => {
    setIsSaved(false);
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handlePassengerChange = (index, e) => {
    setIsSaved(false);

    const { name, value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = value;
    setPassengers(newPassengers);
  };

  const handleSeatSelection = (seat, isReturn = false) => {
    setIsSaved(false);

    if (isReturn) {
      if (
        !selectedSeatsReturn.includes(seat) &&
        selectedSeatsReturn.length < maxSeatCount
      ) {
        setSelectedSeatsReturn([...selectedSeatsReturn, seat]);
        setSelectedInfantSeatsReturn([seat]);
      } else if (selectedSeatsReturn.includes(seat)) {
        setSelectedSeatsReturn(selectedSeatsReturn.filter((s) => s !== seat));
        setSelectedInfantSeatsReturn([]);
      }
    } else {
      if (
        !selectedSeats.includes(seat) &&
        selectedSeats.length < maxSeatCount
      ) {
        setSelectedSeats([...selectedSeats, seat]);
        setSelectedInfantSeats([seat]);
      } else if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        setSelectedInfantSeats([]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clickedSeats = selectedSeats.length;
    const clickedReturnSeats = selectedSeatsReturn.length;

    if (clickedSeats < maxSeatCount) {
      toast.error(
        `You've just chosen ${clickedSeats} out of ${maxSeatCount} seats, choose the remaining ${
          parseInt(maxSeatCount) - parseInt(clickedSeats)
        }.`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } else if (seatStatusReturn && clickedReturnSeats < maxSeatCount) {
      toast.error(
        `You've just chosen ${clickedReturnSeats} out of ${maxSeatCount} return seats, choose the remaining ${
          parseInt(maxSeatCount) - parseInt(clickedReturnSeats)
        }.`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } else {
      if (seatStatusReturn) {
        const bookingData = {
          flight_id: parseInt(searchParams.get("flightId")),
          return_flight_id: parseInt(searchParams.get("returnFlightId")),
          payment_method: "snap",
          ordered_by: {
            first_name: orderData.fullName,
            last_name: orderData.lastName || "",
            phone_number: orderData.phoneNumber,
            email: orderData.email,
          },
          passenger: passengers.map((passenger, index) => ({
            first_name: passenger.fullName,
            last_name: passenger.lastName || "",
            dob: dayjs(passenger.dob).toISOString(),
            title: passenger.title.toLowerCase().slice(0, -1),
            nationality: passenger.nationality,
            passenger_type: passenger.type,
            identification_type: passenger.idType.toLowerCase(),
            identification_number: passenger.idNumber,
            identification_country: passenger.issuingCountry || "Indonesia",
            identification_expired: passenger.expiryDate
              ? dayjs(passenger.expiryDate).toISOString()
              : "",
            seat_departure:
              passenger.type === "infant"
                ? parseSeat(selectedInfantSeats[0])
                : parseSeat(selectedSeats[index]),
            seat_return:
              passenger.type === "infant"
                ? parseSeat(selectedInfantSeatsReturn[0])
                : parseSeat(selectedSeatsReturn[index]),
            passenger_type: passenger.type,
          })),
        };
        onBookingData(bookingData);

        setIsSaved(true);

        toast.success(`Order data saved.`, {
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
      } else {
        const bookingData = {
          flight_id: parseInt(searchParams.get("flightId")),
          payment_method: "snap",
          ordered_by: {
            first_name: orderData.fullName,
            last_name: orderData.lastName || "",
            phone_number: orderData.phoneNumber,
            email: orderData.email,
          },
          passenger: passengers.map((passenger, index) => ({
            first_name: passenger.fullName,
            last_name: passenger.lastName || "",
            dob: dayjs(passenger.dob).toISOString(),
            title: passenger.title.toLowerCase().slice(0, -1),
            nationality: passenger.nationality,
            passenger_type: passenger.type,
            identification_type: passenger.idType.toLowerCase(),
            identification_number: passenger.idNumber,
            identification_country: passenger.issuingCountry || "Indonesia",
            identification_expired: passenger.expiryDate
              ? dayjs(passenger.expiryDate).toISOString()
              : "",
            seat_departure:
              passenger.type === "infant"
                ? parseSeat(selectedInfantSeats[0])
                : parseSeat(selectedSeats[index]),
            passenger_type: passenger.type,
          })),
        };

        onBookingData(bookingData);

        setIsSaved(true);

        toast.success(`Order data saved.`, {
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
    }
  };

  const parseSeat = (seatCode) => {
    const row = seatCode.slice(0, -1);
    const column = seatCode.slice(-1);
    return {
      seat_row: column,
      seat_column: row.toUpperCase(),
    };
  };

  const renderSeat = (seat, isDisabled, isReturn = false) => {
    const seatStatuses = isReturn ? seatStatusReturn : seatStatus;
    const isSelected = isReturn
      ? selectedSeatsReturn.includes(seat)
      : selectedSeats.includes(seat);
    let seatStatusClass = "";

    if (seatStatuses && seatStatuses.length > 0) {
      const seatInfo = seatStatuses.find((s) => s.seat_name === seat);
      if (seatInfo) {
        if (seatInfo.seat_status === "available") {
          seatStatusClass = "bg-[#56bf58] text-white font-medium text-sm";
          isDisabled = false;
        } else if (
          seatInfo.seat_status === "locked" ||
          seatInfo.seat_status === "unavailable"
        ) {
          seatStatusClass =
            "bg-[#abadac] text-white font-medium text-sm cursor-not-allowed";
          isDisabled = true;
        }
      }
    }

    const bgColor = isSelected
      ? "bg-customBlue1 text-white font-medium text-sm"
      : seatStatusClass;

    return (
      <button
        key={seat}
        type="button"
        className={`p-2 ${bgColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75 hover:bg-opacity-75`}
        onClick={() => !isDisabled && handleSeatSelection(seat, isReturn)}
        disabled={isDisabled}
      >
        {seat}
      </button>
    );
  };

  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
          .font-plus-jakarta-sans {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        `}
      </style>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl  p-6 bg-white rounded-lg shadow-lg border  font-plus-jakarta-sans"
      >
        <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b-2 border-gray-300 pb-3">
          Fill Order Data
        </h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-customBlue1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={orderData.fullName}
            onChange={handleOrderChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <label className="block text-sm font-medium text-customBlue1">
            Have Family Name?
          </label>
          <Switch
            checked={orderData.hasLastName}
            onChange={() =>
              setOrderData({
                ...orderData,
                hasLastName: !orderData.hasLastName,
              })
            }
            className={`${
              orderData.hasLastName ? "bg-[#447C9D]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                orderData.hasLastName ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        {orderData.hasLastName && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-customBlue1">
              Family Name
            </label>
            <input
              type="text"
              name="lastName"
              value={orderData.lastName}
              onChange={handleOrderChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
              required
            />
          </div>
        )}
        <div className="mb-6">
          <label className="block text-sm font-medium text-customBlue1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={orderData.phoneNumber}
            onChange={handleOrderChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-customBlue1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={orderData.email}
            onChange={handleOrderChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
            required
          />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b pb-3">
          Passenger Data
        </h2>
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-customBlue1">
              Passenger Personal Data {index + 1} - {seoTitle(passenger.type)}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Title
              </label>
              <select
                name="title"
                value={passenger.title}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
              >
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={passenger.fullName}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-sm font-medium text-customBlue1">
                Have family name?
              </label>
              <Switch
                checked={passenger.hasLastName}
                onChange={() => {
                  const newPassengers = [...passengers];
                  newPassengers[index].hasLastName =
                    !newPassengers[index].hasLastName;
                  setPassengers(newPassengers);
                }}
                className={`${
                  passenger.hasLastName ? "bg-[#447C9D]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    passenger.hasLastName ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            {passenger.hasLastName && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-customBlue1">
                  Family Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, e)}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={passenger.dob}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Nationality
              </label>
              <input
                type="text"
                name="nationality"
                value={passenger.nationality}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                KTP/Paspor
              </label>
              <select
                name="idType"
                value={passenger.idType}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              >
                <option value="ktp">KTP</option>
                <option value="paspor">Paspor</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                ID Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={passenger.idNumber}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              />
            </div>
            {passenger.idType === "paspor" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-customBlue1">
                    Issuing Country
                  </label>
                  <input
                    type="text"
                    name="issuingCountry"
                    value={passenger.issuingCountry}
                    onChange={(e) => handlePassengerChange(index, e)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-customBlue1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={passenger.expiryDate}
                    onChange={(e) => handlePassengerChange(index, e)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                    required
                  />
                </div>
              </>
            )}
          </div>
        ))}

        <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b pb-3">
          Choose Seat
        </h2>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {filteredSeats.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold mb-5 text-customBlue1">
                    {section.type}
                  </h3>
                  <div className="grid grid-cols-7 gap-2">
                    {section.rows.map((row, rowIndex) => (
                      <React.Fragment key={rowIndex}>
                        {row.map((seat, seatIndex) =>
                          seat === "" ? (
                            <div key={seatIndex} className="col-span-1">
                              <span className="text-center justify-center"></span>
                            </div>
                          ) : (
                            renderSeat(seat, false)
                          )
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {seatStatusReturn && Object.keys(seatStatusReturn).length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b pb-3">
              Choose Return Seat
            </h2>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  {filteredSeats.map((section, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-xl font-semibold mb-5 text-customBlue1">
                        {section.type}
                      </h3>
                      <div className="grid grid-cols-7 gap-2">
                        {section.rows.map((row, rowIndex) => (
                          <React.Fragment key={rowIndex}>
                            {row.map((seat, seatIndex) =>
                              seat === "" ? (
                                <div key={seatIndex} className="col-span-1">
                                  <span className="text-center justify-center"></span>
                                </div>
                              ) : (
                                renderSeat(seat, false, true)
                              )
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {!isSaved && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-[#164765] text-white rounded-md hover:bg-[#447C9D] focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75 w-full"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
