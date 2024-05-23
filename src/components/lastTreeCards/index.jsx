import React, { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL} from "../API";
import Spinner from "../Spinner/Loader";
import VenueCard from "../card/venueCard";

function LastThreeCards() {
  const { data, loading, error } = useFetch(`${BASE_URL}/venues?sort=created&sortOrder=desc&limit=3`);
  const [newestVenues, setNewestVenues] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setNewestVenues(data.data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (newestVenues.length === 0) {
    return <div>No recently added venues available.</div>;
  }

  return (
<div className="mt-4 py-5">
  <h2 className="mb-4 text-xl uppercase">Recently Added Venues</h2>
  <div className="flex gap-2 overflow-x-auto ">
    {newestVenues.map((venue) => (
      <div key={venue.id} className="mx-2 flex-shrink-0 w-80 md:flex-shrink-0">
        <div className="h-full flex flex-col">
          <VenueCard venue={venue} className="flex-1 overflow-hidden flex flex-col" />
        </div>
      </div>
    ))}
  </div>
</div>


  );
}

export default LastThreeCards;


