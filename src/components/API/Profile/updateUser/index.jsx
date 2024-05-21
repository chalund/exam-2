import { apiRequest } from "../../ApiRequest/index.jsx";
// import { BASE_URL, Profile } from "../../index.jsx";

// export async function updateProfile(username, newData, apiKey) {
//   const accessToken = localStorage.getItem("accessToken");
//   const updateProfileUrl = `${BASE_URL}${Profile}/${username}`;

//   console.log(updateProfileUrl);

//   const options = {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "X-Noroff-API-Key": apiKey,
//       "Content-Type": "application/json", // Specify content type
//     },
//     body: JSON.stringify(newData), // Convert newData to JSON string
//   };

//   try {
//     const response = await fetch(updateProfileUrl, options);
//     if (!response.ok) {
//       throw new Error("Failed to update profile");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     throw error;
//   }
// }

export const updateProfile = async (username, newData, apiKey) => {
  const endpoint = `/profiles/${username}`;
  console.log(`Fetching updateProfile for ${username} with API key: ${apiKey}`);
  const response = await apiRequest(endpoint,"PUT", newData, apiKey)
  return Response;
};
