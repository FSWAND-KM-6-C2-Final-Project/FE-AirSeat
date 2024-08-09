const BASE_URL = "https://airseat.akbarrahmatm.my.id";

export async function getFlightData(
  deptAirport,
  arrAirport,
  deptDate,
  sort = "price_economy",
  order = "asc"
) {
  const response = await fetch(
    `${BASE_URL}/api/v1/flight?deptAirport=${deptAirport}&arrAirport=${arrAirport}&searchDate=${deptDate}&sortBy=${sort}&order=${order}`
  );

  const resData = await response.json();

  return resData;
}

export async function getFlightById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/flight/${id}`);

  const resData = await response.json();

  return resData;
}
