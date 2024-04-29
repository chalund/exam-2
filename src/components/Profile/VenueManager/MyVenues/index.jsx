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
      const shouldDelete = window.confirm("Are you sure you want to delete this venue?");
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
        <div className="mr-3 flex flex-col">
          <CreateNewVenueButton onClick={handleCreateNewVenueForm} />
        </div>
      </div>

      {profileData && profileData.venues.length === 0 ? (
        <p className="ms-6 text-lg">No venues available...</p>
      ) : (
        <div className="inline-block min-w-full py-2 align-middle sm:px-2 md:px-8 ">
          <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Product Image
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Product Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {profileData &&
                  profileData.venues.map((venue) => (
                    <tr key={venue.id}>
                      <td className="px-6 py-4">
                        {venue.media && venue.media.length > 0 && (
                          <Link
                            to={`/venue/${venue.id}`}
                            key={venue.id}
                            className="block"
                          >
                            <img
                              src={venue.media[0].url}
                              alt={venue.media[0].alt}
                              className="h-20 w-20"
                            />
                          </Link>
                        )}
                      </td>
                      <td className="py-4 sm:w-auto">{venue.name}</td>
                      <td>
                        <div className="mr-5 flex justify-end">
                          <button className="mb-2 mr-2 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
                            Edit
                          </button>
                          <button
                          onClick={() => handleDeleteVenue(venue.id)}
                           className="mb-2 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVenues;
