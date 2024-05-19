import { BASE_URL, Venues } from "../..";
import { createApiKey } from "../../ApiKey";

const handleDeleteVenue = async (venueId, navigate) => {
  const accessToken = localStorage.getItem("accessToken");
  const shouldDelete = window.confirm(
    "Are you sure you want to delete this venue?",
  );

  if (!shouldDelete) {
    return;
  }

  try {
    const apiKeyData = await createApiKey("Venue deletion key");
    const apiKey = apiKeyData.data.key;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${BASE_URL}${Venues}/${venueId}`, options);
    if (!response.ok) {
      throw new Error("Failed to delete venue");
    }

    if (response.status === 204) {
      alert("Your venue is deleted successfully!");
      if (navigate) {
        navigate("/profile");
      } else {
        window.location.reload();
      }
      return;
    }

    const responseData = await response.json();

    if (responseData.success) {
      alert("Your venue is deleted successfully!");
      if (navigate) {
        navigate("/profile");
      } else {
        window.location.reload();
      }
    } else {
      throw new Error("Failed to delete venue");
    }
  } catch (error) {
    console.error("Error deleting venue:", error);
    alert("An error occurred while deleting the venue. Please try again.");
  }
};

export default handleDeleteVenue;
