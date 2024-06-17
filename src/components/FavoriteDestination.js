import LoadingCard from "./LoadingCard";
import Pagination from "./Paginations";
import Error from "./Error";
import NotFoundError from "./NotFoundError";
import notFoundImage from "../images/not-found.png";

const dayjs = require("dayjs");

const FavoriteDestination = ({ data, isFetching }) => {
  return (
    <>
      {/* Future development (not found) */}
      {/* {!isFetching && data.length === 0 && (
        <div className="text-center flex flex-col justify-center  min-h-[20vh]">
          <h4></h4>
        </div>
      )} */}

      {!isFetching && data.length === 0 && (
        <div className="text-center flex flex-col justify-center min-h-[20vh]">
          <NotFoundError
            errorImage={notFoundImage}
            errorTitle={"Oopppss..."}
            errorMessage={"Sorry, Favorite Destination data is not found."}
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isFetching === true && <LoadingCard totalData={10} />}

        {data &&
          !isFetching &&
          data.length > 0 &&
          data.map((destination) => (
            <div
              className="bg-white rounded-lg shadow-md p-4 grid-item relative mb-10"
              key={destination.id}
            >
              <img
                src={destination.arrivalAirport.airport_picture}
                alt="Bangkok"
                className="rounded-t-lg w-full h-[150px] object-cover"
              />
              <span className="bg-customRed text-white px-2 py-1 rounded absolute top-0 right-0 mt-2 mr-2">
                Limited!
              </span>
              <div className="mt-2 text-sm">
                <h3 className="mt-2 text-lg font-bold">
                  {destination.departureAirport.airport_city} {"→ "}
                  {destination.arrivalAirport.airport_city}
                </h3>
                <p>{destination.airline.airline_name}</p>
                <p>
                  {dayjs(destination.departure_time).format("DD MMMM YYYY")}
                </p>
                <p className="text-red-600 font-bold">
                  Start from{" "}
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(destination.price_economy)}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="m-auto text-center mb-5">
        <Pagination />
      </div>
    </>
  );
};

export default FavoriteDestination;
