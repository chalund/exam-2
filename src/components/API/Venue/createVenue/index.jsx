import { BASE_URL, Venues } from "../../index.jsx";

// In your API file
export const createVenue = async (newData, apiKey) => {
  const accessToken = localStorage.getItem("accessToken");
  const createVenueUrl = `${BASE_URL}${Venues}`;

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
      const response = await fetch(createVenueUrl, options);

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

