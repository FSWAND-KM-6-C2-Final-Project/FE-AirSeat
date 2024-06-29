const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com/";

export async function getSeatByFlightId(id, seatClass = "economy") {
  const response = await fetch(
    `${BASE_URL}/api/v1/seat/flight/${id}?seatClass=${seatClass}`
  );

  const resData = await response.json();

  return resData;
}
