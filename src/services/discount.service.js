const BASE_URL = "https://airseat.akbarrahmatm.my.id";

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
