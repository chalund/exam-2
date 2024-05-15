import { BASE_URL, Venues } from "../..";

export async function deleteVenue(venueId, apiKey) {
  const accessToken = localStorage.getItem("accessToken");

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${Venues}/${venueId}`, options);
    if (!response.ok) {
      throw new Error("Failed to delete venue");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}
