import React from "react";
import FlightResults from "../components/FlightResults";
import NavbarBook from "../components/NavbarBook";
import FlightSelection from "../components/FlightSelection";

const SearchPage = () => {
  return (
    <div>
      <NavbarBook />
      <FlightSelection />
      <FlightResults />
    </div>
  );
};

export default SearchPage;
