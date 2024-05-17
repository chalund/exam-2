import CreateNewVenueButton from "../CreateNewVenue";
import { createApiKey } from "../../../API/ApiKey";
import { Link } from "react-router-dom";
import { deleteVenue } from "../../../API/Venue/deleteVenue";
import { GoTrash } from "react-icons/go";
import useFetchProfile from "../../../Hooks/useFetchProfile";
import Spinner from "../../../Spinner/Loader";
import NoImage from "../../../../assets/no_image.jpg"; 

const MyVenues = () => {
  const { profileData, isLoading, error } = useFetchProfile();

  if (isLoading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{`Error: ${error}`}</div>;
  }

  const handleDeleteVenue = async (id) => {
    try {
        // Display a confirmation message to the user
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this venue?",
        );

        // Check if the user clicked "Cancel" or closed the dialog
        if (!shouldDelete) {
            return; // Exit the function without deleting the venue
        }

        // Proceed with venue deletion
        const apiKeyData = await createApiKey("Venue deletion key");
        const apiKey = apiKeyData.data.key;

        const response = await deleteVenue(id, apiKey);
        console.log(response);

        window.location.reload();

        // Check if the response is empty
        if (!response) {
            throw new Error("Empty response received from the server");
        }

        // Check if the response is in the expected format
        if (response.success) {
            // Display a success message to the user
            alert("Your venue is deleted successfully!");

            // Reload the page after successful deletion
           
        } else {
            throw new Error("Failed to delete venue");
        }
    } catch (error) {
        console.error("Error deleting venue:", error);
    }
};


  

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="ms-6 items-center text-xl font-semibold uppercase text-orange-600 md:text-2xl">
          My venues
        </h1>
        <div className="mr-2 flex flex-col md:mr-7">
          <CreateNewVenueButton />
        </div>
      </div>

      {profileData && profileData.venues.length === 0 ? (
        <p className="ms-6 text-lg">No venues available...</p>
      ) : (
        <div className="m-6 rounded-xl border">
          {profileData &&
            profileData.venues.map((venue) => (
              <div
                key={venue.id}
                className="flex flex-col items-center hover:bg-zinc-100  sm:flex-row"
              >
                <div className="px-6 py-4">
                  {venue.media && venue.media.length > 0 ? (
                    <Link
                      to={`/venue/${venue.id}`}
                      key={venue.id}
                      className="block"
                    >
                      <img
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                        className="h-24 w-24 rounded-xl"
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/venue/${venue.id}`}
                      key={venue.id}
                      className="block"
                    >
                      <img
                        src={NoImage}
                        alt="No Image Available"
                        className="h-24 w-24 rounded-xl border"
                      />
                    </Link>
                  )}
                </div>

                <div className="mb-2 ms-4 text-lg">{venue.name}</div>
                <div className="ml-2 flex items-end md:ml-auto md:mr-12">
                  {" "}
                  <Link to={`/venue/bookings/${venue.id}`}>
                    <button className="mb-2 mr-2  rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
                      View bookings
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteVenue(venue.id)}
                    className="mb-2 flex h-8 w-24 items-center gap-1 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:from-red-500 hover:to-red-700 hover:text-white"
                  >
                    <GoTrash size={14} />
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
