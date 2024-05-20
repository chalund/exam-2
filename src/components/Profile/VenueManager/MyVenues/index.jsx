import React from 'react';
import { Link } from "react-router-dom";
import CreateNewVenueButton from "../CreateNewVenue";
import useFetchProfile from "../../../Hooks/useFetchProfile";
import Spinner from "../../../Spinner/Loader";
import NoImage from "../../../../assets/no_image.jpg";
import handleDeleteVenue from '../../../API/Venue/deleteVenue'
import { GoTrash } from "react-icons/go";

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
        <p className="ms-6 mt-3 text-lg">
          You currently have no venues available...
        </p>
      ) : (
        <div className="m-6 rounded-xl border">
          {profileData &&
            profileData.venues.map((venue) => (
              <div
                key={venue.id}
                className="flex flex-col items-center hover:bg-zinc-100 sm:flex-row"
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
                  <Link to={`/venue/bookings/${venue.id}`}>
                    <button className="mb-2 mr-2 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:to-orange-500">
                      View bookings
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteVenue(venue.id)}
                    className="mb-2 flex items-center gap-1 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-xs font-semibold uppercase hover:from-red-500 hover:to-red-700 hover:text-white"
                  >
                     <GoTrash size={14} />
                    Delete Venue
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
