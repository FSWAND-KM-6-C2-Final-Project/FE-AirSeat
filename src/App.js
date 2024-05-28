import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import FlightDetails from "./components/FlightDetails";
import Navbar from "./components/Navbar";
import PaymentOptions from "./components/PaymentOptions";
import PaymentSuccess from "./components/PaymentSuccess";
import "./index.css";

function App() {
  const initialClass = "Economy";

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/booking"
            element={
              <main className="mt-6 flex flex-col md:flex-row gap-2 justify-center">
                <div className="w-full md:w-1/2">
                  <BookingForm initialClass={initialClass} />
                </div>
                <FlightDetails />
              </main>
            }
          />
          <Route path="/payment" element={<PaymentOptions />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
