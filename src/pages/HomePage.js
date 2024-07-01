import React from "react";
import Home from "../components/Home";
import UserNavbar from "../components/NavbarAccount";
import Title from "../components/Title";

const HomePage = () => {
  return (
    <div>
      <Title text={"Home"} />
      <UserNavbar />
      <Home />
    </div>
  );
};

export default HomePage;
