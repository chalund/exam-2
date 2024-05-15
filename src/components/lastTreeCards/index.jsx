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

  const sortedData = data.data.sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  );
  const newestVenues = sortedData.slice(0, 3);

  return (
    <div className="mt-4 py-5">
      <h2 className="mb-4 text-xl uppercase">Recently Added Venues</h2>
      <div className="flex gap-2  overflow-x-auto md:justify-center md:overflow-hidden">
        {newestVenues.map((venue) => (
          <div
            key={venue.id}
            className="mx-3 flex-shrink-0 md:w-80 md:flex-shrink "
          >
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastTreeCards;
