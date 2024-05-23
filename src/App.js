import React from "react";
import BookingForm from "./components/BookingForm";
import FlightDetails from "./components/FlightDetails";
import "./index.css";
import Navbar from "./components/Navbar";

function App() {
  const initialClass = "Economy";

  return (
    <div className="App">
      <Navbar />
      <main className="mt-6 flex flex-col md:flex-row gap-2 justify-center">
        <div className="w-full md:w-1/2">
          <BookingForm initialClass={initialClass} />
        </div>
        <FlightDetails />
      </main>
    </div>
  );
}

export default App;
