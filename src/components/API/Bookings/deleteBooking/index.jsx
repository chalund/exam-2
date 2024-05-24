import { BASE_URL} from "../..";
import { createApiKey } from "../../ApiKey";

const handleDeleteBooking = async (venueId, navigate) => {
  const accessToken = localStorage.getItem("accessToken");
  const shouldDelete = window.confirm(
    "Are you sure you want to delete this booking?",
  );

  if (!shouldDelete) {
    return;
  }

  try {
    const apiKeyData = await createApiKey("Booking deletion key");
    const apiKey = apiKeyData.data.key;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${BASE_URL}/bookings/${venueId}`, options);
    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }

    if (response.status === 204) {
      alert("Your booking is deleted successfully!");
      if (navigate) {
        navigate("/profile");
      } else {
        window.location.reload();
      }
      return;
    }

    const responseData = await response.json();

    if (responseData.success) {
      alert("Your booking is deleted successfully!");
      if (navigate) {
        navigate("/profile");
      } else {
        window.location.reload();
      }
    } else {
      throw new Error("Failed to delete booking");
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    alert("An error occurred while deleting the booking. Please try again.");
  }
};

export default handleDeleteBooking;
