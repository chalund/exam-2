import { BASE_URL, Bookings } from "../../index.jsx";

export const createBooking = async (newData, apiKey) => {
  const accessToken = localStorage.getItem("accessToken");
  const createBookingUrl = `${BASE_URL}${Bookings}`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  };

  try {
    const response = await fetch(createBookingUrl, options);

    if (!response.ok) {
      throw new Error("Failed to create venue");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};
