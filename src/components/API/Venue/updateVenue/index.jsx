import { BASE_URL, Venues } from "../..";

export async function updateVenue(id, newData, apiKey) {
  const accessToken = localStorage.getItem("accessToken");
  const updateVenueUrl = `${BASE_URL}${Venues}/${id}`;

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json", // Specify content type
    },
    body: JSON.stringify(newData), // Convert newData to JSON string
  };

  try {
    const response = await fetch(updateVenueUrl, options);
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
}