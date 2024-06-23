const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com";

export async function getFlightData(
  deptAirport,
  arrAirport,
  deptDate,
  seatClass = ""
) {
  const response = await fetch(
    `${BASE_URL}/api/v1/flight?deptAirport=${deptAirport}&arrAirport=${arrAirport}&searchDate=${deptDate}`
  );

  const resData = await response.json();

  return resData;
}
