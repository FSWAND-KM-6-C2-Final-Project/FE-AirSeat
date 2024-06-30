import React from "react";
import FlightResults from "../components/FlightResults";
import FlightSelection from "../components/FlightSelection";
import NavbarAccount from "../components/NavbarAccount";
import Title from "../components/Title";

const ReturnSearchPage = () => {
  return (
    <div>
      <Title text={"Return Search Flight"} />
      <NavbarAccount />
      <FlightSelection />
      <FlightResults />
    </div>
  );
};

export default ReturnSearchPage;
