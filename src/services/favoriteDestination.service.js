const BASE_URL = "http://localhost:3001";

export async function getFavoriteDestinations(continent, page = 1, limit = 10) {
  if (continent === "all") {
    const response = await fetch(
      `${BASE_URL}/api/v1/flight?page=${page}&limit=${limit}&sortBy=departureTime&order=asc`
    );

    const resData = await response.json();

    return resData;
  } else {
    const response = await fetch(
      `${BASE_URL}/api/v1/flight?continent=${continent}&page=${page}&limit=${limit}`
    );

    const resData = await response.json();

    return resData;
  }
}
