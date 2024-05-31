import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { format, addDays } from 'date-fns';

const FlightSelection = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const dayIndex = today.getDay();
    setSelectedDay(0);

    const generateDates = () => {
      const dateArray = [];
      for (let i = 0; i < 7; i++) {
        const nextDate = addDays(today, i);
        dateArray.push({
          day: format(nextDate, 'eeee'),
          date: format(nextDate, 'dd/MM/yyyy')
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
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Pilih Penerbangan</h2>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0">
        <div className="bg-customBlue2 text-white p-3 rounded-lg w-full md:w-auto md:px-56 md:py-2">
          <div className="flex items-center space-x-2 text-sm">
            <FiArrowLeft className="cursor-pointer" />
            <span>JKT &rarr; MLB - 2 Penumpang - Economy</span>
          </div>
        </div>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm md:px-4 md:py-2"
        >
          Change Search
        </button>
      </div>
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
          >
            <div>{date.day}</div>
            <div className="text-sm">{date.date}</div>
          </div>
        ))}
      </div>
      <button className="flex items-center bg-customBlue2 text-white px-4 py-2 rounded-full shadow-lg">
        Termurah
      </button>
    </div>
  );
};

export default FlightSelection;
