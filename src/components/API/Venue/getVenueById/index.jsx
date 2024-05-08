import { BASE_URL, Venues } from "../..";

export async function getVenueById (venueId, apiKey) {
      const accessToken = localStorage.getItem("accessToken");
      const getVenueByIdUrl = `${BASE_URL}${Venues}/${venueId}?_bookings=true`

    //   console.log("Fetching venue by ID with URL API call:", getVenueByIdUrl);

        const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    const response = await fetch(getVenueByIdUrl, options);
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching venue id:", error);
    throw error;
  }
}
