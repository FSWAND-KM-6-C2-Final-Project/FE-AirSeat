import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaInfoCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Swal from "sweetalert2";
import Select from "react-select";
import { seoTitle } from "string-fn";
import { bookingFlight } from "../services/booking.service";
import Loading from "./Loading";
import { CiDiscount1 } from "react-icons/ci";
import { getDiscountById, getDiscounts } from "../services/discount.service";

const FlightDetails = ({
  airline_name,
  airline_picture,
  flight_number,
  departure_time,
  arrival_time,
  information,
  adult,
  infant,
  children,
  price,
  departure_airport,
  departure_terminal,
  arrival_airport,
  bookingData,
  departure_airport_city_code,
  arrival_airport_city_code,
  return_flight_number,
  return_airline_name,
  return_information,
  return_departure_airport,
  return_departure_airport_city_code,
  return_departure_terminal,
  return_departure_time,
  return_arrival_airport,
  return_arrival_airport_city_code,
  return_airline_picture,
  return_arrival_time,
  return_price,
}) => {
  const navigate = useNavigate();
  const [seatClass, setSeatClass] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState();
  const [discounts, setDiscounts] = useState();
  const [selectedDiscount, setSelectedDiscount] = useState();
  const [discountAmount, setDiscountAmount] = useState();

  const dayjs = require("dayjs");
  const utc = require("dayjs/plugin/utc");
  const customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat);
  dayjs.extend(utc);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleSelectDiscount = async (choice) => {
    if (choice) {
      try {
        const response = await getDiscountById(choice);

        if (response) {
          setSelectedDiscount(choice);
          setDiscountAmount(response.data.discount.discount_amount);
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
    } else {
      setSelectedDiscount(null);
      setDiscountAmount(null);
    }
  };

  const fetchDiscounts = async () => {
    setIsFetching(true);
    try {
      const response = await getDiscounts();

      if (response) {
        const discount = response.data.discounts;
        const selectOption = discount.map((item) => {
          const pricePerAdult = parseFloat(price);
          const pricePerInfant = parseFloat(0);
          const pricePerChild = parseFloat(price);

          let totalOrderAmount;

          if (return_flight_number) {
            const returnPricePerAdult = parseFloat(return_price);
            const returnPricePerChild = parseFloat(return_price);

            totalOrderAmount =
              pricePerAdult * parseInt(adult) +
              pricePerInfant * parseInt(infant) +
              pricePerChild * parseInt(children) +
              returnPricePerAdult * parseInt(adult) +
              pricePerInfant * parseInt(infant) +
              returnPricePerChild * parseInt(children);
          } else {
            totalOrderAmount =
              pricePerAdult * parseInt(adult) +
              pricePerInfant * parseInt(infant) +
              pricePerChild * parseInt(children);
          }

          const formattedMinimumOrder = new Intl.NumberFormat("id", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(item.minimum_order);

          const isExpired = new Date(item.discount_expired) < new Date();

          return {
            value: item.id,
            label: (
              <div>
                <p>Discount Amount: {item.discount_amount}%</p>
                <p>Minimum Order: {formattedMinimumOrder}</p>
                <p>
                  Expired At:{" "}
                  {dayjs(item.discount_expired).format("DD MMMM YYYY, HH:mm")}
                </p>
                {isExpired && (
                  <p className="font-bold">(You cannot use this promo)</p>
                )}
              </div>
            ),
            isDisabled:
              isExpired || totalOrderAmount < parseFloat(item.minimum_order),
          };
        });

        // Add a default option at the beginning
        const defaultOption = {
          value: null,
          label: "No Discount Selected",
          isDisabled: false,
        };

        setDiscounts([defaultOption, ...selectOption]);
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
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ddd",
      borderRadius: "0.5rem",
      cursor: "pointer",
      minHeight: "auto",
      padding: "10px",
      background: "white",
      "&:hover": {
        borderColor: "#aaa",
      },
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      "&:hover": {
        background: "#f1f1f1",
      },
    }),
  };

  const handlePaymentRedirect = async () => {
    if (bookingData === null) {
      toast.error("Fill your order data first", {
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
      Swal.fire({
        title: "Check Your Order Data",
        icon: "question",
        width: "85%",

        html: `
       <div class="mb-3">
        <p class="text-left text-xl font-bold mb-1">Ordered By </p>
        <p class="text-left text-md font-medium">Name : ${
          bookingData.ordered_by.first_name
        } ${bookingData.ordered_by.last_name || ""}</p>
         <p class="text-left text-md font-medium">Email : ${
           bookingData.ordered_by.email
         }</p>
         <p class="text-left text-md font-medium">Phone Number : ${
           bookingData.ordered_by.phone_number
         }</p>
       </div>

        <hr>

        <div class="mt-3 mb-3">
          <p class="text-left text-xl font-bold mb-1 mr">Flight Order Detail </p>
          <img class="w-[50px] my-3" src="${airline_picture}" />
          <p class="text-left text-md font-bold">${airline_name} - ${flight_number}</p>
          <p class="text-left text-md font-medium">${departure_airport} (${departure_airport_city_code}) → ${arrival_airport} (${arrival_airport_city_code})</p>
          <p class="text-left text-md font-medium">${dayjs(
            departure_time
          ).format("DD MMMM YYYY HH:mm")} → ${dayjs(arrival_time).format(
          "DD MMMM YYYY HH:mm"
        )}</p>
          <p class="text-left text-md font-medium">${seoTitle(
            searchParams.get("class")
          )}</p>
        
       </div>

        <hr>


      ${
        return_flight_number
          ? `
          <div class="mt-3 mb-3">
            <p class="text-left text-xl font-bold mb-1">Return Flight Order Detail</p>
            <img class="w-[50px] my-3" src="${return_airline_picture}" alt="Airline" />
            <p class="text-left text-md font-bold">${return_airline_name} - ${return_flight_number}</p>
            <p class="text-left text-md font-medium">${return_departure_airport} (${return_departure_airport_city_code}) → ${return_arrival_airport} (${return_arrival_airport_city_code})</p>
            <p class="text-left text-md font-medium">${dayjs(
              return_departure_time
            ).format("DD MMMM YYYY HH:mm")} → ${dayjs(
              return_arrival_time
            ).format("DD MMMM YYYY HH:mm")}</p>
            <p class="text-left text-md font-medium">${seoTitle(
              searchParams.get("class")
            )}</p>
          </div>
          `
          : ""
      }

        <hr>

       <div class="mt-3 mb-3">
      <p class="text-left text-xl font-bold mb-1  ">Passenger Detail </p>
      ${bookingData.passenger
        .map(
          (pass, index) => `
        <div class="border shadow-md p-5 mt-2 rounded-lg">
          <p class="text-left text-md font-bold">Passenger ${
            index + 1
          } - ${seoTitle(pass.passenger_type)}</p>
          <p class="text-left text-md font-medium">
            Name : ${pass.first_name} ${pass.last_name || ""}
          </p>
          <p class="text-left text-md font-medium">
            Title : ${seoTitle(pass.title)}.
          </p>
          <p class="text-left text-md font-medium">
            Date Of Birth : ${dayjs(pass.dob).format("DD MMMM YYYY")}
          </p>
          <p class="text-left text-md font-medium">
            Identification Type : ${pass.identification_type.toUpperCase()}
          </p>
           <p class="text-left text-md font-medium">
            Identification Number : ${pass.identification_number}
          </p>
          <p class="text-left text-md font-medium">
            Identification Country : ${pass.identification_country}
          </p>
          <p class="text-left text-md font-medium">
            Identification Expired : ${
              pass.identification_expired
                ? dayjs(pass.identification_expired).format("DD MMMM YYYY")
                : "-"
            }
          </p>
           <p class="text-left text-md font-medium">
            Nationality : ${pass.nationality}
          </p>
          <p class="text-left text-md font-medium">
            Seat : ${pass.seat_departure.seat_row}${
            pass.seat_departure.seat_column
          }
          </p>
         <p class="text-left text-md font-medium">
          Seat Return : ${
            pass.seat_return
              ? (pass.seat_return.seat_row ? pass.seat_return.seat_row : "-") +
                (pass.seat_return.seat_column
                  ? pass.seat_return.seat_column
                  : "-")
              : "-"
          }
        </p>
        </div>
      `
        )
        .join("")}
    </div>

        <hr>
`,
        showConfirmButton: true,
        confirmButtonText: "Proceed To Payment",
        confirmButtonColor: "#447C9D",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = bookingData;

          if (selectedDiscount) {
            data.discount_id = selectedDiscount;
          }

          const response = await bookingFlightProcess(bookingData);

          if (response) {
            navigate("/payment", {
              state: {
                payment_token: response.data.payment_data.token,
                booking_code: response.data.booking.booking_code,
                airline_name,
                airline_picture,
                flight_number,
                departure_time,
                arrival_time,
                information,
                adult,
                infant,
                children,
                price,
                departure_airport,
                departure_terminal,
                arrival_airport,
                bookingData,
                departure_airport_city_code,
                arrival_airport_city_code,
                seatClass,
                return_flight_number,
                return_airline_name,
                return_information,
                return_departure_airport,
                return_departure_airport_city_code,
                return_departure_terminal,
                return_departure_time,
                return_arrival_airport,
                return_arrival_airport_city_code,
                return_airline_picture,
                return_arrival_time,
                return_price,
              },
            });
            navigate(0);
          }
        }
      });
    }
  };

  const bookingFlightProcess = async (flightData) => {
    setIsFetching(true);

    try {
      const bookedFlight = await bookingFlight(
        JSON.stringify(flightData),
        localStorage.getItem("token")
      );

      if (bookedFlight) {
        return bookedFlight;
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
  };

  useEffect(() => {
    setSeatClass(searchParams.get("class"));
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

          .flight-details {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        `}
      </style>

      <div className="md:w-1/3  p-6 bg-white rounded-lg shadow-lg mb-6 border border-gray-200 flight-details overflow-y-hidden">
        <h2 className="text-3xl font-bold mb-6 text-[#164765] border-b-2 border-gray-300 pb-3">
          Detail Flight
        </h2>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaPlaneDeparture className="text-customBlue1 mr-3" size={20} />
            <h3 className="text-xl font-bold text-customBlue1">Departure</h3>
          </div>
          <p className="text-lg font-bold text-gray-700">
            {dayjs(departure_time).format("HH:mm")}
          </p>
          <p className="text-md font-medium text-gray-600">
            {dayjs(departure_time).format("DD MMMM YYYY")}
          </p>
          <p className="text-md font-medium text-gray-600">
            {departure_airport && departure_airport} –{" "}
            {departure_terminal && departure_terminal}
          </p>
        </div>

        <div className="mb-6 border-t flex items-center border-gray-200 pt-4">
          <div>
            <img className="w-[50px] mr-4" src={airline_picture} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-customBlue1">
              {airline_name && airline_name} -{" "}
              {seatClass && seoTitle(seatClass)}
            </h3>
            <p className="text-lg mb-3 font-bold text-customBlue1">
              {flight_number && flight_number}
            </p>
            <div className="flex items-center mt-2">
              <h3 className="text-md font-bold  text-customBlue1">
                Information :
              </h3>
            </div>
            <ul className="list-disc list-inside text-md text">
              <p className="whitespace-pre-wrap font-medium text-gray-600">
                {information && information}
              </p>
            </ul>
          </div>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="flex items-center mb-2">
            <FaPlaneArrival className="text-customBlue1 mr-2" size={20} />
            <h3 className="text-xl font-bold text-customBlue1">Arrival</h3>
          </div>
          <p className="text-lg font-bold text-gray-700">
            {dayjs(arrival_time).format("HH:mm")}
          </p>
          <p className="text-md font-medium text-gray-600">
            {dayjs(arrival_time).format("DD MMMM YYYY")}
          </p>
          <p className="text-md font-medium text-gray-600">
            {arrival_airport && arrival_airport}
          </p>
        </div>

        {return_flight_number && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-[#164765] border-b-2 border-gray-300 pb-3">
              Return Detail Flight
            </h2>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <FaPlaneDeparture className="text-customBlue1 mr-3" size={20} />
                <h3 className="text-xl font-bold text-customBlue1">
                  Departure
                </h3>
              </div>
              <p className="text-lg font-bold text-gray-700">
                {dayjs(return_departure_time).format("HH:mm")}
              </p>
              <p className="text-md font-medium text-gray-600">
                {dayjs(return_departure_time).format("DD MMMM YYYY")}
              </p>
              <p className="text-md font-medium text-gray-600">
                {return_departure_airport && return_departure_airport} –{" "}
                {return_departure_terminal && return_departure_terminal}
              </p>
            </div>

            <div className="mb-6 border-t flex items-center border-gray-200 pt-4">
              <div>
                <img className="w-[50px] mr-4" src={return_airline_picture} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-customBlue1">
                  {return_airline_name && return_airline_name} -{" "}
                  {seatClass && seoTitle(seatClass)}
                </h3>
                <p className="text-lg mb-3 font-bold text-customBlue1">
                  {return_flight_number && return_flight_number}
                </p>
                <div className="flex items-center mt-2">
                  <h3 className="text-md font-bold  text-customBlue1">
                    Information :
                  </h3>
                </div>
                <ul className="list-disc list-inside text-md text">
                  <p className="whitespace-pre-wrap font-medium text-gray-600">
                    {return_information && return_information}
                  </p>
                </ul>
              </div>
            </div>

            <div className="mb-6 border-t border-gray-200 pt-4">
              <div className="flex items-center mb-2">
                <FaPlaneArrival className="text-customBlue1 mr-2" size={20} />
                <h3 className="text-xl font-bold text-customBlue1">Arrival</h3>
              </div>
              <p className="text-lg font-bold text-gray-700">
                {dayjs(return_arrival_time).format("HH:mm")}
              </p>
              <p className="text-md font-medium text-gray-600">
                {dayjs(return_arrival_time).format("DD MMMM YYYY")}
              </p>
              <p className="text-md font-medium text-gray-600">
                {return_arrival_airport && return_arrival_airport}
              </p>
            </div>
          </>
        )}

        <div className="mb-3 border-t border-gray-200 pt-4">
          {flight_number && !return_flight_number && (
            <>
              <h3 className="text-xl font-bold text-customBlue1 pb-3">
                Price Details
              </h3>
              <div className="flex justify-between py-1 ">
                <span className="text-md font-medium">{adult} Adults</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(price) * parseInt(adult))}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-md font-medium">{infant} Infant</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(0) * parseInt(infant))}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-md font-medium">{children} Children</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(price) * parseInt(children))}
                </span>
              </div>
              <div className="flex justify-between py-1 mb-2">
                <span className="text-md font-medium">Tax</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(0)}
                </span>
              </div>
              <div className="flex justify-between py-1 mb-2">
                <span className="text-md font-medium">
                  Discount {discountAmount && "(" + discountAmount + "%)"}
                </span>
                <span className="text-md font-medium">
                  {discountAmount && "-"}
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(
                    discountAmount
                      ? (parseFloat(price) * parseInt(adult) +
                          parseFloat(0) * parseInt(infant) +
                          parseFloat(price) * parseInt(children)) *
                          (discountAmount / 100)
                      : 0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-xl font-bold text-customBlue1">
                  Total
                </span>
                <span className="text-xl font-bold text-customBlue1">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(
                    parseFloat(price) * parseInt(adult) +
                      parseFloat(0) * parseInt(infant) +
                      parseFloat(price) * parseInt(children) -
                      (discountAmount
                        ? (parseFloat(price) * parseInt(adult) +
                            parseFloat(0) * parseInt(infant) +
                            parseFloat(price) * parseInt(children)) *
                          (discountAmount / 100)
                        : 0)
                  )}
                </span>
              </div>

              {!isFetching && discounts && (
                <div className="mt-5">
                  <Select
                    onChange={(choice) => handleSelectDiscount(choice.value)}
                    isSearchable={false}
                    options={discounts}
                    styles={customStyles}
                    placeholder={
                      <div className="flex items-center">
                        <CiDiscount1 className="w-7 h-auto mr-2" />
                        Add Discount
                      </div>
                    }
                  />
                </div>
              )}
              <button
                className="w-full py-3 md:py-3 sm:py-2 my-5 text-white text-center m-auto bg-customBlue1 rounded-lg hover:bg-customBlue2 focus:outline-none focus:ring-2 focus:ring-customBlue2 focus:ring-opacity-75 text-lg md:text-lg sm:text-md disabled:bg-customBlue2 disabled:cursor-not-allowed"
                onClick={handlePaymentRedirect}
              >
                {isFetching && (
                  <span className="flex items-center justify-center">
                    <Loading />
                  </span>
                )}
                {!isFetching && "Continue To Payment"}
              </button>
            </>
          )}
          {flight_number && return_flight_number && (
            <>
              <h3 className="text-xl font-bold text-customBlue1 pb-3">
                Price Details
              </h3>
              <div className="flex justify-between py-1 ">
                <span className="text-md font-medium">{adult} Adults</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(price) * parseInt(adult))}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-md font-medium">{infant} Infant</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(0) * parseInt(infant))}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-md font-medium">{children} Children</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(price) * parseInt(children))}
                </span>
              </div>
              <div className="flex justify-between py-1 mb-2">
                <span className="text-md font-medium">Tax</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-customBlue1 pb-3">
                Return Price Details
              </h3>
              <div className="flex justify-between py-1 ">
                <span className="text-md font-medium">{adult} Adults</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(return_price) * parseInt(adult))}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-md font-medium">{infant} Infant</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(0) * parseInt(infant))}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-md font-medium">{children} Children</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(parseFloat(return_price) * parseInt(children))}
                </span>
              </div>
              <div className="flex justify-between py-1 mb-2">
                <span className="text-md font-medium">Tax</span>
                <span className="text-md font-medium">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(0)}
                </span>
              </div>
              <div className="flex justify-between py-1 mb-2">
                <span className="text-md font-medium">
                  Discount {discountAmount && "(" + discountAmount + "%)"}
                </span>
                <span className="text-md font-medium">
                  {discountAmount && "-"}
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(
                    discountAmount
                      ? (parseFloat(price) * parseInt(adult) +
                          parseFloat(0) * parseInt(infant) +
                          parseFloat(price) * parseInt(children) +
                          parseFloat(return_price) * parseInt(adult) +
                          parseFloat(0) * parseInt(infant) +
                          parseFloat(return_price) * parseInt(children)) *
                          (discountAmount / 100)
                      : 0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-xl font-bold text-customBlue1">
                  Total
                </span>
                <span className="text-xl font-bold text-customBlue1">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(
                    parseFloat(price) * parseInt(adult) +
                      parseFloat(0) * parseInt(infant) +
                      parseFloat(price) * parseInt(children) +
                      parseFloat(return_price) * parseInt(adult) +
                      parseFloat(0) * parseInt(infant) +
                      parseFloat(return_price) * parseInt(children) -
                      (discountAmount
                        ? (parseFloat(price) * parseInt(adult) +
                            parseFloat(0) * parseInt(infant) +
                            parseFloat(price) * parseInt(children) +
                            parseFloat(return_price) * parseInt(adult) +
                            parseFloat(0) * parseInt(infant) +
                            parseFloat(return_price) * parseInt(children)) *
                          (discountAmount / 100)
                        : 0)
                  )}
                </span>
              </div>

              {!isFetching && discounts && (
                <div className="mt-5">
                  <Select
                    onChange={(choice) => handleSelectDiscount(choice.value)}
                    isSearchable={false}
                    options={discounts}
                    styles={customStyles}
                    placeholder={
                      <div className="flex items-center">
                        <CiDiscount1 className="w-7 h-auto mr-2" />
                        Add Discount
                      </div>
                    }
                  />
                </div>
              )}
              <button
                className="w-full py-3 md:py-3 sm:py-2 my-5 text-white bg-customBlue1 rounded-lg hover:bg-customBlue2 focus:outline-none focus:ring-2 focus:ring-customBlue2 focus:ring-opacity-75 text-lg md:text-lg sm:text-md disabled:bg-customBlue2 disabled:cursor-not-allowed"
                onClick={handlePaymentRedirect}
              >
                {isFetching && (
                  <span className="flex items-center justify-center">
                    <Loading />
                  </span>
                )}

                {!isFetching && "Continue To Payment"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
