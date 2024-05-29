import React from "react";
import PaymentOptions from "../components/PaymentOptions";
import StepsSection from "../components/StepsSection";
import NavbarBook from "../components/NavbarBook";

const PaymentPage = () => {
  return (
    <div>
      <NavbarBook />
      <StepsSection />
      <PaymentOptions />
    </div>
  );
};

export default PaymentPage;
