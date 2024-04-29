import { BASE_URL, Profile } from "../..";

export async function getProfile(username, apiKey) {
    const accessToken = localStorage.getItem("accessToken");
    const getProfileUrl = `${BASE_URL}${Profile}/${username}?_bookings=true&_venues=true`;
  
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    };
  
    try {
      const response = await fetch(getProfileUrl, options);
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }