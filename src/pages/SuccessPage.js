import React from "react";
import PaymentSuccess from "../components/PaymentSuccess";
import StepsSection from "../components/StepsSection";
import NavbarBook from "../components/NavbarBook";

const SuccessPage = () => {
  return (
    <div>
      <NavbarBook />
      <StepsSection />
      <PaymentSuccess />
    </div>
  );
};

export default SuccessPage;
