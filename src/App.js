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
import OrderHistory from "./pages/OrderHistoryPage";
import OrderHistoryEmpty from "./pages/OrderHistoryEmptyPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthenticatePage from "./pages/UnauthenticatePage";
import RequestResetPasswordPage from "./pages/RequestResetPasswordPage";
import "./index.css";
import OTPResetPasswordPage from "./pages/OTPResetPasswordPage";
import ReturnSearchPage from "./pages/ReturnSearchPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/activation/otp" element={<OTPPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/reset-password/request"
            element={<RequestResetPasswordPage />}
          />
          <Route
            path="/reset-password/otp"
            element={<OTPResetPasswordPage />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/return" element={<ReturnSearchPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<SuccessPage />} />
          <Route path="/profile" element={<AccountPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-history-empty" element={<OrderHistoryEmpty />} />
          <Route path="/restricted" element={<UnauthenticatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
