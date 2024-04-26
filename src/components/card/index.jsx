import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProductCard = ({ venues }) => {
  return (
    <div className="mx-auto max-w-screen-md">
      {venues.map((venue) => (
        <Link to={`/venue/${venue.id}`} key={venue.id} className="block">
          <div className="m-4 mx-auto max-w-[400px] rounded-lg border bg-white p-4 hover:border-4 hover:border-violet-600 sm:flex sm:max-w-[700px]">
            {venue.media && venue.media.length > 0 && (
              <div className="sm:mr-4 sm:w-1/3">
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt}
                  className="h-56 w-full rounded-lg object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-between sm:w-2/3">
              <div>
                <h2 className="font-bold">{venue.name}</h2>
                <div className="flex items-center gap-1 border-b-2 border-violet-600">
                  {(venue.location.city || venue.location.country) && (
                    <p>
                      <FaMapMarkerAlt />
                    </p>
                  )}
                  <p>{venue.location.city}</p>
                  <p>{venue.location.country}</p>
                </div>
                <p className="mt-2">{venue.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">${venue.price}</p>
                <button className="rounded-full bg-orange-300 px-3 py-1 font-semibold uppercase ">
                  View deal
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
