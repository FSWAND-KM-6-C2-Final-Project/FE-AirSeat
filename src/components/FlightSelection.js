import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { format, addDays } from "date-fns";

const FlightSelection = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dates, setDates] = useState([]);

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
      <div className="p-4 md:p-10 shadow-md">
        <h2 className="font-bold text-2xl text-left md:ml-24 lg:ml-32 xl:ml-44">
          Flight Details
        </h2>
        <div className="flex flex-col md:flex-row md:justify-center">
          <Link
            to={"/"}
            className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-full md:w-7/12 mt-4 md:mt-8 font-semibold hover:bg-customBlue1"
          >
            <FiArrowLeft size={24} className="mr-2" />
            JKT > MLB - 2 Passangers - Economy
          </Link>
          <Link
            to={"/"}
            className="flex items-center justify-center bg-[#73CA5C] text-white px-4 py-3 w-full md:w-2/12 mt-4 md:mt-8 ml-0 md:ml-2 rounded-xl font-semibold hover:bg-[#5EA248]"
          >
            Change Search
          </Link>
        </div>

        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <div className="flex flex-nowrap sm:grid-cols-3 md:grid-cols-7 gap-5 text-center overflow-x-auto">
            {dates.map((date, index) => (
              <button
                key={index}
                className={`px-4 rounded-lg ${
                  index === selectedDay
                    ? "bg-customBlue1 text-white text-sm"
                    : "bg-gray-200 text-black text-sm"
                } ${selectedDay !== null ? "" : "sm:p-4"}`}
                style={{ width: "200px", height: "50px" }}
                onClick={() => handleDayClick(index)}
              >
                <div
                  className={`font-bold ${
                    index === selectedDay ? "text-white" : "text-black"
                  } sm:text-sm md:text-sm`}
                >
                  {date.day}
                </div>
                <div
                  className={`font-semibold ${
                    index === selectedDay ? "text-white" : "text-gray-500"
                  } sm:text-sm md:text-sm`}
                >
                  {date.date}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSelection;
