// VenueCard.js
import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import NoImage from "../../../assets/no_image.jpg";
import StarRatingCards from "../../StarRating/StarRatingCards";

// Helper function to handle image error
function handleImageError(e) {
  e.target.src = NoImage; // Set placeholder image
  e.target.onError = null; // Remove error handler to prevent loops
}

const VenueCard = ({ venue }) => {
  return (
    <Link to={`/venue/${venue.id}`} className="block">
      <div className="flex py-4  flex-col h-full w-full max-w-[300px] justify-between rounded-lg border bg-white p-4 hover:border-4 hover:border-violet-700">
        {venue.media && venue.media.length > 0 ? (
          <div className="relative block h-32 sm:h-48 w-full ">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || "Venue image"}
              className="h-full w-full rounded-lg object-cover"
              onError={handleImageError}
            />
            {venue.rating > 0 && (
              <div className="absolute left-2 top-2">
                <StarRatingCards rating={venue.rating} size={20} />
              </div>
            )}
          </div>
        ) : (
          <div className="block h-48 w-full">
            <img
              src={NoImage}
              alt="No Image"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        )}
        <div className="flex flex-col flex-grow justify-between mt-2">
          <div>
            <h2 className="mt-1 font-bold truncate">{venue.name}</h2>
            <div className="flex items-center gap-1 border-b-2 border-violet-700 pb-2">
              
                <p>
                  <FaMapMarkerAlt />
                </p>
              
              <p className="md:text-md text-sm truncate">{venue.location?.city}</p>
              <p className="md:text-md text-sm truncate">{venue.location?.country}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p>
              Price <b>${venue.price}</b>
            </p>
            <button className="rounded-full bg-gradient-to-t from-violet-500 to-violet-700 px-5 py-1 text-sm uppercase text-white hover:to-violet-900 hover:font-semibold">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
