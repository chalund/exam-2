import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaWifi, FaParking } from "react-icons/fa";
import { MdBreakfastDining, MdOutlinePets } from "react-icons/md";
import NoImage from "../../../assets/no_image.jpg";
import StarRatingCards from "../../StarRating/StarRatingCards";

function handleImageError(e) {
  e.target.src = NoImage;
  e.target.onError = null;
}

const VenueCard = ({ venue }) => {
  const { wifi, parking, breakfast, pets } = venue.meta;

  return (
    <Link to={`/venue/${venue.id}`} className="block">
      <div className="flex h-full  w-full max-w-[300px] flex-col justify-between rounded-lg border bg-white p-4 py-4 hover:border-4 hover:border-violet-700">
        {venue.media && venue.media.length > 0 ? (
          <div className="relative block  h-48 w-full">
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
              className="h-full w-full rounded-lg border object-cover"
            />
          </div>
        )}
        <div className="mt-2 flex flex-grow flex-col justify-between">
          <div>
            <h2 className="mt-1 truncate font-bold">{venue.name}</h2>
            <div className="flex items-center gap-1 border-b-2 border-violet-700 pb-2">
              <p>
                <FaMapMarkerAlt />
              </p>

              <p className="md:text-md truncate text-sm">
                {venue.location?.city}
              </p>
              <p className="md:text-md truncate text-sm">
                {venue.location?.country}
              </p>
            </div>
          </div>
       
        
          <p className="mt-3 text-lg">
            <b>${venue.price} </b>
            per night
          </p>
        
       
            <div className="mt-3 flex flex-wrap gap-2">
            {wifi && <FaWifi size={24} title="WiFi Available" className="text-violet-700"/>}
            {parking && <FaParking size={24} title="Parking Available" className="text-violet-700" />}
            {breakfast && <MdBreakfastDining size={24} title="Breakfast Included" className="text-violet-700" />}
            {pets && <MdOutlinePets size={24} title="Pets Allowed"  className="text-violet-700"/>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
