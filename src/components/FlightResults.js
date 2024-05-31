import React, { useState } from 'react';
import { FaSuitcase, FaRegClock, FaHeart, FaDollarSign } from 'react-icons/fa';

const FlightCard = ({ time, duration, arrival, price, isHighlighted, onClick, isExpanded }) => {
  return (
    <div
      className={`flex flex-col border rounded-lg mb-4 ${isExpanded ? 'border-customBlue2 bg-white' : 'border-customBlue2 bg-white'} w-full`}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="flex items-center space-x-2">
            <img src="path/to/airline-logo.png" alt="Airline Logo" className="w-6 h-6" />
            <span className="text-sm font-semibold">Jet Air - Economy</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">{time}</span>
            <span className="text-sm text-gray-500">JKT</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">{duration}</span>
            <span className="text-xs text-gray-500">Direct</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">{arrival}</span>
            <span className="text-sm text-gray-500">MLB</span>
          </div>
          <div className="flex flex-col items-center">
            <FaSuitcase className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`text-lg font-bold ${isHighlighted ? (isExpanded ? 'text-red-500' : 'text-gray-900') : 'text-gray-900'}`}>{price}</span>
          <button
            className="bg-customBlue2 hover:bg-customBlue1 text-white px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = "/booking";
            }}
          >
            Select
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 border-t">
          <h4 className="font-semibold">Detail Penerbangan</h4>
          <p>07:00<br />3 Maret 2023<br />Soekarno Hatta - Terminal 1A Domestik</p>
          <p>Jet Air - Economy<br />JT - 203</p>
          <h4 className="font-semibold">Informasi:</h4>
          <p>Baggage 20 kg<br />Cabin baggage 7 kg<br />In Flight Entertainment</p>
          <p>11:00<br />3 Maret 2023<br />Melbourne International Airport</p>
        </div>
      )}
    </div>
  );
};

const Filter = () => {
  return (
    <div className="p-4 border rounded-lg mb-4 bg-white shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-4">Filter</h3>
      <div className="mb-4">
        <button className="flex items-center w-full text-left">
          <div className="flex items-center justify-center w-6 h-6 mr-2">
            <FaRegClock className="w-4 h-4" />
          </div>
          <span className="flex-1">Transit</span>
        </button>
      </div>
      <div className="mb-4">
        <button className="flex items-center w-full text-left">
          <div className="flex items-center justify-center w-6 h-6 mr-2">
            <FaHeart className="w-4 h-4" />
          </div>
          <span className="flex-1">Fasilitas</span>
        </button>
      </div>
      <div>
        <button className="flex items-center w-full text-left">
          <div className="flex items-center justify-center w-6 h-6 mr-2">
            <FaDollarSign className="w-4 h-4" />
          </div>
          <span className="flex-1">Harga</span>
        </button>
      </div>
    </div>
  );
};

const FlightList = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const flights = [
    { time: '07:00', duration: '4h 0m', arrival: '11:00', price: 'IDR 4.950.000', isHighlighted: true },
    { time: '08:00', duration: '4h 0m', arrival: '12:00', price: 'IDR 5.950.000', isHighlighted: false },
    { time: '13:15', duration: '4h 0m', arrival: '17:15', price: 'IDR 7.225.000', isHighlighted: false },
    { time: '20:15', duration: '3h 15m', arrival: '23:30', price: 'IDR 8.010.000', isHighlighted: false },
  ];

  const handleCardClick = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center bg-white p-4">
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg justify-center space-y-4 md:space-x-4 md:space-y-0">
        <div className="w-full md:w-1/4">
          <Filter />
        </div>
        <div className="w-full md:w-3/4">
          {flights.map((flight, index) => (
            <FlightCard
              key={index}
              {...flight}
              onClick={() => handleCardClick(index)}
              isExpanded={expandedCardIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
