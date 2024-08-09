const BASE_URL = "https://airseat.akbarrahmatm.my.id";

export async function getAirportData(page = 1) {
  const response = await fetch(
    `${BASE_URL}/api/v1/airport?limit=10&page=${page}`
  );

  const resData = await response.json();

  return resData;
}

export async function getAirportDataById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/airport/${id}`);

  const resData = await response.json();

  return resData;
}
