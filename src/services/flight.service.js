const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com";

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
