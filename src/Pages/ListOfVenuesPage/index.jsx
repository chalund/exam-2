import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import { FaMapMarkerAlt } from "react-icons/fa";
import Search from "../../components/Search/searchBar/index.jsx";

const ListOfVenuesPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="py-4 text-center text-xl text-violet-600">
        List of Venues
      </h1>
      <Search />
    </div>
  );
};

export default ListOfVenuesPage;
