import React, { useState } from "react";
import ArrowLeftIcon from "../icons/arrow-left.svg";
import FilterIcon from "../icons/filter.svg";
import SearchIcon from "../icons/search.svg";
import LocationIcon from "../icons/location.svg";
import LongArrowIcon from "../icons/long_arrow.svg";
import VietnamAirlinesLogo from "../images/vietnam_airlines_logo.png";

const OrderHistory = () => {
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
      <div className="container mx-auto px-60 mt-11 shadow-md pb-1">
        <h1 className="font-bold text-lg mb-5">Riwayat Pemesanan</h1>
        <div class="grid grid-cols-12 items-center py-2">
          <div class="col-span-9 p-2">
            <div className="w-full bg-customBlue2 h-12 rounded-lg flex items-center">
              <img src={ArrowLeftIcon} className="p-3" alt="" />
              <span className="text-white font-semibold">Beranda</span>
            </div>
          </div>
          <div class="col-span-3 p-2 flex">
            <div className="border w-[86px] rounded-2xl border-slate-700 h-8 flex items-center p-1">
              <img src={FilterIcon} className="me-2" alt="" />
              <span className="font-normal">Filter</span>
            </div>
            <img src={SearchIcon} className="my-1 ms-4" alt="" />
          </div>
        </div>
      </div>
      {/* End Navigasi Beranda dan Filter */}

      {/* Konten History */}
      <div className="container mx-auto px-[15.5rem]">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-7 ">
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
          </div>
          {/* Detail Pesanan */}
          <div className="col-span-5">
            <div className="mx-3 mt-5">
              <div className="grid grid-cols-12 justify-between">
                <div className="col-span-6">
                  <h3 className="font-bold">Detail Pesanan</h3>
                </div>
                {/* badge */}
                <div className="col-span-6 flex justify-end me-2">
                  <span
                    className={`text-white  px-3 py-1 rounded-2xl ${
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
                <strong className="text-customBlue2">
                  {selectedOrder.bookingCode}
                </strong>
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
                <span className="font-semibold">
                  {selectedOrder.departureAirportName}
                </span>
              </div>
              <hr className="mt-4 border mx-auto w-[94.5%]" />
              <div className="py-2">
                <div className="grid grid-cols-12 justify-center items-center">
                  <div className="col-span-1 grid items-center">
                    <img src={VietnamAirlinesLogo} alt="" />
                  </div>
                  <div className="col-span-11 grid text-sm font-semibold">
                    <span className="font-bold">{selectedOrder.flight}</span>
                    <span className="font-bold mb-5">
                      {selectedOrder.flightNumber}
                    </span>
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
                  <span className="font-semibold">
                    {selectedOrder.arrivalAirportName}
                  </span>
                </div>
                <div className="col-span-4 flex justify-end me-2">
                  <span className="text-customBlue2 font-bold text-sm">
                    Kedatangan
                  </span>
                </div>
              </div>
              <hr className="mt-4 border w-[94.5%] mb-2 mx-auto" />
              <div className="text-sm mx-4">
                <span className="font-bold">Rincian Harga</span>
                <div className="grid grid-cols-12 justify-between">
                  <div className="col-span-6">2 Adults</div>
                  <div className="col-span-6 text-end">
                    {selectedOrder.priceDetails.adults}
                  </div>
                  <div className="col-span-6">1 Baby</div>
                  <div className="col-span-6 text-end">
                    {selectedOrder.priceDetails.baby}
                  </div>
                  <div className="col-span-6">Tax</div>
                  <div className="col-span-6 text-end">
                    {selectedOrder.priceDetails.tax}
                  </div>
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
                class={`text-white w-full ${
                  selectedOrder.status === "Issued"
                    ? "bg-customBlue2 hover:bg-customBlue1 focus:ring-blue-300"
                    : selectedOrder.status === "Unpaid"
                    ? "bg-red-600 hover:bg-red-800 focus:ring-red-300"
                    : "hidden"
                } focus:ring-4 h-14 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2  focus:outline-none  `}
              >
                {selectedOrder.status === "Issued"
                  ? "Cetak Tiket"
                  : "Lanjut Bayar"}
              </button>
            </div>
          </div>
          {/* Detail Pesanan */}
        </div>
      </div>
      {/* End Konten History */}
    </>
  );
};

export default OrderHistory;
