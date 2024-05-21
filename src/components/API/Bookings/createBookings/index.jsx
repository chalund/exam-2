// import { BASE_URL, Bookings } from "../../index.jsx";

import { apiRequest } from "../../ApiRequest";

// export const createBooking = async (newData, apiKey) => {
//   const accessToken = localStorage.getItem("accessToken");
//   const createBookingUrl = `${BASE_URL}${Bookings}`;

//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "X-Noroff-API-Key": apiKey,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newData),
//   };

//   try {
//     const response = await fetch(createBookingUrl, options);

//     if (!response.ok) {
//       throw new Error("Failed to create venue");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error creating venue:", error);
//     throw error;
//   }
// };





export const createBooking = async (newData, apiKey) => {
  const endpoint = "/bookings";
  console.log(`Creating booking with data:`, newData);
  console.log(`Using API key: ${apiKey}`);

  const response = await apiRequest(endpoint, "POST", newData, apiKey);
  console.log(`Booking created successfully:`, response);
  
  return response;
};


