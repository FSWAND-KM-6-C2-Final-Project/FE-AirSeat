import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow-md p-3">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <a href="/" className="text-customBlue1 text-xl font-bold">
            AirSeat
          </a>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
