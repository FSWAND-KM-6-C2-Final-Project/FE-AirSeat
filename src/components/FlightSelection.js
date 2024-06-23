import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { format, addDays } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { seoTitle } from "string-fn";
import { getAirportDataById } from "../services/airport.service";

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const FlightSelection = ({ fromCity, toCity, passengers }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDay, setSelectedDay] = useState(0);
  const [dates, setDates] = useState([]);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [seatClass, setSeatClass] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  useEffect(() => {
    const adult = parseInt(searchParams.get("adult"));
    const infant = parseInt(searchParams.get("infant"));
    const children = parseInt(searchParams.get("children"));

    const total = adult + infant + children;

    setTotalPassenger(total);
    setSeatClass(searchParams.get("class"));

    fetchDepartureAirport(searchParams.get("deptAirport"));
    fetchArrivalAirport(searchParams.get("arrAirport"));

    const departure_date = dayjs(
      searchParams.get("deptDate"),
      "DD-MM-YYYY"
    ).toISOString();

    const today = departure_date;
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

  const fetchDepartureAirport = async (id) => {
    try {
      const airport = await getAirportDataById(id);

      setDepartureAirport(airport.data.airport.airport_name);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchArrivalAirport = async (id) => {
    try {
      const airport = await getAirportDataById(id);

      setArrivalAirport(airport.data.airport.airport_name);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  return (
    <div className="p-4 md:p-10 shadow-md">
      <h2 className="font-bold text-2xl text-left xl:ml-44">Flight Details</h2>
      <div className="flex flex-col md:flex-row md:justify-center">
        <Link
          to={"/"}
          className="flex items-center bg-customBlue2 text-white px-4 py-3 rounded-xl w-full md:w-7/12 mt-4 md:mt-8 font-semibold hover:bg-customBlue1"
        >
          <FiArrowLeft size={24} className="mr-2" />
          {`${departureAirport && departureAirport}  →  ${
            arrivalAirport && arrivalAirport
          } - ${totalPassenger && totalPassenger} Passengers - ${seoTitle(
            seatClass && seatClass
          )}`}
        </Link>
        <Link
          to={"/"}
          className="flex items-center justify-center bg-[#73CA5C] text-white text-center px-4 py-3 w-full md:w-2/12 mt-4 md:mt-8 ml-0 md:ml-2 rounded-xl font-semibold hover:bg-[#5EA248] hidden lg:block"
        >
          Change Search
        </Link>
      </div>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex flex-nowrap gap-5 text-center overflow-x-auto">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`px-4 rounded-lg ${
                index === selectedDay
                  ? "bg-customBlue1 text-white"
                  : "bg-gray-200 text-black"
              }`}
              style={{ width: "200px", height: "50px" }}
              onClick={() => handleDayClick(index)}
            >
              <div
                className={`font-bold ${
                  index === selectedDay ? "text-white" : "text-black"
                }`}
              >
                {date.day}
              </div>
              <div
                className={`font-semibold ${
                  index === selectedDay ? "text-white" : "text-gray-500"
                }`}
              >
                {date.date}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSelection;
