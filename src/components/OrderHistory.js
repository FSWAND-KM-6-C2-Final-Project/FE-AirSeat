import React, { useState } from "react";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowLeft,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const bookings = [
    {
      status: "Issued",
      departure: "Jakarta",
      departureDate: "2023-03-05",
      departureTime: "19:10",
      duration: "4h 0m",
      arrival: "Melbourne",
      arrivalDate: "2023-03-05",
      arrivalTime: "21:10",
      bookingCode: "6723y2GHK",
      class: "Economy",
      price: "IDR 9.850.000",
      passengers: [
        { name: "Mr. Harry Potter", id: "1234567" },
        { name: "Miss Hermione", id: "789658" },
      ],
      flightDetails: {
        flightNumber: "JT - 203",
        departureAirport: "Soekarno Hatta - Terminal 1A Domestik",
        arrivalAirport: "Melbourne International Airport",
      },
      priceBreakdown: {
        adults: "IDR 9.550.000",
        baby: "IDR 0",
        tax: "IDR 300.000",
        total: "IDR 9.850.000",
      },
    },
    {
      status: "Unpaid",
      departure: "Jakarta",
      departureDate: "2023-03-01",
      departureTime: "07:00",
      duration: "1h 15m",
      arrival: "Bali",
      arrivalDate: "2023-03-01",
      arrivalTime: "08:15",
      bookingCode: "67652320Q",
      class: "Business",
      price: "IDR 3.250.000",
    },
    {
      status: "Cancelled",
      departure: "Jakarta",
      departureDate: "2023-02-11",
      departureTime: "07:00",
      duration: "1h 15m",
      arrival: "Medan",
      arrivalDate: "2023-02-11",
      arrivalTime: "08:15",
      bookingCode: "60Uj956567G",
      class: "Economy",
      price: "IDR 2.950.000",
    },
    {
      status: "Issued",
      departure: "Medan",
      departureDate: "2023-02-08",
      departureTime: "17:00",
      duration: "2h 05m",
      arrival: "Palu",
      arrivalDate: "2023-02-08",
      arrivalTime: "19:05",
      bookingCode: "35687SOGPUD",
      class: "Business",
      price: "IDR 4.060.000",
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadge = (status) => {
    const statusClasses = {
      Issued: "bg-green-500 text-white",
      Unpaid: "bg-red-500 text-white",
      Cancelled: "bg-gray-500 text-white",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-bold ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <header className="p-10 h-44 mx-auto shadow-md">
        <h1 className="text-2xl font-bold sm:ml-6 md:ml-12 xl:ml-24 2xl:ml-32">
          Riwayat Pemesanan
        </h1>
        <div className="flex items-center space-x-2 mt-8 md:mt-8 lg:mt-8 xl:mt-8">
          <Link
            to="/"
            className="flex items-center mr-2 bg-customBlue2 text-white px-4 py-3 rounded-xl w-2/3 sm:w-1/2 md:w-6/12 lg:w-8/12 sm:ml-16 md:ml-24 xl:ml-36 2xl:ml-44 hover:bg-customBlue1"
          >
            <FaArrowLeft className="mr-2" />
            Beranda
          </Link>
          <button className="flex items-center border border-customBlue2 px-4 py-1 rounded-full cursor-pointer">
            <FaFilter className="mr-2 text-gray-500" /> Filter
          </button>
          <button className="flex items-center px-4 py-2 cursor-pointer">
            <FaSearch size={24} className="text-customBlue2" />
          </button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 pr-4">
            <h2 className="text-xl font-bold mb-4">Maret 2023</h2>
            {bookings
              .filter(
                (booking) => new Date(booking.departureDate).getMonth() === 2
              )
              .map((booking, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 rounded-lg border shadow-md bg-white"
                  onClick={() => setSelectedOrder(booking)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      <div>
                        <p className="font-bold">{booking.departure}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.departureDate).toLocaleDateString()}{" "}
                          {booking.departureTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500">
                        {booking.duration}
                      </span>
                      <FaArrowRight className="text-gray-500" />
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      <div>
                        <p className="font-bold">{booking.arrival}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.arrivalDate).toLocaleDateString()}{" "}
                          {booking.arrivalTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
                    <div>
                      <p className="text-sm">
                        <span className="font-bold">Booking Code:</span>{" "}
                        {booking.bookingCode}
                      </p>
                      <p className="text-sm">
                        <span className="font-bold">Class:</span>{" "}
                        {booking.class}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-blue-500">
                      {booking.price}
                    </span>
                  </div>
                </div>
              ))}
            <h2 className="text-xl font-bold mb-4 mt-8">Februari 2023</h2>
            {bookings
              .filter(
                (booking) => new Date(booking.departureDate).getMonth() === 1
              )
              .map((booking, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 rounded-lg border shadow-md bg-white"
                  onClick={() => setSelectedOrder(booking)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      <div>
                        <p className="font-bold">{booking.departure}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.departureDate).toLocaleDateString()}{" "}
                          {booking.departureTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500">
                        {booking.duration}
                      </span>
                      <FaArrowRight className="text-gray-500" />
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      <div>
                        <p className="font-bold">{booking.arrival}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.arrivalDate).toLocaleDateString()}{" "}
                          {booking.arrivalTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
                    <div>
                      <p className="text-sm">
                        <span className="font-bold">Booking Code:</span>{" "}
                        {booking.bookingCode}
                      </p>
                      <p className="text-sm">
                        <span className="font-bold">Class:</span>{" "}
                        {booking.class}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-blue-500">
                      {booking.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="lg:w-1/3">
            {selectedOrder && (
              <div className="p-4 mb-4 rounded-lg border shadow-md bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">Detail Pesanan</h3>
                  <span
                    className={`text-white px-3 py-1 rounded-full ${
                      getStatusBadge(selectedOrder.status).props.className
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p>
                  <strong className="text-customBlue2">Booking Code:</strong>{" "}
                  {selectedOrder.bookingCode}
                </p>
                <div className="mt-2">
                  <h3 className="font-bold">{selectedOrder.departureTime}</h3>
                  <p>
                    {new Date(selectedOrder.departureDate).toLocaleDateString()}
                  </p>
                  <p className="font-semibold">
                    {selectedOrder.flightDetails?.departureAirport}
                  </p>
                </div>
                <hr className="mt-4 border-gray-300" />
                <div className="py-2">
                  <div className="flex items-center">
                    <div className="ml-2">
                      <p className="font-bold">
                        {selectedOrder.flightDetails?.flightNumber}
                      </p>
                      <p className="font-semibold">Informasi:</p>
                      {selectedOrder.passengers?.map((passenger, index) => (
                        <div key={index}>
                          <p className="text-customBlue2">
                            Penumpang {index + 1}: {passenger.name}
                          </p>
                          <p>ID: {passenger.id}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="mt-1 border-gray-300" />
                <div className="mt-2">
                  <h3 className="font-bold">{selectedOrder.arrivalTime}</h3>
                  <p>
                    {new Date(selectedOrder.arrivalDate).toLocaleDateString()}
                  </p>
                  <p className="font-semibold">
                    {selectedOrder.flightDetails?.arrivalAirport}
                  </p>
                </div>
                <hr className="mt-4 border-gray-300" />
                <div className="text-sm mt-4">
                  <p className="font-bold">Rincian Harga</p>
                  <div className="flex justify-between">
                    <p>2 Adults</p>
                    <p>{selectedOrder.priceBreakdown?.adults}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>1 Baby</p>
                    <p>{selectedOrder.priceBreakdown?.baby}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax</p>
                    <p>{selectedOrder.priceBreakdown?.tax}</p>
                  </div>
                </div>
                <hr className="mt-4 border-gray-300" />
                <div className="flex justify-between font-bold text-lg mt-4">
                  <p>Total</p>
                  <p className="text-customBlue1">
                    {selectedOrder.priceBreakdown?.total}
                  </p>
                </div>
                <button
                  type="button"
                  className={`w-full mt-4 h-14 font-medium rounded-lg text-xl px-5 py-2.5 focus:outline-none ${
                    selectedOrder.status === "Issued"
                      ? "bg-customBlue2 hover:bg-customBlue1 focus:ring-blue-300"
                      : selectedOrder.status === "Unpaid"
                      ? "bg-red-600 hover:bg-red-800 focus:ring-red-300"
                      : "hidden"
                  }`}
                >
                  {selectedOrder.status === "Issued"
                    ? "Cetak Tiket"
                    : "Lanjut Bayar"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
