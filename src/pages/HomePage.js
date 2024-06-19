import React from "react";
import Banner from "../components/Banner";
import Home from "../components/Home";
import UserNavbar from "../components/NavbarAccount";

const HomePage = () => {
  return (
    <div>
      <UserNavbar />
      <Home />
    </div>
  );
};

export default HomePage;
