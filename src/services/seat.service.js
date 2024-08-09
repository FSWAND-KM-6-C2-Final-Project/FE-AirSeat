const BASE_URL = "https://airseat.akbarrahmatm.my.id";

export async function getSeatByFlightId(id, seatClass = "economy") {
  const response = await fetch(
    `${BASE_URL}/api/v1/seat/flight/${id}?seatClass=${seatClass}`
  );

  const resData = await response.json();

  return resData;
}
