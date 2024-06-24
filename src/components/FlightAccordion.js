import React from "react";
import { useState } from "react";
import { seoTitle } from "string-fn";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getUser } from "../services/auth.service";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function FlightAccordion(props) {
  const {
    airline,
    flightClass,
    departureTime,
    arrivalTime,
    totalTime,
    idFlight,
    type,
    departureAirportId,
    arrivalAirportId,
    price,
    date,
    dep_airport,
    code,
    information,
    arr_airport,
    logo,
  } = props;
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const dayjs = require("dayjs");
  const utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);

  function toggleAccordion() {
    setAccordionOpen(!accordionOpen);
  }

  const handleSearchFlight = (flightId, e) => {
    e.stopPropagation();

    const departure_airport_id = searchParams.get("deptAirport");
    const arrival_airport_id = searchParams.get("arrAirport");
    const departure_data = searchParams.get("deptDate");
    const adult = searchParams.get("adult");
    const children = searchParams.get("children");
    const infant = searchParams.get("infant");
    const seatClass = searchParams.get("class");
    const returnDate = searchParams.get("returnDate");
    const idFlight = searchParams.get("flightId");
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");

    const tokenUser = localStorage.getItem("token");

    const checkUser = async () => {
      try {
        const response = await getUser(tokenUser);

        if (response) {
          setIsAuthenticated(true);
        } else {
          toast.error("Please sign in first", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              width: "100%",
              textAlign: "center",
            },
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (err) {
        console.log(err);
        toast.error("Your session has expired, please log in again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        if (err.message === "jwt malformed" || err.message === "jwt expired") {
          localStorage.removeItem("token");
        }
      }
    };

    if (idFlight) {
      if (!tokenUser) {
        toast.error("Please sign in first", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { width: "100%", textAlign: "center" },
          position: "top-center",
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        checkUser();
        navigate({
          pathname: "/booking",
          search: createSearchParams({
            adult,
            infant,
            children,
            class: seatClass,
            flightId: idFlight,
            returnFlightId: flightId,
          }).toString(),
        });
        navigate(0);
      }
    } else {
      if (returnDate) {
        navigate({
          pathname: "/search/return",
          search: createSearchParams({
            deptAirport: arrival_airport_id,
            arrAirport: departure_airport_id,
            deptDate: returnDate,
            adult,
            infant,
            children,
            class: seatClass,
            flightId: flightId,
          }).toString(),
        });
        navigate(0);
      } else {
        if (!tokenUser) {
          toast.error("Please sign in first", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { width: "100%", textAlign: "center" },
            position: "top-center",
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        } else {
          checkUser();
          navigate({
            pathname: "/booking",
            search: createSearchParams({
              adult,
              infant,
              children,
              class: seatClass,
              flightId: flightId,
            }).toString(),
          });
          navigate(0);
        }
      }
    }
  };

  return (
    <div>
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <ToastContainer />
          <button
            type="button"
            className={`flex items-center w-full justify-between p-5 font-medium rtl:text-right ${
              accordionOpen
                ? "rounded-t-xl border border-t-customBlue2 border-l-customBlue2 border-r-customBlue2 border-b-none"
                : "rounded-xl border"
            } shadow-inner gap-3`}
            onClick={() => toggleAccordion()}
            aria-expanded={accordionOpen ? "true" : "false"}
            aria-controls="accordion-collapse-body-1"
          >
            <span className="w-full">
              <div className="flex items-center gap-3">
                <img className="w-10" src={logo} alt="" />
                <div className="">
                  <p>
                    {airline} - {seoTitle(flightClass)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex w-full items-center mt-5 text-xs sm:text-xs md:text-base lg:text-base xl:text-base">
                  <div>
                    <p className="font-bold">
                      {dayjs(departureTime).utc().format("HH:mm")}
                    </p>
                    <p className="font-semibold">{departureAirportId}</p>
                  </div>
                  <div className="flex-grow">
                    <p>{totalTime}</p>
                    <hr className="my-2 border-gray-200" />
                    <p>{type}</p>
                  </div>
                  <div>
                    <p className="font-bold">
                      {dayjs(arrivalTime).utc().format("HH:mm")}
                    </p>
                    <p className="font-semibold">{arrivalAirportId}</p>
                  </div>
                </div>
                {/* <div className="flex flex-col items-center space-y-2 w-56">
                  <p className="text-customBlue1 font-bold xl:text-xl lg:text-lg sm:text-sm">
                    {price}
                  </p>
                  <button className="bg-customBlue2 rounded-xl w-20 p-1 sm:w-24 sm:p-2 md:w-28 md:p-3 lg:w-32 lg:p-4 hover:bg-customBlue1 text-white text-xs sm:text-sm md:text-base lg:text-lg">
                    Select
                  </button>
                </div> */}
                <div className="flex flex-col items-center space-y-2 w-56">
                  <p className="text-customBlue1 font-bold xl:text-xl lg:text-lg sm:text-sm">
                    {new Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(price)}
                  </p>
                  <button
                    onClick={(e) => handleSearchFlight(idFlight, e)}
                    className="bg-customBlue2 rounded-lg w-20 p-1 sm:w-20 sm:p-2 md:w-20 md:p-2 lg:w-32 lg:p-2 hover:bg-customBlue1 text-white text-xs sm:text-sm md:text-sm lg:text-lg"
                  >
                    Select
                  </button>
                </div>
              </div>
            </span>
            <svg
              data-accordion-icon=""
              className={`w-3 h-3 rotate-${
                accordionOpen ? "180" : "0"
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>

        <div
          id="accordion-collapse-body-1"
          className={`px-10 py-5 rounded-b-xl  ${
            accordionOpen
              ? "border border-b-customBlue2 border-r-customBlue2 border-l-customBlue2 border-t-none"
              : "hidden border"
          }`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div>
            <div>
              <p className="font-bold text-customBlue2 text-lg">
                Flight Details
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <p className="font-bold">
                  {dayjs(departureTime).utc().format("HH:mm")}
                </p>
                <p>{dayjs(departureTime).utc().format("DD MMMM YYYY")}</p>
                <p className="font-semibold">{dep_airport}</p>
              </div>
              <div>
                <p className="font-bold text-lg text-customBlue3">Departure</p>
              </div>
            </div>
            <div>
              <hr className="my-5 border-gray-300" />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <img className="w-10" src={logo} alt="" />
              </div>
              <div>
                <div>
                  <p className="font-bold ">
                    {airline} - {seoTitle(flightClass)}
                  </p>
                  <p className="font-bold">{code}</p>
                </div>
                <div className="mt-3">
                  <p className="font-bold">Information:</p>
                  <p className="whitespace-pre-wrap">{information}</p>
                </div>
              </div>
            </div>
            <div>
              <hr className="my-5 border-gray-300" />
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <p className="font-bold">
                  {dayjs(arrivalTime).utc().format("HH:mm")}
                </p>
                <p>{dayjs(arrivalTime).utc().format("DD MMMM YYYY")}</p>
                <p className="font-semibold">{arr_airport}</p>
              </div>
              <div>
                <p className="font-bold text-lg text-customBlue3">Arrival</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
