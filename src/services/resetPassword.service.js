const BASE_URL = "http://localhost:3001";

export async function requestReset(data) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
}

export async function changePassword(data) {
  const response = await fetch(
    `${BASE_URL}/api/v1/auth/password-reset/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }
  );

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
}
