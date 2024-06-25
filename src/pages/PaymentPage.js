import React from "react";
import PaymentOptions from "../components/PaymentOptions";
import StepsSection from "../components/StepsSection";
import UserNavbar from "../components/NavbarAccount";

const PaymentPage = () => {
  return (
    <div>
      <UserNavbar />
      <StepsSection />
      <PaymentOptions />
    </div>
  );
};

export default PaymentPage;
