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
    // Check if response body is empty
    const responseData = await response.text();
    if (responseData.trim().length === 0) {
      // If response body is empty, return a success message
      return { success: true, message: "Venue deleted successfully" };
    }
    // Parse response body as JSON
    const data = JSON.parse(responseData);
    return data;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}
