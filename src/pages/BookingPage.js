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

const BookingPage = () => {
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

  const initialClass = "Economy";

  useEffect(() => {
    if (!flight) {
      navigate("/");
    }
    fetchFlightById();
  }, []);

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

  const handleBookingData = (data) => {
    setBookingData(data);
  };

  return (
    <div>
      <UserNavbar />
      <StepsSection />
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
