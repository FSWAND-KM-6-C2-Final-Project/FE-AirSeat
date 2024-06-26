const BASE_URL = "http://localhost:3000";

export async function getAirportData() {
  const response = await fetch(`${BASE_URL}/api/v1/airport`);

  const resData = await response.json();

  return resData;
}

export async function getAirportDataById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/airport/${id}`);

  const resData = await response.json();

  return resData;
}
