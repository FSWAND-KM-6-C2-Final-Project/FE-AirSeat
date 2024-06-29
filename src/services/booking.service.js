const BASE_URL = "http://localhost:3001";

export async function bookingFlight(data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/booking`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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

export async function getBookingHistory(
  token,
  page = 1,
  bookingCode,
  startDate,
  endDate
) {
  let response;
  if (bookingCode && !startDate && !endDate) {
    response = await fetch(
      `${BASE_URL}/api/v1/booking/detail?limit=10&page=${page}&sortBy=transactionDate&order=desc&bookingCode=${bookingCode}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else if (!bookingCode && startDate && endDate) {
    response = await fetch(
      `${BASE_URL}/api/v1/booking/detail?limit=10&page=${page}&sortBy=transactionDate&order=desc&start_date=${startDate}&end_date=${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else if (bookingCode && startDate && endDate) {
    response = await fetch(
      `${BASE_URL}/api/v1/booking/detail?limit=10&page=${page}&sortBy=transactionDate&order=desc&bookingCode=${bookingCode}&start_date=${startDate}&end_date=${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = await fetch(
      `${BASE_URL}/api/v1/booking/detail?limit=10&page=${page}&sortBy=transactionDate&order=desc`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
}

export async function cancelBooking(data, token) {
  const response = await fetch(`${BASE_URL}/api/v1/booking/cancel/${data}`, {
    method: "POST",
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
