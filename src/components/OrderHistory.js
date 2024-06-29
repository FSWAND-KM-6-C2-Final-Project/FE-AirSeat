import React, { useEffect, useState } from "react";
import FilterIcon from "../icons/filter.svg";
import SearchIcon from "../icons/search.svg";
import LocationIcon from "../icons/location.svg";
import LongArrowIcon from "../icons/long_arrow.svg";
import { IoMdClose } from "react-icons/io";
import { seoTitle } from "string-fn";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiX } from "react-icons/fi";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../calendar.css";
import { cancelBooking, getBookingHistory } from "../services/booking.service";
import { getFlightById } from "../services/flight.service";
import Swal from "sweetalert2";

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedOrderId, setSelectedOrderId] = useState(1);
  const [searchParams, createSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDateOpen, setIsModalDateOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [bookingCode, setBookingCode] = useState("");
  const dayjs = require("dayjs");
  const navigate = useNavigate();

  useEffect(() => {
    const bookCode = searchParams.get("bookingCode");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    fetchBookingHistory(bookCode, startDate, endDate);
  }, [searchParams]);

  const handleSearchBookingCode = () => {
    setSelectedOrder();
    setSelectedOrderId(1);

    if (bookingCode && !selected.from && !selected.to) {
      navigate(`/order-history?bookingCode=${bookingCode}`);
    } else if (bookingCode && selected.from && selected.to) {
      navigate(
        `/order-history?bookingCode=${bookingCode}&startDate=${dayjs(
          selected.from
        ).format("DD-MM-YYYY")}&endDate=${dayjs(selected.to).format(
          "DD-MM-YYYY"
        )}`
      );
    }
    setIsModalOpen(false);
  };

  const handleClickSave = () => {
    if (!bookingCode && selected.from && selected.to) {
      navigate(
        `/order-history?startDate=${dayjs(selected.from).format(
          "DD-MM-YYYY"
        )}&endDate=${dayjs(selected.to).format("DD-MM-YYYY")}`
      );
    } else if (bookingCode && selected.from && selected.to) {
      navigate(
        `/order-history?bookingCode=${bookingCode}&startDate=${dayjs(
          selected.from
        ).format("DD-MM-YYYY")}&endDate=${dayjs(selected.to).format(
          "DD-MM-YYYY"
        )}`
      );
    }
    setIsModalDateOpen(false);
  };

  const handleCancelBooking = (order) => {
    Swal.fire({
      title: "Are you sure you want to cancel? This action cannot be undone.",
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: "Cancel Booking",
      showCancelButton: true,
      confirmButtonColor: "#e02424",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const response = await cancelBooking(order.booking_code, token);
          if (response) {
            Swal.fire({
              title: "Booking successfully cancelled",
              icon: "success",
              showConfirmButton: true,
              confirmButtonText: "Ok",
              confirmButtonColor: "#447C9D",
            }).then((result) => {
              if (result.isConfirmed) {
                fetchBookingHistory();
                setSelectedOrder();
                setSelectedOrderId(1);
              } else if (result.dismiss) {
                fetchBookingHistory();
                setSelectedOrder();
                setSelectedOrderId(1);
              }
            });
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };

  const initialRange = {
    from: null,
    to: null,
  };
  const [selected, setSelected] = useState([
    { from: undefined, to: undefined },
  ]);

  const handlePrintTicket = (booking_code) => {
    console.log("print ticket");
    console.log(booking_code);
  };

  const handlePayNow = (order) => {
    let departurePrice;
    let returnPrice;

    if (order.classes === "economy") {
      departurePrice = order.flight.price_economy;
    } else if (order.classes === "premium_econony") {
      departurePrice = order.flight.price_premium_economy;
    } else if (order.classes === "business") {
      departurePrice = order.flight.price_business;
    } else if (order.classes === "first_class") {
      departurePrice = order.flight.price_first_class;
    } else {
      departurePrice = order.flight.price_economy;
    }

    if (order.returnFlight) {
      if (order.classes === "economy") {
        returnPrice = order.returnFlight.price_economy;
      } else if (order.classes === "premium_econony") {
        returnPrice = order.returnFlight.price_premium_economy;
      } else if (order.classes === "business") {
        returnPrice = order.returnFlight.price_business;
      } else if (order.classes === "first_class") {
        returnPrice = order.returnFlight.price_first_class;
      } else {
        returnPrice = order.returnFlight.price_economy;
      }
    }

    navigate("/payment", {
      state: {
        payment_token: order.payment_token,
        booking_code: order.booking_code,
        airline_name: order.flight.airline.airline_name,
        airline_picture: order.flight.airline.airline_picture,
        flight_number: order.flight.flight_number,
        departure_time: order.flight.departure_time,
        arrival_time: order.flight.arrival_time,
        information: order.flight.information,
        adult: order.returnFlight
          ? order.bookingDetail.filter(
              (detail) => detail.passenger.passenger_type === "adult"
            ).length / 2
          : order.bookingDetail.filter(
              (detail) => detail.passenger.passenger_type === "adult"
            ).length,
        infant: order.returnFlight
          ? order.bookingDetail.filter(
              (detail) => detail.passenger.passenger_type === "infant"
            ).length / 2
          : order.bookingDetail.filter(
              (detail) => detail.passenger.passenger_type === "infant"
            ).length,
        children: order.returnFlight
          ? order.bookingDetail.filter(
              (detail) => detail.passenger.passenger_type === "children"
            ).length / 2
          : order.bookingDetail.filter(
              (detail) => detail.passenger.passenger_type === "children"
            ).length,
        departure_airport_city_code:
          order.flight.departureAirport.airport_city_code,
        arrival_airport_city_code:
          order.flight.arrivalAirport.airport_city_code,
        seatClass: order.classes,
        price: departurePrice,
        departure_airport: order.flight.departureAirport.airport_name,
        departure_terminal: order.flight.departure_terminal,
        arrival_airport: order.flight.arrivalAirport.airport_name,
        return_flight_number: order.returnFlight
          ? order.returnFlight.flight_number
          : undefined,
        return_airline_name: order.returnFlight
          ? order.returnFlight.airline.airline_name
          : undefined,
        return_information: order.returnFlight
          ? order.returnFlight.information
          : undefined,
        return_departure_airport: order.returnFlight
          ? order.returnFlight.departureAirport.airport_name
          : undefined,
        return_departure_airport_city_code: order.returnFlight
          ? order.returnFlight.departureAirport.airport_city_code
          : undefined,
        return_departure_terminal: order.returnFlight
          ? order.returnFlight.departure_terminal
          : undefined,
        return_departure_time: order.returnFlight
          ? order.returnFlight.departure_time
          : undefined,
        return_arrival_airport: order.returnFlight
          ? order.returnFlight.arrivalAirport.airport_name
          : undefined,
        return_arrival_airport_city_code: order.returnFlight
          ? order.returnFlight.arrivalAirport.airport_city_code
          : undefined,
        return_airline_picture: order.returnFlight
          ? order.returnFlight.airline.airline_picture
          : undefined,
        return_arrival_time: order.returnFlight
          ? order.returnFlight.arrival_time
          : undefined,
        return_price: returnPrice,
      },
    });
  };

  const parsePrice = (classes, data) => {
    let price = 0;
    if (classes === "economy") {
      price = data.price_economy;
    } else if (classes === "premium_econony") {
      price = data.price_premium_economy;
    } else if (classes === "business") {
      price = data.price_business;
    } else if (classes === "first_class") {
      price = data.price_first_class;
    } else {
      price = data.price_economy;
    }

    return parseFloat(price);
  };

  const handleToggleFilter = () => {
    isModalDateOpen === true
      ? setIsModalDateOpen(false)
      : setIsModalDateOpen(true);
  };
  const handleToggleSearch = () => {
    isModalOpen === true ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const [orders, setOrders] = useState([]);
  const groupData = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const date = new Date(item.created_at);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const key = `${year}-${month}`;
      if (!groupedData[key]) {
        groupedData[key] = {
          month: month,
          year: year.toString(),
          data: [],
        };
      }
      groupedData[key].data.push(item);
    });

    return Object.values(groupedData);
  };

  const fetchBookingHistory = async (
    bookingCode = undefined,
    startDate = undefined,
    endDate = undefined
  ) => {
    setIsFetching(true);
    try {
      const token = localStorage.getItem("token");
      const response = await getBookingHistory(
        token,
        bookingCode,
        startDate,
        endDate
      );

      if (response) {
        setOrders(groupData(response.data.booking));

        console.log(groupData(response.data.booking));
      }
    } catch (err) {
      console.log(err.message);
    }
    setIsFetching(false);
  };

  const handleCardClick = (order) => {
    console.log(JSON.stringify(order));
    setSelectedOrder(order);
    setSelectedOrderId(order.booking_code);
  };

  const formatDate = (date) => dayjs(date).format("DD-MM-YYYY");

  return (
    <>
      <div className="p-4 md:p-10 shadow-md">
        <h2 className="font-bold text-2xl text-left ml-2 sm:ml-10 md:ml-6 lg:ml-11  xl:ml-28 2xl:ml-36">
          Order History
        </h2>
        <div className="flex justify-center md:justify-start">
          <Link
            to="/"
            className="flex items-center bg-customBlue2 text-white px-4 py-3  rounded-xl w-1/2 md:w-3/5 lg:w-8/12 md:ml-16 lg:ml-20 xl:ml-36 2xl:ml-44 mr-4 mt-4 md:mt-8 font-semibold hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            Homepage
          </Link>
          <div className="flex items-center mt-4 md:mt-8 space-x-4">
            <div className="relative">
              <div
                onClick={handleToggleFilter}
                className="border border-customBlue1 cursor-pointer rounded-2xl  h-8 flex items-center px-3 hover:bg-gray-200 transition"
              >
                <img src={FilterIcon} className="mr-2" alt="Filter Icon" />
                <span className="font-normal">Filter</span>
              </div>
            </div>
            <button
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              type="button"
              onClick={handleToggleSearch}
              className="relative"
            >
              <img src={SearchIcon} className="h-7 w-7" alt="Search Icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Konten History */}
      <div className="container p-4 space-y-2 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-7">
            {/* MARET 2023 */}
            {orders.map((group) => (
              <div className="mb-3" key={`${group.year}-${group.month}`}>
                <h3 className="font-bold mt-2 ms-4 mb-3">
                  {dayjs(group.month).format("MMMM")}{" "}
                  {dayjs(group.year).format("YYYY")}
                </h3>
                <ul>
                  {group.data.map((order) => (
                    <div
                      key={order.booking_code}
                      className={`mx-4 mb-2 ring-1 shadow-md rounded-xl px-4 py-3 cursor-pointer border-2 ${
                        selectedOrderId === order.booking_code
                          ? "border-customBlue2"
                          : ""
                      }`}
                      onClick={() => handleCardClick(order)}
                    >
                      <span
                        className={`text-white px-3 py-1 rounded-2xl  ${
                          order.booking_status === "issued"
                            ? "bg-[#56bf58]"
                            : order.booking_status === "unpaid"
                            ? "bg-red-600"
                            : order.booking_status === "cancelled"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {seoTitle(order.booking_status)}
                      </span>
                      <div className="grid grid-cols-12 my-4 gap-4">
                        <div className="col-span-4 text-center">
                          <div className="flex items-center justify-center">
                            <img
                              src={LocationIcon}
                              alt="Location Icon"
                              className="inline-block mr-2"
                            />
                            <span className="block font-bold">
                              {order.flight.departureAirport.airport_city}
                            </span>
                          </div>
                          <p className="text-sm">
                            {dayjs(order.flight.departure_time).format(
                              "DD MMMM YYYY"
                            )}
                          </p>
                          <p className="text-sm">
                            {dayjs(order.flight.departure_time).format("HH:mm")}
                          </p>
                        </div>
                        <div className="col-span-4 text-center flex flex-col items-center justify-center">
                          <span>{order.duration}</span>
                          <img src={LongArrowIcon} alt="Arrow Icon" />
                        </div>
                        <div className="col-span-4 text-center">
                          <div className="flex items-center justify-center">
                            <img
                              src={LocationIcon}
                              alt="Location Icon"
                              className="inline-block mr-2"
                            />
                            <span className="block font-bold">
                              {order.flight.arrivalAirport.airport_city}
                            </span>
                          </div>
                          <p className="text-sm">
                            {dayjs(order.flight.arrival_time).format(
                              "DD MMMM YYYY"
                            )}
                          </p>
                          <p className="text-sm">
                            {dayjs(order.flight.arrival_time).format("HH:mm")}
                          </p>
                        </div>
                      </div>
                      {order.returnFlight && (
                        <>
                          <div className="grid grid-cols-12 my-4 gap-4">
                            <div className="col-span-4 text-center">
                              <div className="flex items-center justify-center">
                                <img
                                  src={LocationIcon}
                                  alt="Location Icon"
                                  className="inline-block mr-2"
                                />
                                <span className="block font-bold">
                                  {
                                    order.returnFlight.departureAirport
                                      .airport_city
                                  }
                                </span>
                              </div>
                              <p className="text-sm">
                                {dayjs(
                                  order.returnFlight.departure_time
                                ).format("DD MMMM YYYY")}
                              </p>
                              <p className="text-sm">
                                {dayjs(
                                  order.returnFlight.departure_time
                                ).format("HH:mm")}
                              </p>
                            </div>
                            <div className="col-span-4 text-center flex flex-col items-center justify-center">
                              <span>{order.duration}</span>
                              <img src={LongArrowIcon} alt="Arrow Icon" />
                            </div>
                            <div className="col-span-4 text-center">
                              <div className="flex items-center justify-center">
                                <img
                                  src={LocationIcon}
                                  alt="Location Icon"
                                  className="inline-block mr-2"
                                />
                                <span className="block font-bold">
                                  {
                                    order.returnFlight.arrivalAirport
                                      .airport_city
                                  }
                                </span>
                              </div>
                              <p className="text-sm">
                                {dayjs(order.returnFlight.arrival_time).format(
                                  "DD MMMM YYYY"
                                )}
                              </p>
                              <p className="text-sm">
                                {dayjs(order.returnFlight.arrival_time).format(
                                  "HH:mm"
                                )}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      <hr className="w-[94%] mx-auto border" />
                      <div className="grid grid-cols-12 my-4 gap-4 items-center">
                        <div className="col-span-4 text-center">
                          <span className="block font-bold xl:text-lg lg:text-lg sm:text-sm">
                            Booking Code:
                          </span>
                          <p className="text-sm">{order.booking_code}</p>
                        </div>
                        <div className="col-span-4 text-center">
                          <span className="block font-bold">Class:</span>
                          <p className="text-sm">{seoTitle(order.classes)}</p>
                        </div>
                        <div className="col-span-4 text-center">
                          <span className="block font-bold text-sm sm:text-lg text-customBlue1">
                            {new Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(order.total_amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            ))}

            {/* End Histori */}
          </div>
          <div className="col-span-12 lg:col-span-5">
            {/* Detail Pesanan */}
            {selectedOrder && (
              <div className="col-span-12">
                <div className="mx-3 mt-5">
                  <div className="grid grid-cols-12 justify-between">
                    <div className="col-span-6">
                      <h3 className="font-bold">Order Details</h3>
                    </div>
                    <div className="col-span-6 flex justify-end me-2">
                      <span
                        className={`text-white px-3 py-1 rounded-2xl  ${
                          selectedOrder.booking_status === "issued"
                            ? "bg-[#56bf58]"
                            : selectedOrder.booking_status === "unpaid"
                            ? "bg-red-600"
                            : selectedOrder.booking_status === "cancelled"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {seoTitle(selectedOrder.booking_status)}
                      </span>
                    </div>
                  </div>
                  <span>
                    Booking Code:{" "}
                    <strong className="text-customBlue2">
                      {selectedOrder.booking_code}
                    </strong>
                  </span>
                  <div className="grid grid-cols-12 mt-2 justify-between items-center">
                    <div className="col-span-6">
                      <h3 className="font-bold">
                        {dayjs(selectedOrder.flight.departure_time).format(
                          "HH:mm"
                        )}
                      </h3>
                    </div>
                    <div className="col-span-6 flex justify-end me-2">
                      <span className="text-customBlue2 font-bold text-sm">
                        Departure
                      </span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span>
                      {dayjs(selectedOrder.flight.departure_time).format(
                        "DD MMMM YYYY"
                      )}
                    </span>
                    <br />
                    <span className="font-semibold">
                      {selectedOrder.flight.departureAirport.airport_name} -{" "}
                      {selectedOrder.flight.departure_terminal}
                    </span>
                  </div>

                  {selectedOrder.returnFlight && (
                    <>
                      <div className="grid grid-cols-12 mt-2 justify-between items-center">
                        <div className="col-span-6">
                          <h3 className="font-bold">
                            {dayjs(
                              selectedOrder.returnFlight.departure_time
                            ).format("HH:mm")}
                          </h3>
                        </div>
                        <div className="col-span-6 flex justify-end me-2">
                          <span className="text-customBlue2 font-bold text-sm">
                            Departure Return
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedOrder.returnFlight && (
                    <>
                      <div className="text-sm">
                        <span>
                          {dayjs(
                            selectedOrder.returnFlight.departure_time
                          ).format("DD MMMM YYYY")}
                        </span>
                        <br />
                        <span className="font-semibold">
                          {
                            selectedOrder.returnFlight.departureAirport
                              .airport_name
                          }{" "}
                          - {selectedOrder.returnFlight.departure_terminal}
                        </span>
                      </div>
                    </>
                  )}
                  <hr className="mt-4 border mx-auto w-[94.5%]" />
                  <div className="py-2">
                    <div className="flex  items-center">
                      <div className="col-span-2 md:col-span-1  items-center">
                        <img
                          className="w-[60px] mr-2"
                          src={selectedOrder.flight.airline.airline_picture}
                          alt={selectedOrder.flight.airline.airline_name}
                        />
                      </div>
                      <div className="col-span-10 md:col-span-11 grid text-sm font-semibold">
                        <span className="font-bold">
                          {selectedOrder.flight.airline.airline_name}
                        </span>
                        <span className="font-bold mb-5">
                          {selectedOrder.flight.flight_number}
                        </span>
                        <span className="font-bold">Information:</span>
                        {!selectedOrder.returnFlight &&
                          selectedOrder.bookingDetail.map((detail, index) => (
                            <div key={index}>
                              <span className="text-customBlue2">
                                Passenger {index + 1}:{" "}
                                {detail.passenger.first_name}{" "}
                                {detail.passenger.last_name} -{" "}
                                {seoTitle(detail.passenger.passenger_type)}
                              </span>
                              <br />
                              <span>ID: {detail.passenger.id}</span>
                            </div>
                          ))}

                        {selectedOrder.returnFlight && (
                          <>
                            <div>
                              {selectedOrder.bookingDetail
                                .slice(
                                  0,
                                  Math.ceil(
                                    selectedOrder.bookingDetail.length / 2
                                  )
                                )
                                .map((detail, index) => (
                                  <div key={index}>
                                    <span className="text-customBlue2">
                                      Passenger {index + 1}:{" "}
                                      {detail.passenger.first_name}{" "}
                                      {detail.passenger.last_name} -{" "}
                                      {seoTitle(
                                        detail.passenger.passenger_type
                                      )}
                                    </span>
                                    <br />
                                    <span>ID: {detail.passenger.id}</span>
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedOrder.returnFlight && <hr />}
                  <div className="py-2">
                    {selectedOrder.returnFlight && (
                      <>
                        <div className="flex  items-center">
                          <div className="col-span-2 md:col-span-1  items-center">
                            <img
                              className="w-[60px] mr-2"
                              src={
                                selectedOrder.returnFlight.airline
                                  .airline_picture
                              }
                              alt={
                                selectedOrder.returnFlight.airline.airline_name
                              }
                            />
                          </div>
                          <div className="col-span-10 md:col-span-11 grid text-sm font-semibold">
                            <span className="font-bold">
                              {selectedOrder.returnFlight.airline.airline_name}
                            </span>
                            <span className="font-bold mb-5">
                              {selectedOrder.returnFlight.flight_number}
                            </span>
                            <span className="font-bold">Information:</span>
                            {!selectedOrder.returnFlight &&
                              selectedOrder.bookingDetail.map(
                                (detail, index) => (
                                  <div key={index}>
                                    <span className="text-customBlue2">
                                      Passenger {index + 1}:{" "}
                                      {detail.passenger.first_name}{" "}
                                      {detail.passenger.last_name} -{" "}
                                      {seoTitle(
                                        detail.passenger.passenger_type
                                      )}
                                    </span>
                                    <br />
                                    <span>ID: {detail.passenger.id}</span>
                                  </div>
                                )
                              )}

                            {selectedOrder.returnFlight && (
                              <>
                                <div>
                                  {selectedOrder.bookingDetail
                                    .slice(
                                      0,
                                      Math.ceil(
                                        selectedOrder.bookingDetail.length / 2
                                      )
                                    )
                                    .map((detail, index) => (
                                      <div key={index}>
                                        <span className="text-customBlue2">
                                          Passenger {index + 1}:{" "}
                                          {detail.passenger.first_name}{" "}
                                          {detail.passenger.last_name} -{" "}
                                          {seoTitle(
                                            detail.passenger.passenger_type
                                          )}
                                        </span>
                                        <br />
                                        <span>ID: {detail.passenger.id}</span>
                                      </div>
                                    ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <hr className="mt-1 border w-[94.5%] mb-3 mx-auto" />
                  <div className="grid grid-cols-12 mt-2 justify-between items-start text-sm">
                    <div className="col-span-8 grid">
                      <h3 className="font-bold">
                        {dayjs(selectedOrder.flight.arrival_time).format(
                          "HH:mm"
                        )}
                      </h3>
                      <span>
                        {dayjs(selectedOrder.flight.arrival_time).format(
                          "DD MMMM YYYY"
                        )}
                      </span>
                      <span className="font-semibold">
                        {selectedOrder.flight.arrivalAirport.airport_name}
                      </span>
                    </div>
                    <div className="col-span-4 flex justify-end me-2">
                      <span className="text-customBlue2 font-bold text-sm">
                        Arrival
                      </span>
                    </div>
                  </div>
                  {selectedOrder.returnFlight && (
                    <>
                      <div className="grid grid-cols-12 mt-2 justify-between items-center">
                        <div className="col-span-6">
                          <h3 className="font-bold">
                            {dayjs(
                              selectedOrder.returnFlight.arrival_time
                            ).format("HH:mm")}
                          </h3>
                        </div>
                        <div className="col-span-6 flex justify-end me-2">
                          <span className="text-customBlue2 font-bold text-sm">
                            Arrival Return
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedOrder.returnFlight && (
                    <>
                      <div className="text-sm">
                        <span>
                          {dayjs(
                            selectedOrder.returnFlight.arrival_time
                          ).format("DD MMMM YYYY")}
                        </span>
                        <br />
                        <span className="font-semibold">
                          {
                            selectedOrder.returnFlight.arrivalAirport
                              .airport_name
                          }
                        </span>
                      </div>
                    </>
                  )}
                  <hr className="mt-4 border w-[94.5%] mb-2 mx-auto" />
                  {!selectedOrder.returnFlight && (
                    <div className="text-sm mx-4">
                      <span className="font-bold">Price Details</span>
                      <div className="grid grid-cols-12 justify-between">
                        <div className="col-span-6">
                          {
                            selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "adult"
                            ).length
                          }{" "}
                          Adults
                        </div>
                        <div className="col-span-6 text-end">
                          {(() => {
                            let total = 0;
                            selectedOrder.bookingDetail.forEach((detail) => {
                              if (detail.passenger.passenger_type === "adult") {
                                total += parseFloat(detail.price);
                              }
                            });
                            return (
                              <span>
                                {new Intl.NumberFormat("id", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: 0,
                                }).format(total)}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 justify-between">
                        <div className="col-span-6">
                          {
                            selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "children"
                            ).length
                          }{" "}
                          Children
                        </div>
                        <div className="col-span-6 text-end">
                          {" "}
                          {(() => {
                            let total = 0;
                            selectedOrder.bookingDetail.forEach((detail) => {
                              if (
                                detail.passenger.passenger_type === "children"
                              ) {
                                total += parseFloat(detail.price);
                              }
                            });
                            return (
                              <span>
                                {new Intl.NumberFormat("id", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: 0,
                                }).format(total)}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 justify-between">
                        <div className="col-span-6">
                          {
                            selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "infant"
                            ).length
                          }{" "}
                          Infant
                        </div>
                        <div className="col-span-6 text-end">
                          {" "}
                          {(() => {
                            let total = 0;
                            selectedOrder.bookingDetail.forEach((detail) => {
                              if (
                                detail.passenger.passenger_type === "infant"
                              ) {
                                total += parseFloat(detail.price);
                              }
                            });
                            return (
                              <span>
                                {new Intl.NumberFormat("id", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: 0,
                                }).format(total)}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedOrder.returnFlight && (
                    <>
                      <div className="text-sm mx-4">
                        <span className="font-bold">Price Details</span>
                        <div className="grid grid-cols-12 justify-between">
                          <div className="col-span-6">
                            {selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "adult"
                            ).length / 2}{" "}
                            Adults
                          </div>
                          <div className="col-span-6 text-end">
                            {new Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(
                              (selectedOrder.bookingDetail.filter(
                                (detail) =>
                                  detail.passenger.passenger_type === "adult"
                              ).length /
                                2) *
                                parsePrice(
                                  selectedOrder.classes,
                                  selectedOrder.flight
                                )
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-12 justify-between">
                          <div className="col-span-6">
                            {selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "children"
                            ).length / 2}{" "}
                            Children
                          </div>
                          <div className="col-span-6 text-end">
                            {new Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(
                              (selectedOrder.bookingDetail.filter(
                                (detail) =>
                                  detail.passenger.passenger_type === "children"
                              ).length /
                                2) *
                                parsePrice(
                                  selectedOrder.classes,
                                  selectedOrder.flight
                                )
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-12 justify-between">
                          <div className="col-span-6">
                            {selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "infant"
                            ).length / 2}{" "}
                            Infant
                          </div>
                          <div className="col-span-6 text-end">
                            {new Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(
                              0 *
                                parsePrice(
                                  selectedOrder.classes,
                                  selectedOrder.flight
                                )
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm mx-4">
                        <span className="font-bold">Return Price Details</span>
                        <div className="grid grid-cols-12 justify-between">
                          <div className="col-span-6">
                            {selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "adult"
                            ).length / 2}{" "}
                            Adults
                          </div>
                          <div className="col-span-6 text-end">
                            {new Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(
                              (selectedOrder.bookingDetail.filter(
                                (detail) =>
                                  detail.passenger.passenger_type === "adult"
                              ).length /
                                2) *
                                parsePrice(
                                  selectedOrder.classes,
                                  selectedOrder.returnFlight
                                )
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-12 justify-between">
                          <div className="col-span-6">
                            {selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "children"
                            ).length / 2}{" "}
                            Children
                          </div>
                          <div className="col-span-6 text-end">
                            {new Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(
                              (selectedOrder.bookingDetail.filter(
                                (detail) =>
                                  detail.passenger.passenger_type === "children"
                              ).length /
                                2) *
                                parsePrice(
                                  selectedOrder.classes,
                                  selectedOrder.returnFlight
                                )
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-12 justify-between">
                          <div className="col-span-6">
                            {selectedOrder.bookingDetail.filter(
                              (detail) =>
                                detail.passenger.passenger_type === "infant"
                            ).length / 2}{" "}
                            Infant
                          </div>
                          <div className="col-span-6 text-end">
                            {new Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(
                              0 *
                                parsePrice(
                                  selectedOrder.classes,
                                  selectedOrder.returnFlight
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <hr className="mt-4 border w-[94.5%] mb-2 mx-auto" />
                  <div className="grid grid-cols-12 justify-between font-bold text-lg mx-4 mb-8">
                    <div className="col-span-6">Total</div>
                    <div className="col-span-6 text-end text-customBlue1">
                      {new Intl.NumberFormat("id", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(selectedOrder.total_amount)}
                    </div>
                  </div>
                  {selectedOrder &&
                    selectedOrder.booking_status === "issued" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handlePrintTicket(selectedOrder.booking_code)
                          }
                          className={`text-white w-full bg-customBlue2 hover:bg-customBlue1 focus:ring-blue-300 focus:ring-4 h-14 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                        >
                          Print E-Ticket
                        </button>
                      </>
                    )}

                  {selectedOrder &&
                    selectedOrder.booking_status === "unpaid" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handlePayNow(selectedOrder)}
                          className={`text-white w-full bg-red-600 hover:bg-red-800 focus:ring-red-300 focus:ring-4 h-14 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                        >
                          Pay Now
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(selectedOrder)}
                          className={`text-red-600 border-2 border-red-600 w-full bg-white hover:bg-red-800 hover:text-white focus:ring-red-300 focus:ring-4 h-14 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                        >
                          Cancel Booking
                        </button>
                      </>
                    )}
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
        <div className="fixed inset-0 z-50 flex justify-center items-start  pt-24 md:pt-32">
          <div className="relative p-4 w-full max-w-md mt-16 md:mt-20 sm:ml-12 md:ml-40 lg:ml-96 xl:ml-[600px] 2xl:ml-[750px]">
            <div className="relative bg-white rounded-xl shadow-xl">
              {/* Modal header */}
              <div className="flex flex-col justify-between items-center p-5 border-b  rounded-t">
                <form className="w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="search"
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Booking Code"
                      onChange={(e) => setBookingCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={handleToggleSearch}
                    >
                      <FiX className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </form>
                <button
                  onClick={handleSearchBookingCode}
                  className="w-full bg-customBlue1 text-white p-3 rounded-lg font-bold mt-3"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalDateOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-24 md:pt-32">
          <div className="relative p-4 w-full max-w-md mt-16 md:mt-20 sm:ml-12 md:ml-40 lg:ml-96 xl:ml-[600px] 2xl:ml-[750px]">
            <div className="relative bg-white rounded-xl shadow-xl">
              {/* Modal header */}

              <div className="flex flex-col justify-center  items-center p-5 border-b rounded-t">
                <IoMdClose
                  className="absolute  top-3 right-3 w-6 cursor-pointer"
                  onClick={handleToggleFilter}
                />

                <p className="font-bold mb-3">Filter By Date Range</p>
                <DayPicker
                  mode="range"
                  showOutsideDays
                  selected={selected}
                  onSelect={setSelected}
                />

                <button
                  onClick={() =>
                    setSelected([{ from: undefined, to: undefined }])
                  }
                  className="border-2 font-bold border-customBlue1 w-[80%] mb-3 rounded-lg text-black
                   px-5 py-2"
                >
                  Clear
                </button>

                <button
                  onClick={handleClickSave}
                  className="bg-customBlue1 w-[80%]  rounded-lg text-white px-5 py-2"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
