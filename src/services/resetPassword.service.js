const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com";

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
