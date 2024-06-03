import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OTPPage from "./pages/OTPPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import NotificationPage from "./pages/NotificationPage";
import AccountPage from "./pages/AccountPage";
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
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<SuccessPage />} />
          <Route path="/profile" element={<AccountPage />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/order-history-empty" element={<OrderHistoryEmptyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
