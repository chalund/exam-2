// import { BASE_URL, Profile } from "../..";

import { apiRequest } from "../../ApiRequest";

// export async function getProfile(username, apiKey) {
//   const accessToken = localStorage.getItem("accessToken");
//   const getProfileUrl = `${BASE_URL}${Profile}/${username}?_bookings=true&_venues=true`;

//   const options = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "X-Noroff-API-Key": apiKey,
//     },
//   };

//   try {
//     const response = await fetch(getProfileUrl, options);
//     if (!response.ok) {
//       throw new Error("Failed to fetch profile");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     throw error;
//   }
// }




export const getProfile = async (username, apiKey) => {
  const endpoint = `/profiles/${username}?_bookings=true&_venues=true`;
  // console.log(`Fetching profile for ${username} with API key: ${apiKey}`); // Log before making the request
  const response = await apiRequest(endpoint, "GET", null, apiKey);
  // console.log(`Fetched profile data:`, response); // Log after receiving the response
  return response;
};


