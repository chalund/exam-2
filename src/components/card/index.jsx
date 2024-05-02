import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProductCard = ({ venues }) => {
  return (
    <div className="mx-auto max-w-screen-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2">
      {venues.map((venue) => (
        <Link to={`/venue/${venue.id}`} key={venue.id} className="block ">
          <div className="m-4 mx-auto min-w-min max-w-[300px] rounded-lg border bg-white p-4 hover:border-4 hover:border-violet-600 flex flex-col justify-between h-full">
            {venue.media && venue.media.length > 0 && (
              <div className="w-full h-32 sm:h-48 block">
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="font-bold mt-1">{venue.name}</h2>
              <div className="flex items-center gap-1 border-b-2 border-violet-600 pb-2">
                {venue.location.city && (
                  <p>
                    <FaMapMarkerAlt />
                  </p>
                )}
                <p className="text-sm md:text-md">{venue.location?.city}</p>
                <p className="text-sm md:text-md">{venue.location?.country}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p>Price <b>${venue.price}</b></p>
              <button className="text-sm rounded-full bg-violet-600 text-white px-3 py-1 font-semibold uppercase">
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
