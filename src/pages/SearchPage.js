import React from "react";
import FlightResults from "../components/FlightResults";
import NavbarBook from "../components/NavbarBook";
import FlightSelection from "../components/FlightSelection";
import NavbarAccount from "../components/NavbarAccount";

const SearchPage = () => {
  return (
    <div>
      <NavbarAccount />
      <FlightSelection />
      <FlightResults />
    </div>
  );
};

export default SearchPage;
