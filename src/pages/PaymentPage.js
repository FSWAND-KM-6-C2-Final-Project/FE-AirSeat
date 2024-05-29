import React from 'react';
import PaymentOptions from '../components/PaymentOptions';
import Navbar from '../components/Navbar';
import StepsSection from '../components/StepsSection';

const PaymentPage = () => {
  return (
    <div>
      <Navbar />
      <StepsSection />
      <PaymentOptions />
    </div>
  );
};

export default PaymentPage;
