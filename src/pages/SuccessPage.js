import React from "react";
import PaymentSuccess from "../components/PaymentSuccess";
import StepsSection from "../components/StepsSection";
import UserNavbar from "../components/NavbarAccount";

const SuccessPage = () => {
  return (
    <div>
      <UserNavbar />
      <StepsSection />
      <PaymentSuccess />
    </div>
  );
};

export default SuccessPage;
