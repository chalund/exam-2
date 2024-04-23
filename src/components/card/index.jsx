import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProductCard = ({ venue }) => {
  return (
    <Link to={`/venue/${venue.id}`} className="block">
      <div className="bg-white border rounded-lg m-4 p-4 sm:flex sm:max-w-[700px] max-w-[400px] mx-auto hover:border-4 hover:border-violet-600">
        {venue.media && venue.media.length > 0 && (
          <div className="sm:w-1/3 sm:mr-4">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt}
              className="object-cover w-full h-56 rounded-lg"
            />
          </div>
        )}
        <div className="flex flex-col justify-between sm:w-2/3">
          <div>
            <h2 className="font-bold">{venue.name}</h2>
            <div className="flex gap-1 items-center border-b-2 border-violet-600">
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
            <button className="bg-orange-300 px-3 py-1 rounded-full uppercase font-semibold ">
              View deal
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;