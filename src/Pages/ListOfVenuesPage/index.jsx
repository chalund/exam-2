import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import { FaMapMarkerAlt } from "react-icons/fa";
import Search from "../../components/Search/searchBar/index.jsx";
import ProductList from "../../components/ProductList";

const ListOfVenuesPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg">
 
      <ProductList />
      {/* <Search /> */}
    </div>
  );
};

export default ListOfVenuesPage;
