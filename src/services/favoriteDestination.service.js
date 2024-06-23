const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com";

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
