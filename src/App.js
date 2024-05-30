import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import Notification from "./pages/Notification";
import AccountPage from "./pages/Account";
import SearchPage from "./pages/SearchPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderHistoryEmptyPage from "./pages/OrderHistoryEmptyPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<SuccessPage />} />
          <Route path="/profile" element={<AccountPage />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route
            path="/order-history-empty"
            element={<OrderHistoryEmptyPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
