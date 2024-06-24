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

const BookingPage = () => {
  const [bookingData, setBookingData] = useState(null);
  const [flight, setFlight] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);

  const initialClass = "Economy";

  useEffect(() => {
    fetchFlightById();
    console.log(flight);
  }, []);

  const fetchFlightById = async () => {
    setIsFetching(true);
    try {
      const response = await getFlightById(searchParams.get("flightId"));
      if (response) {
        setFlight(response.data.flight);
        console.log(flight);
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
      <main className="mt-6 flex flex-col md:flex-row gap-2 justify-center">
        <div className="w-full md:w-1/2">
          <BookingForm
            initialClass={initialClass}
            onBookingData={handleBookingData}
          />
        </div>
        {!isFetching && flight && (
          <FlightDetails
            bookingData={bookingData}
            flight_number={flight.flight_number}
            airline_name={flight.airline.airline_name}
            information={flight.information}
            departure_airport={flight.departureAirport.airport_name}
            departure_terminal={flight.departure_terminal}
            departure_time={flight.departure_time}
            arrival_airport={flight.arrivalAirport.airport_name}
            airline_picture={flight.airline.airline_picture}
            arrival_time={flight.arrival_time}
          />
        )}
      </main>
    </div>
  );
};

export default BookingPage;
