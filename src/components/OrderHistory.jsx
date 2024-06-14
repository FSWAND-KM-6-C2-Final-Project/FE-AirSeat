import React, { useState } from "react";
import ArrowLeftIcon from "../icons/arrow-left.svg";
import FilterIcon from "../icons/filter.svg";
import SearchIcon from "../icons/search.svg";
import LocationIcon from "../icons/location.svg";
import LongArrowIcon from "../icons/long_arrow.svg";
import VietnamAirlinesLogo from "../images/vietnam_airlines_logo.png";
import Datepicker from "tailwind-datepicker-react";

const options = {
  title: "Pilih waktu",
  autoHide: false,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white w-50",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-slate-500 text-white",
    input: "",
    inputIcon: "",
    selected: "bg-customBlue2",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-56 right-80",
  defaultDate: new Date("2022-01-01"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

const OrderHistory = () => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    // console.log(selectedDate);
  };

  const handleClose = (state) => {
    setShow(state);
  };
  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };
  const [selectedOrder, setSelectedOrder] = useState({
    status: "Issued",
    month: "January",
    bookingCode: "6723y2GHK",
    totalTime: "4h 0m",
    departureTime: "19:10",
    departureDate: "5 Maret 2023",
    departureAirport: "Jakarta",
    departureAirportName: "Soekarno Hatta - Terminal 1A Domestik",
    arrivalTime: "21:10",
    arrivalDate: "5 Maret 2023",
    arrivalAirport: "Melbourne",
    arrivalAirportName: "Melbourne International Airport",
    flight: "Jet Air-Economy",
    flightNumber: "JT-203",
    passengers: [
      { name: "Mr. Harry Potter", id: "1234567" },
      { name: "Miss Hermione", id: "789658" },
    ],
    priceDetails: {
      adults: "IDR 9.550.000",
      baby: "IDR 0",
      tax: "IDR 300.000",
      total: "IDR 9.850.000",
    },
  });
  const [selectedOrderId, setSelectedOrderId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    {
      id: 1,
      status: "Issued",
      month: "January",
      bookingCode: "6723y2GHK",
      totalTime: "4h 0m",
      departureTime: "19:10",
      departureDate: "5 Maret 2023",
      departureAirport: "Jakarta",
      departureAirportName: "Soekarno Hatta - Terminal 1A Domestik",
      arrivalTime: "21:10",
      arrivalDate: "5 Maret 2023",
      arrivalAirport: "Melbourne",
      arrivalAirportName: "Melbourne International Airport",
      flight: "Jet Air-Economy",
      flightNumber: "JT-203",
      passengers: [
        { name: "Mr. Harry Potter", id: "1234567" },
        { name: "Miss Hermione", id: "789658" },
      ],
      priceDetails: {
        adults: "IDR 9.550.000",
        baby: "IDR 0",
        tax: "IDR 300.000",
        total: "IDR 9.850.000",
      },
    },
    {
      id: 2,
      status: "Unpaid",
      month: "January",
      bookingCode: "6756232OG",
      totalTime: "1h 15m",
      departureTime: "07:00",
      departureDate: "1 Maret 2023",
      departureAirport: "Jakarta",
      departureAirportName: "Soekarno Hatta - Terminal 1A Domestik",
      arrivalTime: "08:15",
      arrivalDate: "1 Maret 2023",
      arrivalAirport: "Bali",
      arrivalAirportName: "Bali International Airport",
      flight: "Jet Air-Business",
      flightNumber: "JT-205",
      passengers: [
        { name: "Mr. Ron Weasley", id: "987654" },
        { name: "Miss Ginny Weasley", id: "654321" },
      ],
      priceDetails: {
        adults: "IDR 3.250.000",
        baby: "IDR 0",
        tax: "IDR 150.000",
        total: "IDR 3.400.000",
      },
    },
    {
      id: 3,
      status: "Canceled",
      month: "February",
      bookingCode: "6OIU965667G",
      totalTime: "1h 15m",
      departureTime: "07:00",
      departureDate: "11 Feb 2023",
      departureAirport: "Jakarta",
      departureAirportName: "Soekarno Hatta - Terminal 1A Domestik",
      arrivalTime: "08:15",
      arrivalDate: "11 Feb 2023",
      arrivalAirport: "Medan",
      arrivalAirportName: "Medan International Airport",
      flight: "Jet Air-Economy",
      flightNumber: "JT-204",
      passengers: [
        { name: "Mr. Ron Weasley", id: "987654" },
        { name: "Miss Ginny Weasley", id: "654321" },
      ],
      priceDetails: {
        adults: "IDR 2.950.000",
        baby: "IDR 0",
        tax: "IDR 75.000",
        total: "IDR 2.950.000",
      },
    },
    {
      id: 4,
      status: "Issued",
      month: "February",
      totalTime: "2h 05m",
      bookingCode: "356875OGPUD",
      departureTime: "17:00",
      departureDate: "8 Feb 2023",
      departureAirport: "Medan",
      departureAirportName: "Medan International Airport",
      arrivalTime: "19:05",
      arrivalDate: "8 Feb 2023",
      arrivalAirport: "Palu",
      arrivalAirportName: "Palu International Airport",
      flight: "Jet Air-Business",
      flightNumber: "JT-205",
      passengers: [
        { name: "Mr. Ron Weasley", id: "987654" },
        { name: "Miss Ginny Weasley", id: "654321" },
      ],
      priceDetails: {
        adults: "IDR 3.950.000",
        baby: "IDR 0",
        tax: "IDR 110.000",
        total: "IDR 4.060.000",
      },
    },
  ];

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setSelectedOrderId(order.id);
  };
  return (
      <>
        {/* Navigasi Beranda dan Filter */}
        <div className="container mx-auto mt-11 shadow-md pb-1">
          <h1 className="font-bold text-lg mb-5">Riwayat Pemesanan</h1>
          <div className="grid grid-cols-12 items-center py-2">
            <div className="col-span-12 md:col-span-9 p-2">
              <div className="w-full bg-customBlue2 h-12 rounded-lg flex items-center">
                <img src={ArrowLeftIcon} className="p-3" alt="" />
                <span className="text-white font-semibold">Beranda</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3 p-2 flex justify-between md:justify-end">
              <div>
                <Datepicker
                  options={options}
                  onChange={handleChange}
                  show={show}
                  setShow={handleClose}
                >
                  <div className="relative">
                    <div
                      onClick={toggleShow}
                      className="border w-[86px] cursor-pointer rounded-2xl border-slate-700 h-8 flex items-center p-1"
                    >
                      <img src={FilterIcon} className="me-2" alt="" />
                      <span className="font-normal">Filter</span>
                    </div>
                  </div>
                </Datepicker>
              </div>
              {/* Modal toggle */}
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="block"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                <img src={SearchIcon} className="my-1 ms-4" alt="" />
              </button>
            </div>
          </div>
        </div>
        {/* End Navigasi Beranda dan Filter */}
    
        {/* Konten History */}
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-7">
              {/* MARET 2023 */}
              <div className="mb-3">
                <h3 className="font-bold mt-2 ms-4 mb-3">Maret 2023</h3>
                {/* Histori dalam sebulan */}
                <div className="ms-0">
                  {/* Card */}
                  {orders
                    .filter((order) => order.month === "January")
                    .map((order) => (
                      <div
                        key={order.id}
                        className={`mx-4 mb-2 ring-1 shadow-md rounded-xl px-4 py-3 cursor-pointer border-2 ${
                          selectedOrderId === order.id ? "border-customBlue2" : ""
                        }`}
                        onClick={() => handleCardClick(order)}
                      >
                        <span
                          className={`text-white px-3 py-1 rounded-2xl ${
                            order.status === "Issued"
                              ? "bg-customGreen1"
                              : order.status === "Unpaid"
                              ? "bg-red-600"
                              : "bg-gray-400"
                          }`}
                        >
                          {order.status}
                        </span>
                        <div className="grid grid-cols-12 my-4 gap-12 place-content-between justify-between">
                          <div className="col-span-4 flex items-start justify-center">
                            <img src={LocationIcon} alt="" />
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">
                                {order.departureAirport.split(" - ")[0]}
                              </h5>
                              <p className="text-sm">{order.departureDate}</p>
                              <p className="text-sm">{order.departureTime}</p>
                            </span>
                          </div>
                          <div className="col-span-4 text-center">
                            <span>{order.totalTime}</span>
                            <img src={LongArrowIcon} alt="" />
                          </div>
                          <div className="col-span-4 flex items-start justify-center">
                            <img src={LocationIcon} alt="" />
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">
                                {order.arrivalAirport.split(" - ")[0]}
                              </h5>
                              <p className="text-sm">{order.arrivalDate}</p>
                              <p className="text-sm">{order.arrivalTime}</p>
                            </span>
                          </div>
                        </div>
                        <hr className="w-[94%] mx-auto border" />
                        <div className="grid grid-cols-12 my-4 gap-12 place-content-between justify-between ">
                          <div className="col-span-4 flex items-start justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">Booking Code:</h5>
                              <p className="text-sm">{order.bookingCode}</p>
                            </span>
                          </div>
                          <div className="col-span-4 flex items-start justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">Class:</h5>
                              <p className="text-sm">Economy</p>
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold text-customBlue1">
                                {order.priceDetails.total}
                              </h5>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* End Histori dalam sebulan */}
              </div>
              {/* FEBRUARI 2023 */}
              <div className="mb-3">
                <h3 className="font-bold mt-2 ms-4 mb-3">Februari 2023</h3>
                {/* Histori dalam sebulan */}
                <div className="ms-0">
                  {/* Card */}
                  {orders
                    .filter((order) => order.month === "February")
                    .map((order) => (
                      <div
                        key={order.id}
                        className={`mx-4 mb-2 ring-1 shadow-md rounded-xl px-4 py-3 cursor-pointer border-2 ${
                          selectedOrderId === order.id ? "border-customBlue2" : ""
                        }`}
                        onClick={() => handleCardClick(order)}
                      >
                        <span
                          className={`text-white px-3 py-1 rounded-2xl ${
                            order.status === "Issued"
                              ? "bg-customGreen1"
                              : order.status === "Unpaid"
                              ? "bg-red-600"
                              : "bg-gray-400"
                          }`}
                        >
                          {order.status}
                        </span>
                        <div className="grid grid-cols-12 my-4 gap-12 place-content-between justify-between">
                          <div className="col-span-4 flex items-start justify-center">
                            <img src={LocationIcon} alt="" />
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">
                                {order.departureAirport.split(" - ")[0]}
                              </h5>
                              <p className="text-sm">{order.departureDate}</p>
                              <p className="text-sm">{order.departureTime}</p>
                            </span>
                          </div>
                          <div className="col-span-4 text-center">
                            <span>4h 0m</span>
                            <img src={LongArrowIcon} alt="" />
                          </div>
                          <div className="col-span-4 flex items-start justify-center">
                            <img src={LocationIcon} alt="" />
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">
                                {order.arrivalAirport.split(" - ")[0]}
                              </h5>
                              <p className="text-sm">{order.arrivalDate}</p>
                              <p className="text-sm">{order.arrivalTime}</p>
                            </span>
                          </div>
                        </div>
                        <hr className="w-[94%] mx-auto border" />
                        <div className="grid grid-cols-12 my-4 gap-12 place-content-between justify-between ">
                          <div className="col-span-4 flex items-start justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">Booking Code:</h5>
                              <p className="text-sm">{order.bookingCode}</p>
                            </span>
                          </div>
                          <div className="col-span-4 flex items-start justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">Class:</h5>
                              <p className="text-sm">Economy</p>
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold text-customBlue1">
                                {order.priceDetails.total}
                              </h5>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* End Histori dalam sebulan */}
              </div>
              {/* JANUARI 2023 */}
              <div className="mb-3">
                <h3 className="font-bold mt-2 ms-4 mb-3">Januari 2023</h3>
                {/* Histori dalam sebulan */}
                <div className="ms-0">
                  {/* Card */}
                  {orders
                    .filter((order) => order.month === "January")
                    .map((order) => (
                      <div
                        key={order.id}
                        className={`mx-4 mb-2 ring-1 shadow-md rounded-xl px-4 py-3 cursor-pointer border-2 ${
                          selectedOrderId === order.id ? "border-customBlue2" : ""
                        }`}
                        onClick={() => handleCardClick(order)}
                      >
                        <span
                          className={`text-white px-3 py-1 rounded-2xl ${
                            order.status === "Issued"
                              ? "bg-customGreen1"
                              : order.status === "Unpaid"
                              ? "bg-red-600"
                              : "bg-gray-400"
                          }`}
                        >
                          {order.status}
                        </span>
                        <div className="grid grid-cols-12 my-4 gap-12 place-content-between justify-between">
                          <div className="col-span-4 flex items-start justify-center">
                            <img src={LocationIcon} alt="" />
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">
                                {order.departureAirport.split(" - ")[0]}
                              </h5>
                              <p className="text-sm">{order.departureDate}</p>
                              <p className="text-sm">{order.departureTime}</p>
                            </span>
                          </div>
                          <div className="col-span-4 text-center">
                            <span>4h 0m</span>
                            <img src={LongArrowIcon} alt="" />
                          </div>
                          <div className="col-span-4 flex items-start justify-center">
                            <img src={LocationIcon} alt="" />
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">
                                {order.arrivalAirport.split(" - ")[0]}
                              </h5>
                              <p className="text-sm">{order.arrivalDate}</p>
                              <p className="text-sm">{order.arrivalTime}</p>
                            </span>
                          </div>
                        </div>
                        <hr className="w-[94%] mx-auto border" />
                        <div className="grid grid-cols-12 my-4 gap-12 place-content-between justify-between ">
                          <div className="col-span-4 flex items-start justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">Booking Code:</h5>
                              <p className="text-sm">{order.bookingCode}</p>
                            </span>
                          </div>
                          <div className="col-span-4 flex items-start justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold ">Class:</h5>
                              <p className="text-sm">Economy</p>
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center justify-center">
                            <span className="ms-2 -mt-[2px]">
                              <h5 className="font-bold text-customBlue1">
                                {order.priceDetails.total}
                              </h5>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* End Histori dalam sebulan */}
              </div>
              {/* End Histori */}
            </div>
            <div className="col-span-12 md:col-span-5">
              {/* Detail Pesanan */}
              {selectedOrder && (
                <div className="col-span-12 md:col-span-5">
                <div className="mx-3 mt-5">
                  <div className="grid grid-cols-12 justify-between">
                    <div className="col-span-6">
                      <h3 className="font-bold">Detail Pesanan</h3>
                    </div>
                    {/* badge */}
                    <div className="col-span-6 flex justify-end me-2">
                      <span
                        className={`text-white px-3 py-1 rounded-2xl ${
                          selectedOrder.status === "Issued"
                            ? "bg-customGreen1"
                            : selectedOrder.status === "Unpaid"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                  <span>
                    Booking Code:{" "}
                    <strong className="text-customBlue2">{selectedOrder.bookingCode}</strong>
                  </span>
                  <div className="grid grid-cols-12 mt-2 justify-between items-center">
                    <div className="col-span-6">
                      <h3 className="font-bold">{selectedOrder.departureTime}</h3>
                    </div>
                    <div className="col-span-6 flex justify-end me-2">
                      <span className="text-customBlue2 font-bold text-sm">
                        Keberangkatan
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span>{selectedOrder.departureDate}</span>
                    <br />
                    <span className="font-semibold">{selectedOrder.departureAirportName}</span>
                  </div>
                  <hr className="mt-4 border mx-auto w-[94.5%]" />
                  <div className="py-2">
                    <div className="grid grid-cols-12 justify-center items-center">
                      <div className="col-span-2 md:col-span-1 grid items-center">
                        <img src={VietnamAirlinesLogo} alt="" />
                      </div>
                      <div className="col-span-10 md:col-span-11 grid text-sm font-semibold">
                        <span className="font-bold">{selectedOrder.flight}</span>
                        <span className="font-bold mb-5">{selectedOrder.flightNumber}</span>
                        <span className="font-bold">Informasi:</span>
                        {selectedOrder.passengers.map((passenger, index) => (
                          <div key={index}>
                            <span className="text-customBlue2">
                              Penumpang {index + 1}: {passenger.name}
                            </span>
                            <br />
                            <span>ID: {passenger.id} </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr className="mt-1 border w-[94.5%] mb-3 mx-auto" />
                  <div className="grid grid-cols-12 mt-2 justify-between items-start text-sm">
                    <div className="col-span-8 grid">
                      <h3 className="font-bold">{selectedOrder.arrivalTime}</h3>
                      <span>{selectedOrder.arrivalDate}</span>
                      <span className="font-semibold">{selectedOrder.arrivalAirportName}</span>
                    </div>
                    <div className="col-span-4 flex justify-end me-2">
                      <span className="text-customBlue2 font-bold text-sm">Kedatangan</span>
                    </div>
                  </div>
                  <hr className="mt-4 border w-[94.5%] mb-2 mx-auto" />
                  <div className="text-sm mx-4">
                    <span className="font-bold">Rincian Harga</span>
                    <div className="grid grid-cols-12 justify-between">
                      <div className="col-span-6">2 Adults</div>
                      <div className="col-span-6 text-end">{selectedOrder.priceDetails.adults}</div>
                      <div className="col-span-6">1 Baby</div>
                      <div className="col-span-6 text-end">{selectedOrder.priceDetails.baby}</div>
                      <div className="col-span-6">Tax</div>
                      <div className="col-span-6 text-end">{selectedOrder.priceDetails.tax}</div>
                    </div>
                  </div>
                  <hr className="mt-4 border w-[94.5%] mb-2 mx-auto" />
                  <div className="grid grid-cols-12 justify-between font-bold text-lg mx-4 mb-8">
                    <div className="col-span-6">Total</div>
                    <div className="col-span-6 text-end text-customBlue1">
                      {selectedOrder.priceDetails.total}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`text-white w-full ${
                      selectedOrder.status === "Issued"
                        ? "bg-customBlue2 hover:bg-customBlue1 focus:ring-blue-300"
                        : selectedOrder.status === "Unpaid"
                        ? "bg-red-600 hover:bg-red-800 focus:ring-red-300"
                        : "hidden"
                    } focus:ring-4 h-14 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                  >
                    {selectedOrder.status === "Issued" ? "Cetak Tiket" : "Lanjut Bayar"}
                  </button>
                </div>
              </div>
              )}
              {/* End Detail Pesanan */}
            </div>
          </div>
        </div>
        {/* End Konten History */}
      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 left-[18.5rem] -top-3 w-[450px] max-w-2xl h-80">
            {/* Modal content */}
            <div className="relative pb-28 bg-white rounded-xl shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-stretch p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  <form class="w-80 mx-auto">
                    <label
                      for="default-search"
                      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          class="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Masukkan Nomor Penerbangan"
                        required
                      />
                    </div>
                  </form>
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-4 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsModalOpen(false)}
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
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 text-sm">
                <div className="flex justify-between mb-6">
                  <span className="text-base font-semibold leading-relaxed text-black-500 dark:text-black-400">
                    Pencarian terkini
                  </span>
                  <span className="text-red-600 font-semibold">Hapus</span>
                </div>
                <div className="grid grid-cols-12 justify-between">
                  <div className="col-span-6">1234ABC</div>
                  <div className="col-span-6 flex justify-end items-center">
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
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                  <hr className="col-span-12 border my-2" />
                  <div className="col-span-6">7UY71912</div>
                  <div className="col-span-6 flex justify-end items-center">
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
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                  <hr className="col-span-12 border my-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
