import { BASE_URL, Venues } from "../..";

export async function deleteVenue(id, apiKey) {
  const accessToken = localStorage.getItem("accessToken");
  const deleteVenueUrl = `${BASE_URL}${Venues}/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    const response = await fetch(deleteVenueUrl, options);
    if (!response.ok) {
      throw new Error("Failed to delete venue");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}