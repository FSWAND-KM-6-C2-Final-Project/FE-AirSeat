import React, { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import FlightDetails from "../components/FlightDetails";
import StepsSection from "../components/StepsSection";
import UserNavbar from "../components/NavbarAccount";
import { getFlightById } from "../services/flight.service";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getSeatByFlightId } from "../services/seat.service";
import { getUser } from "../services/auth.service";
import { toast, Bounce } from "react-toastify";

const BookingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [bookingData, setBookingData] = useState(null);
  const [flight, setFlight] = useState();
  const [flightReturn, setFlightReturn] = useState();
  const [seat, setSeat] = useState();
  const [seatReturn, setSeatReturn] = useState();
  const [price, setPrice] = useState();
  const [priceReturn, setPriceReturn] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(900);

  const initialClass = "Economy";

  const fetchFlightById = async () => {
    setIsFetching(true);
    try {
      const response = await getFlightById(searchParams.get("flightId"));
      if (response) {
        setFlight(response.data.flight);
        const seatResponse = await getSeatByFlightId(
          searchParams.get("flightId"),
          searchParams.get("class") || "economy"
        );

        setSeat(seatResponse.data.seats);

        const returnFlightId = searchParams.get("returnFlightId");
        if (returnFlightId) {
          const responseReturn = await getFlightById(returnFlightId);
          if (responseReturn) {
            setFlightReturn(responseReturn.data.flight);

            const seatReturnResponse = await getSeatByFlightId(
              returnFlightId,
              searchParams.get("class") || "economy"
            );
            setSeatReturn(seatReturnResponse.data.seats);

            switch (searchParams.get("class")) {
              case "economy":
                setPriceReturn(responseReturn.data.flight.price_economy);
                break;
              case "premium_economy":
                setPriceReturn(
                  responseReturn.data.flight.price_premium_economy
                );
                break;
              case "business":
                setPriceReturn(responseReturn.data.flight.price_business);
                break;
              case "first_class":
                setPriceReturn(responseReturn.data.flight.price_first_class);
                break;
              default:
                setPriceReturn(responseReturn.data.flight.price_economy);
            }
          }
        }

        switch (searchParams.get("class")) {
          case "economy":
            setPrice(response.data.flight.price_economy);
            break;
          case "premium_economy":
            setPrice(response.data.flight.price_premium_economy);
            break;
          case "business":
            setPrice(response.data.flight.price_business);
            break;
          case "first_class":
            setPrice(response.data.flight.price_first_class);
            break;
          default:
            setPrice(response.data.flight.price_economy);
        }
      }
    } catch (err) {}
    setIsFetching(false);
  };

  useEffect(() => {
    const flightId = searchParams.get("flightId");
    if (!flightId) {
      navigate("/");
    }
    fetchFlightById();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          navigate(-1);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkUser = async () => {
      try {
        const response = await getUser(token);

        if (response) {
          setIsAuthenticated(true);
        } else {
          navigate("/restricted");
        }
      } catch (err) {
        toast.error("Your session has expired, please log in again.", {
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
        if (err.message === "jwt malformed" || err.message === "jwt expired") {
          localStorage.removeItem("token");
        }
      }
    };

    if (!token) {
      navigate("/restricted");
    } else {
      checkUser();
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleBookingData = (data) => {
    setBookingData(data);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  return (
    <div>
      <UserNavbar />
      <StepsSection />
      {!isFetching && (
        <div className="w-[80%] m-auto bg-[#FF0000] rounded-xl px-5 py-[13px] shadow-lg font-bold text-center text-white">
          Complete within {formattedTime}
        </div>
      )}
      <main className="mt-6 flex flex-col mx-[5px] md:mx-[5px] sm:mx-[100px] md:flex-row gap-2 justify-center">
        {!isFetching && seat && (
          <div className="w-full md:w-1/2">
            <BookingForm
              seatStatus={seat}
              seatStatusReturn={seatReturn}
              initialClass={initialClass}
              onBookingData={handleBookingData}
            />
          </div>
        )}

        {!isFetching && flight && !flightReturn && (
          <FlightDetails
            bookingData={bookingData}
            flight_number={flight.flight_number}
            airline_name={flight.airline.airline_name}
            information={flight.information}
            departure_airport={flight.departureAirport.airport_name}
            departure_airport_city_code={
              flight.departureAirport.airport_city_code
            }
            departure_terminal={flight.departure_terminal}
            departure_time={flight.departure_time}
            arrival_airport={flight.arrivalAirport.airport_name}
            arrival_airport_city_code={flight.arrivalAirport.airport_city_code}
            airline_picture={flight.airline.airline_picture}
            arrival_time={flight.arrival_time}
            adult={searchParams.get("adult")}
            infant={searchParams.get("infant")}
            children={searchParams.get("children")}
            price={price}
          />
        )}
        {!isFetching && flight && flightReturn && (
          <FlightDetails
            bookingData={bookingData}
            flight_number={flight.flight_number}
            airline_name={flight.airline.airline_name}
            information={flight.information}
            departure_airport={flight.departureAirport.airport_name}
            departure_airport_city_code={
              flight.departureAirport.airport_city_code
            }
            departure_terminal={flight.departure_terminal}
            departure_time={flight.departure_time}
            arrival_airport={flight.arrivalAirport.airport_name}
            arrival_airport_city_code={flight.arrivalAirport.airport_city_code}
            airline_picture={flight.airline.airline_picture}
            arrival_time={flight.arrival_time}
            return_flight_number={flightReturn.flight_number}
            return_airline_name={flightReturn.airline.airline_name}
            return_information={flightReturn.information}
            return_departure_airport={
              flightReturn.departureAirport.airport_name
            }
            return_departure_airport_city_code={
              flightReturn.departureAirport.airport_city_code
            }
            return_departure_terminal={flightReturn.departure_terminal}
            return_departure_time={flightReturn.departure_time}
            return_arrival_airport={flightReturn.arrivalAirport.airport_name}
            return_arrival_airport_city_code={
              flightReturn.arrivalAirport.airport_city_code
            }
            return_airline_picture={flightReturn.airline.airline_picture}
            return_arrival_time={flightReturn.arrival_time}
            adult={searchParams.get("adult")}
            infant={searchParams.get("infant")}
            children={searchParams.get("children")}
            price={price}
            return_price={priceReturn}
          />
        )}
      </main>
    </div>
  );
};

export default BookingPage;
