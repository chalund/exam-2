import React from 'react';
import { Link } from "react-router-dom";
import CreateNewVenueButton from "../CreateNewVenue";
import useFetchProfile from "../../../Hooks/useFetchProfile";
import Spinner from "../../../Spinner/Loader";
import NoImage from "../../../../assets/no_image.jpg";
import handleDeleteVenue from '../../../API/Venue/deleteVenue'
import { GoTrash } from "react-icons/go";
import formatDate from '../../../DateFormatter';

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
    <div className="mt-6 border bg-white py-6 md:rounded-xl">
      <div className="flex flex-col items-center md:mr-8 md:flex-row md:justify-between">
      <h2 className="text-xl font-semibold uppercase text-orange-500 md:ms-6 md:text-2xl">
          My venues
        </h2>
        <div className="mt-3 md:mt-0 mr-2 flex flex-col md:mr-7">
          <CreateNewVenueButton />
        </div>
      </div>

      {profileData && profileData.venues.length === 0 ? (
        <p className="ms-6 mt-3 text-lg">
          You currently have no venues available...
        </p>
      ) : (
        <div className="p-3 rounded-xl ">
          {profileData &&
            profileData.venues.map((venue) => (
              <div
                key={venue.id}
                className="flex flex-col items-center hover:bg-zinc-100 p-3 mb-3 md:flex-row border rounded-lg mt-4 md:mx-6"
              >
                <div className="md:px-6 py-4">
                  {venue.media && venue.media.length > 0 ? (
                    <Link
                      to={`/venue/${venue.id}`}
                      key={venue.id}
                      className="block"
                    >
                      <img
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                        className=" h-52 w-52 md:h-40 md:w-40 rounded-xl"
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
                        className=" h-52 w-52 md:h-40 md:w-40 rounded-xl"
                      />
                    </Link>
                  )}
                </div>
                <div className='ms-3'>
                <div className="font-semibold text-lg">{venue.name}</div>
                <div className='mt-3 md:mt-0 md:flex md:gap-3 text-center md:text-start'>
                  <p>Venue created {formatDate(venue.created)}
                  </p>
                  {venue.creates !== venue.updated && (
                    <p>(Updated {formatDate(venue.updated)})</p>
                  )}
                  </div>
                <div className="flex flex-col md:flex-row py-6">
                  <Link to={`/venue/bookings/${venue.id}`}>
                    <button className="mb-3 md:mb-0 md:mr-2 w-48 md:w-44  rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 md:text-xs font-semibold uppercase hover:to-orange-500">
                      View bookings
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteVenue(venue.id)}
                    className=" flex w-48 md:w-44 items-center gap-1 rounded-full bg-gradient-to-t from-red-400 to-red-700 px-4 py-2 md:text-xs font-semibold uppercase text-white hover:from-red-500 hover:to-red-900 hover:font-bold"
                    >
                     <GoTrash size={16} />
                    Delete Venue
                  </button>
                </div>
                </div>

            
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyVenues;
