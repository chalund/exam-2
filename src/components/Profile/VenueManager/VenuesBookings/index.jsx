import React, { useEffect, useState } from "react";
import { createApiKey } from "../../../API/ApiKey";
import { getProfile } from "../../../API/Profile/getProfile";

const VenuesBookings = () => {
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
            <p className="ms-6 text-lg">No venues available...</p>
          ) : (
            <>
              <h1 className="ms-6 text-xl md:text-2xl font-semibold uppercase text-orange-600 items-center">
                Bookings in venues
              </h1>
              {profileData && profileData.bookings.length === 0 ? (
                <p className="ms-6 mt-3 text-lg">Your venue has no bookings</p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default VenuesBookings;
