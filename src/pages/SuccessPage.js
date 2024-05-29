import React from "react";
import PaymentSuccess from "../components/PaymentSuccess";
import Navbar from "../components/Navbar";
import StepsSection from "../components/StepsSection";

const SuccessPage = () => {
  return (
    <div>
      <Navbar />
      <StepsSection />
      <PaymentSuccess />
    </div>
  );
};

export default SuccessPage;
