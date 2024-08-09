const BASE_URL = "https://airseat.akbarrahmatm.my.id";

export async function signIn(data) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
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

export async function getUser(token) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
}

export async function signUp(data) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
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

export async function checkIsActivationExist(data) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/activation/verify`, {
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
