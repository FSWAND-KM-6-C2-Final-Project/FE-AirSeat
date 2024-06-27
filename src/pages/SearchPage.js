import React, { useEffect } from "react";
import FlightResults from "../components/FlightResults";
import FlightSelection from "../components/FlightSelection";
import NavbarAccount from "../components/NavbarAccount";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const departure_airport_id = searchParams.get("deptAirport");
  const arrival_airport_id = searchParams.get("arrAirport");
  const departure_data = searchParams.get("deptDate");
  const adult = searchParams.get("adult");
  const children = searchParams.get("children");
  const infant = searchParams.get("infant");
  const seatClass = searchParams.get("class");
  const returnDate = searchParams.get("returnDate");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  useEffect(() => {
    if (
      !departure_airport_id ||
      !arrival_airport_id ||
      !departure_data ||
      !adult ||
      !children ||
      !infant ||
      !seatClass
    ) {
      navigate("/");
      navigate(0);
    }
  }, []);

  return (
    <div>
      <NavbarAccount />
      <FlightSelection />
      <FlightResults />
    </div>
  );
};

export default SearchPage;
