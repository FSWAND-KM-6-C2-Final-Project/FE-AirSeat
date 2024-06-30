const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com";

export async function getDiscounts() {
  const response = await fetch(`${BASE_URL}/api/v1/discount`);

  const resData = await response.json();

  return resData;
}

export async function getDiscountById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/discount/${id}`);

  const resData = await response.json();

  return resData;
}
