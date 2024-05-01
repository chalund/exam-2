import React, { useEffect, useState } from "react";
import CreateNewVenueButton from "../CreateNewVenue";
import { getProfile } from "../../../API/Profile/getProfile";
import { createApiKey } from "../../../API/ApiKey";
import { Link } from "react-router-dom";
import { deleteVenue } from "../../../API/Venue/deleteVenue";

const MyVenues = () => {
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
        console.log("Profile data, My venue:", profile); // Add this line to check profileData
        setProfileData(profile.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteVenue = async (id) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this venue?",
      );
      if (!shouldDelete) {
        return; // User canceled the deletion
      }

      const apiKeyData = await createApiKey("Venue deletion key");
      const apiKey = apiKeyData.data.key;

      const response = await deleteVenue(id, apiKey);

      if (response && response.success) {
        // Display success message
        window.confirm("Your venue is deleted successfully!");
        // Refresh the page
        window.location.reload();
      } else {
        throw new Error("Failed to delete venue");
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
      // Handle error
    }
  };

  const handleCreateNewVenueForm = () => {
    console.log("Create new venue form");
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="ms-6 items-center text-xl font-semibold uppercase text-orange-600 md:text-2xl">
          My venues
        </h1>
        <div className="mr-2 flex flex-col md:mr-7">
          <CreateNewVenueButton onClick={handleCreateNewVenueForm} />
        </div>
      </div>

      {profileData && profileData.venues.length === 0 ? (
        <p className="ms-6 text-lg">No venues available...</p>
      ) : (
<div className="border rounded-xl m-6">

{profileData &&
  profileData.venues.map((venue) => (
    <div key={venue.id} className="flex flex-col sm:flex-row items-center  hover:bg-zinc-100">
      <div className="px-6 py-4">
        {venue.media && venue.media.length > 0 && (
          <Link to={`/venue/${venue.id}`} key={venue.id} className="block">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt}
              className="h-24 w-24 rounded-xl"
            />
          </Link>
        )}
      </div>
      <div className="mb-2 sm:ms-4 text-lg">{venue.name}</div>
      <div className="sm:ml-auto sm:flex sm:items-end sm:mr-12"> {/* Add ml-auto to push buttons to the end */}
        <button className="mb-2 mr-2 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white w-24 h-8">
          Edit
        </button>
        <button
          onClick={() => handleDeleteVenue(venue.id)}
          className="mb-2 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white w-24 h-8"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>



      )}
    </div>
  );
};

export default MyVenues;
