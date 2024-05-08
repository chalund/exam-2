import React, { useState, useEffect } from "react";
import { BASE_URL, Venues } from "../../API";
import { useFetch } from "../../Hooks/useFetch";
import { IoCloseOutline } from "react-icons/io5";
import ProductCard from "../../card";
import Spinner from "../../Spinner/Loader";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useFetch(BASE_URL + Venues);

  const handleClearInput = () => {
    setSearchTerm("");
  };

  if (error) {
    return <div>Error fetching data from the API.</div>;
  }

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  // Filter the venues based on the search term
  const filteredVenues = data.data.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log("Data:", data);
  console.log("filtered venues", filteredVenues);

  return (
    <div className="">
      <div className="relative rounded-xl border">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mx-4 py-2 focus:outline-none"
        />
        <IoCloseOutline
          size={30}
          onClick={handleClearInput}
          className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
        />
      </div>
      <div className="flex w-full max-w-[990px] flex-wrap justify-center">
        <ProductCard venues={filteredVenues} />
      </div>
    </div>
  );
}
