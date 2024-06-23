import React from "react";
import BookingForm from "../components/BookingForm";
import FlightDetails from "../components/FlightDetails";
import StepsSection from "../components/StepsSection";
import UserNavbar from "../components/NavbarAccount";

const BookingPage = () => {
  const initialClass = "Economy";

  return (
    <div>
      <UserNavbar />
      <StepsSection />
      <main className="mt-6 flex flex-col md:flex-row gap-2 justify-center">
        <div className="w-full md:w-1/2">
          <BookingForm initialClass={initialClass} />
        </div>
        <FlightDetails />
      </main>
    </div>
  );
};

export default BookingPage;
