const BASE_URL = "https://plucky-agent-424606-s3.et.r.appspot.com";

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
      "Content-Type": "application/json",
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
