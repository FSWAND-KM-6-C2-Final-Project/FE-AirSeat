import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const BookingForm = ({ initialClass }) => {
  const [orderData, setOrderData] = useState({
    fullName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    hasLastName: true,
  });

  const [passengers, setPassengers] = useState([
    {
      title: "Mr.",
      fullName: "",
      lastName: "",
      dob: "",
      nationality: "",
      idNumber: "",
      issuingCountry: "",
      expiryDate: "",
      hasLastName: true,
    },
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = value;
    setPassengers(newPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        title: "Mr.",
        fullName: "",
        lastName: "",
        dob: "",
        nationality: "",
        idNumber: "",
        issuingCountry: "",
        expiryDate: "",
        hasLastName: true,
      },
    ]);
  };

  const handleSeatSelection = (seat) => {
    if (!selectedSeats.includes(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order data:", orderData);
    console.log("Passenger data:", passengers);
    console.log("Selected seats:", selectedSeats);
  };

  const renderSeat = (seat, isDisabled) => {
    const isSelected = selectedSeats.includes(seat);
    const bgColor = isSelected
      ? "bg-gray-500 text-white"
      : "bg-green-500 text-white";
    return (
      <button
        key={seat}
        type="button"
        className={`p-2 ${bgColor} rounded-md focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75 hover:bg-opacity-75 ${
          isDisabled ? "cursor-not-allowed" : ""
        }`}
        onClick={() => !isDisabled && handleSeatSelection(seat)}
        disabled={isDisabled}
      >
        {seat}
      </button>
    );
  };

  const seatLayout = [
    {
      type: "First Class",
      rows: [
        ["1A", "1B"],
        ["2A", "2B"],
      ],
    },
    {
      type: "Business Class",
      rows: [
        ["3A", "3B", "3C", "3D"],
        ["4A", "4B", "4C", "4D"],
        ["5A", "5B", "5C", "5D"],
        ["6A", "6B", "6C", "6D"],
        ["7A", "7B", "7C", "7D"],
      ],
    },
    {
      type: "Premium Economy",
      rows: [
        ["8A", "8B", "8C", "8D"],
        ["9A", "9B", "9C", "9D"],
        ["10A", "10B", "10C", "10D"],
        ["11A", "11B", "11C", "11D"],
        ["12A", "12B", "12C", "12D"],
        ["13A", "13B", "13C", "13D"],
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
        className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg font-plus-jakarta-sans"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#164765] border-b pb-3">
          Isi Data Pemesan
        </h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#164765]">
            Nama Lengkap
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
          <label className="block text-sm font-medium text-[#164765]">
            Punya Nama Keluarga?
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
            <label className="block text-sm font-medium text-[#164765]">
              Nama Keluarga
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
          <label className="block text-sm font-medium text-[#164765]">
            Nomor Telepon
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
          <label className="block text-sm font-medium text-[#164765]">
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
        <h2 className="text-3xl font-bold mb-6 text-[#164765] border-b pb-3">
          Isi Data Penumpang
        </h2>
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-[#164765]">
              Data Diri Penumpang {index + 1} - Adult
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#164765]">
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
              <label className="block text-sm font-medium text-[#164765]">
                Nama Lengkap
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
              <label className="block text-sm font-medium text-[#164765]">
                Punya Nama Keluarga?
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
                <label className="block text-sm font-medium text-[#164765]">
                  Nama Keluarga
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
              <label className="block text-sm font-medium text-[#164765]">
                Tanggal Lahir
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
              <label className="block text-sm font-medium text-[#164765]">
                Kewarganegaraan
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
              <label className="block text-sm font-medium text-[#164765]">
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
              <label className="block text-sm font-medium text-[#164765]">
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#164765]">
                Negara Penerbit
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
              <label className="block text-sm font-medium text-[#164765]">
                Berlaku Sampai
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
          </div>
        ))}
        <button
          type="button"
          onClick={addPassenger}
          className="mb-6 px-4 py-2 bg-[#164765] text-white rounded-md hover:bg-[#447C9D] focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75"
        >
          Tambah Penumpang
        </button>

        <h2 className="text-3xl font-bold mb-6 text-[#164765] border-b pb-3">
          Pilih Kursi
        </h2>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {seatLayout.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-2xl font-semibold mb-2 text-[#164765]">
                    {section.type}
                  </h3>
                  <div className="grid grid-cols-7 gap-2">
                    {section.rows.map((row, rowIndex) => (
                      <React.Fragment key={rowIndex}>
                        {row.map((seat, seatIndex) =>
                          seat === "" ? (
                            <div key={seatIndex} className="col-span-1" />
                          ) : (
                            renderSeat(
                              seat,
                              initialClass === "Economy" && index < 1
                            )
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-[#164765] text-white rounded-md hover:bg-[#447C9D] focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75 w-full"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
