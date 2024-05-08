import React, { useState } from "react";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL, Venues } from "../API";
import Spinner from "../Spinner/Loader";
import { IoCloseOutline } from "react-icons/io5";
import Pagination from "../Pagination";
import { BiSearch } from "react-icons/bi";
import ProductCard from "../card";

function ProductList() {
  const { data, loading, error } = useFetch(BASE_URL + Venues);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(24);

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

  const handleClearInput = () => {
    setSearchTerm("");
  };

  // Filtering function to include both name and location
  const filteredProducts = data.data.filter((product) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    // Check the product name, ensuring it's a string
    const nameMatch =
      product.name && typeof product.name === "string"
        ? product.name.toLowerCase().includes(lowerSearchTerm)
        : false;

    // Check the nested location fields, ensuring they're strings
    const locationMatch =
      product.location && typeof product.location === "object"
        ? (product.location.address &&
            typeof product.location.address === "string" &&
            product.location.address.toLowerCase().includes(lowerSearchTerm)) ||
          (product.location.city &&
            typeof product.location.city === "string" &&
            product.location.city.toLowerCase().includes(lowerSearchTerm)) ||
          (product.location.country &&
            typeof product.location.country === "string" &&
            product.location.country.toLowerCase().includes(lowerSearchTerm))
        : false;

    // Combine both name and location matches
    return nameMatch || locationMatch;
  });

  console.log(filteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto my-6 mt-10 flex w-full max-w-[990px] flex-col items-center rounded-xl bg-violet-700 p-8">
        <h1 className="mb-4 text-2xl font-medium capitalize text-white md:text-3xl">
          Find your new destination today
        </h1>
        <div className="relative flex w-full max-w-[600px] items-center rounded-xl bg-white shadow-md">
          <BiSearch
            size={24}
            className="absolute left-3 top-0 ml-2 mt-2 text-gray-800"
          />
          <input
            type="text"
            placeholder="Search by product name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border-0 py-2 pl-12 pr-16"
          />
          <IoCloseOutline
            size={30}
            onClick={handleClearInput}
            className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
          />
        </div>
      </div>
      <div className="flex w-full max-w-[990px] flex-wrap justify-center">
        <ProductCard venues={currentProducts} />
      </div>
      <div className="">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default ProductList;
