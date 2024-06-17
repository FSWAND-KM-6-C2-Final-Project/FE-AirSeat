import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { format, addDays } from "date-fns";

const FlightSelection = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [dates, setDates] = useState([]);

  console.log(selectedDay)

  useEffect(() => {
    const today = new Date();
    setSelectedDay(0);

    const generateDates = () => {
      const dateArray = [];
      for (let i = 0; i < 7; i++) {
        const nextDate = addDays(today, i);
        dateArray.push({
          day: format(nextDate, "eeee"),
          date: format(nextDate, "dd/MM/yyyy"),
        });
      }
      return dateArray;
    };

    setDates(generateDates());
  }, []);

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  return (
    <>
      <div className="grid p-10 shadow-md">
        <h2 className="font-bold text-xl text-left md:ml-24 lg:ml-32 xl:ml-44">
          Flight Details
        </h2>
        <div className="flex justify-self-center w-full">
          <Link
            to={"/"}
            className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-full md:w-7/12 ml-2 md:ml-28 lg:ml-36 xl:ml-48 mt-8 font-semibold hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            JKT {">"} MLB - 2 Passangers - Economy
          </Link>
          <Link
            to={"/"}
            className="flex items-center justify-center bg-[#73CA5C] text-white px-4 py-3 w-full md:w-2/12 ml-2 mt-8 rounded-xl font-semibold hover:bg-[#5EA248]"
          >
            Change Search
          </Link>
        </div>

        
        <div className="p-4 sm:p-6 max-w-7xl justify-self-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 mb-4 text-center">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`p-1 rounded-lg ${
                  index === selectedDay
                    ? "bg-customBlue1 text-white"
                    : "bg-gray-200 text-black"
                } hover:bg-customBlue2 hover:text-white cursor-pointer`}
                onClick={() => handleDayClick(index)}
                onMouseEnter={() => setHoveredDay(index)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <div
                  className={`font-bold ${
                    index === selectedDay || index === hoveredDay
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {date.day}
                </div>
                <div
                  className={`text-sm font-semibold ${
                    index === selectedDay || index === hoveredDay
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  {date.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default FlightSelection;
