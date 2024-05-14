// LastTreeCards.js
import React from "react";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL, Venues } from "../API";
import Spinner from "../Spinner/Loader";
import VenueCard from "../card/venueCard";

function LastTreeCards() {
  const { data, loading, error } = useFetch(BASE_URL + Venues);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (!Array.isArray(data.data) || data.data.length === 0) {
    return <div>Error: No data or an unexpected data format</div>;
  }

  const sortedData = data.data.sort((a, b) => new Date(b.created) - new Date(a.created));
  const newestVenues = sortedData.slice(0, 3);

  return (
    <div className="mt-4 py-5">
      <h2 className="text-xl uppercase mb-4">Recently Added Venues</h2>
      <div className="flex md:justify-center  overflow-x-auto md:overflow-hidden gap-2">
        {newestVenues.map((venue) => (
          <div key={venue.id} className="flex-shrink-0 md:flex-shrink md:w-80 mx-3 ">
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastTreeCards;
