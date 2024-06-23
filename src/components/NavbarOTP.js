import React from "react";
import Logo from "../images/logo_airseat.png";

const NavbarOTP = () => {
  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow-md p-3">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <a
            href="/"
            className="text-customBlue1 flex items-end text-xl font-bold"
          >
            <img className="h-[2rem] mr-1" src={Logo} alt="Logo" />
            AirSeat
          </a>
        </div>
      </header>
    </div>
  );
};

export default NavbarOTP;
