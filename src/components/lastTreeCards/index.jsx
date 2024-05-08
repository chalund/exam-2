import React from "react";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL, Venues } from "../API";
import Spinner from "../Spinner/Loader";
import ProductCard from "../card";

function LastTreeCards() {
  const { data, loading, error } = useFetch(BASE_URL + Venues);

  // Log the data, loading, and error states to check if they are being set correctly
  console.log("Data homepage:", data);
  // console.log("Loading:", loading);
  // console.log("Error:", error);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (!Array.isArray(data.data) || data.data.length === 0) {
    // Handle the case where data.data is not an array or is empty
    return <div>Error: Data is not in the expected format or is empty</div>;
  }

  // Sort the array of venues based on the created timestamp
  const sortedData = data.data.sort((a, b) => {
    return new Date(b.created) - new Date(a.created);
  });

  console.log("sorted date", sortedData);

  // Get the first three newest venues
  const newestVenues = sortedData.slice(0, 3);

  console.log("newest venues ", newestVenues);
  return (
    <div className="mt-4 flex flex-col justify-center py-6">
      <h2 className="text-xl uppercase">Recently added venues</h2>{" "}
      {/* Adjust the margin-top */}
      <div className="flex justify-center">
        <ProductCard venues={newestVenues} />
      </div>
    </div>
  );
}

export default LastTreeCards;
