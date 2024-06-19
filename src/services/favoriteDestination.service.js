const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com";

export async function getFavoriteDestinations(continent) {
  if (continent === "all") {
    const response = await fetch(`${BASE_URL}/api/v1/flight`);

    const resData = await response.json();

    return resData;
  } else {
    const response = await fetch(
      `${BASE_URL}/api/v1/flight?continent=${continent}`
    );

    const resData = await response.json();

    return resData;
  }
}
