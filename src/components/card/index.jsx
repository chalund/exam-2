import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";



const ProductCard = ({ venues }) => {
  return (
    <div className="m-2 mx-auto grid max-w-screen-lg grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {venues.map((venue) => (
        <Link to={`/venue/${venue.id}`} key={venue.id} className="block ">
          <div className="m-4 mx-auto flex h-full min-w-min max-w-[300px] flex-col justify-between rounded-lg border bg-white p-4 hover:border-4 hover:border-violet-700">
            {venue.media && venue.media.length > 0 && (
              <div className="block h-32 w-full sm:h-48">
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="mt-1 font-bold">{venue.name}</h2>
              <div className="flex items-center gap-1 border-b-2 border-violet-700 pb-2">
                {venue.location.city && (
                  <p>
                    <FaMapMarkerAlt />
                  </p>
                )}
                <p className="md:text-md text-sm">{venue.location?.city}</p>
                <p className="md:text-md text-sm">{venue.location?.country}</p>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <p>
                Price <b>${venue.price}</b>
              </p>
              <button className="rounded-full bg-violet-700 px-3 py-1 text-sm font-semibold uppercase text-white">
                View deal
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
