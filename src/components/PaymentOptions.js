import React, { useState, useEffect } from "react";
import DetailedFlightInfo from "./DetailedFlightInfo";
import { useNavigate, useLocation } from "react-router-dom";

import { toast, Bounce } from "react-toastify";

const PaymentOptions = () => {
  const [snapLoaded, setSnapLoaded] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    payment_token,
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
    booking_code,
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
  } = location.state || {};

  useEffect(() => {
    if (!payment_token) {
      navigate("/");
    }

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-sWHHfn6Rjgzxjvrc");
    script.async = true;

    script.onload = () => {
      toast.success("Payment successfully created", {
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
      setSnapLoaded(true);
    };

    script.onerror = () => {
      toast.error("Payment failed to created", {
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
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handlePay = () => {
      if (snapLoaded && window.snap) {
        window.snap.embed(payment_token, {
          embedId: "snap-container",
          onSuccess: function () {
            toast.success("Payment Success !", {
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
          },
          onPending: function () {
            toast.info("Waiting for your payment", {
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
          },
          onError: function () {
            toast.error("Payment failed !", {
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
          },
          onClose: function () {
            toast.error("You closed the popup without finishing the payment", {
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
          },
        });
      } else {
        toast.error("Payment script not loaded yet, please try again later.", {
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

    if (snapLoaded && !paymentInitiated) {
      handlePay();
      setPaymentInitiated(true);
    }
  }, [snapLoaded, paymentInitiated]);

  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');
          .font-plus-jakarta-sans {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        `}
      </style>
      <div className="payment-container flex flex-col md:flex-row p-8 lg:mx-[200px] md:mx-[20px] sm:mx-0 space-y-8 md:space-y-0 md:space-x-8 font-plus-jakarta-sans">
        <div className="w-full md:w-1/2 p-8 shadow-lg rounded-lg bg-white">
          <h2 className="text-3xl font-bold text-customBlue1 mb-6 text-gray-800">
            Payment Options
          </h2>
          <div className="space-y-4">
            <div
              id="snap-container"
              className="w-full h-[70vh] rounded-xl"
            ></div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <DetailedFlightInfo
            flight_number={flight_number}
            airline_name={airline_name}
            information={information}
            departure_airport={departure_airport}
            departure_airport_city_code={departure_airport_city_code}
            departure_terminal={departure_terminal}
            departure_time={departure_time}
            arrival_airport={arrival_airport}
            arrival_airport_city_code={arrival_airport_city_code}
            airline_picture={airline_picture}
            arrival_time={arrival_time}
            adult={adult}
            infant={infant}
            children={children}
            seatClass={seatClass}
            price={price}
            booking_code={booking_code}
            return_flight_number={return_flight_number}
            return_airline_name={return_airline_name}
            return_information={return_information}
            return_departure_airport={return_departure_airport}
            return_departure_airport_city_code={
              return_departure_airport_city_code
            }
            return_departure_terminal={return_departure_terminal}
            return_departure_time={return_departure_time}
            return_arrival_airport={return_arrival_airport}
            return_arrival_airport_city_code={return_arrival_airport_city_code}
            return_airline_picture={return_airline_picture}
            return_arrival_time={return_arrival_time}
            return_price={return_price}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
