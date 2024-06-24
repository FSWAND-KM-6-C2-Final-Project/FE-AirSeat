import React from "react";
import FlightResults from "../components/FlightResults";
import FlightSelection from "../components/FlightSelection";
import NavbarAccount from "../components/NavbarAccount";

const ReturnSearchPage = () => {
  return (
    <div>
      <NavbarAccount />
      <FlightSelection />
      <FlightResults />
    </div>
  );
};

export default ReturnSearchPage;
