import React, { useEffect, useState } from "react";
import { createApiKey } from "../../../API/ApiKey";
import { getProfile } from "../../../API/Profile/getProfile";
import VenueBookings from "../../../Booking";

const VenuesBookings = ({ id }) => {
  // Destructure the id prop here
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username not found in local storage");
        }

        // Create API key first
        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;

        // Fetch profile with the created API key
        const profile = await getProfile(username, apiKey);
        console.log("Profile data, venues bookings:", profile); // Add this line to check profileData
        setProfileData(profile.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          {profileData && profileData.venues.length === 0 ? (
            <div>
              <h1>Bookings in venue</h1>
              <p className="ms-6 text-lg">No venues available...</p>
            </div>
          ) : (
            <>
              <h1 className="ms-6 items-center text-xl font-semibold uppercase text-orange-600 md:text-2xl">
                Bookings in venue {profileData.name}
              </h1>
              {profileData && profileData.bookings.length === 0 ? (
                <p className="ms-6 mt-3 text-lg">Your venue has no bookings</p>
              ) : null}
              {profileData &&
                profileData.venues.map((venue) => (
                  <VenueBookings key={venue.id} id={venue.id} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenuesBookings;
