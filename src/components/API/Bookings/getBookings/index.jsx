// import { BASE_URL, Bookings } from "../..";

// export async function getBookings(apiKey) {
//   const accessToken = localStorage.getItem("accessToken");
//   const getBookingsUrl = `${BASE_URL} ${Bookings}`;

//   const options = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "X-Noroff-API-Key": apiKey,
//     },
//   };

//   try {
//     const response = await fetch(getBookingsUrl, options);
//     if (!response.ok) {
//       throw new Error("Failed to Bookings");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching Bookings:", error);
//     throw error;
//   }
// }

import { apiRequest } from "../../ApiRequest";

export const getBookings = async (apiKey) => {
  return apiRequest("/bookings", "GET", null, apiKey);
};
