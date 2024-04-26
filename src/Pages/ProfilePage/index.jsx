import React, { useEffect, useState } from "react";
import { BASE_URL, Profile } from "../../components/API";
import { createApiKey } from "../../components/API/ApiKey";
import EditProfileButton from "../../components/EditProfile";
import MyVenues from "../../components/VenueManager/MyVenues";
import VenuesBookings from "../../components/VenueManager/VenuesBookings";

export async function getProfile(username, apiKey) {
  const accessToken = localStorage.getItem("accessToken");
  const getProfileUrl = `${BASE_URL}${Profile}/${username}`;

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

const ProfilePage = () => {
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
        console.log("Profile data:", profile); // Add this line to check profileData
        setProfileData(profile.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfileClick = () => {
    console.log("Edit profile button clicked");
    // Add code to handle the edit profile action
  };

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="border border-black bg-white md:mt-6 md:rounded-xl">
        {profileData && (
          <div>
            <div className="relative">
              {/* Banner image */}
              <img
                src={profileData.banner.url}
                alt=""
                className="h-40 w-full rounded-t-xl object-cover"
              />

              {/* Profile image */}
              <img
                src={profileData.avatar.url}
                alt=""
                className="translate-y-1/5 absolute inset-1/2 h-32 w-32 -translate-x-1/2 transform rounded-full border-4 border-white"
              />
            </div>
            <div className="mt-16 text-center">
              <p className="font-semibold">{profileData.name}</p>
              <p>{profileData.email}</p>
              <p>{profileData.bio}</p>
              <div className="flex items-center justify-center gap-1 py-2">
                <p className="h-5 w-5 rounded-full bg-violet-600 "></p>
                <p className="uppercase">
                  {profileData.venueManager ? "Venue Manager" : "Guest"}
                </p>
              </div>
              <EditProfileButton onClick={handleEditProfileClick} />
            </div>

            {/* Render other profile data as needed */}
          </div>
        )}
      </div>

      {profileData && profileData._count.bookings === 0 ? (
        <div className="border border-black bg-white  md:rounded-xl">
          <h2>No bookings available</h2>
        </div>
      ) : (
        <div className="border border-black bg-white  md:rounded-xl">
          <h2>My bookings</h2>
          {/* Render your bookings here */}
        </div>
      )}

      {profileData && profileData.venueManager && (
        <div className="border border-black bg-white  md:rounded-xl">
          <MyVenues />
        </div>
      )}

      {profileData && profileData.venueManager && (
        <div className="border border-black bg-white  md:rounded-xl">
          <VenuesBookings />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
