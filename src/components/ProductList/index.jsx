import React, { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL, Venues } from "../API";
import Spinner from "../Spinner/Loader";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import ProductCard from "../card";
import FilterDropdown from "../DropdownFilter";

function ProductList() {
  const [pageCounter, setPageCounter] = useState(1);
  const [productsPerPage] = useState(100);
  const [filter, setFilter] = useState(""); // Default state for filter option
  const [fetchUrl, setFetchUrl] = useState(
    `${BASE_URL}${Venues}?sort=created&sortOrder=desc&page=${pageCounter}&limit=${productsPerPage}`,
  );
  const { data, loading, error } = useFetch(fetchUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const checkMeta = data && Object.keys(data)[1] === "meta";
    if (checkMeta) {
      setMeta(data.meta);
    }

    let sortField = "created";
    let sortOrder = "desc";

    switch (filter) {
      case "oldest":
        sortField = "created";
        sortOrder = "asc";
        break;
      case "a-z":
        sortField = "name";
        sortOrder = "asc";
        break;
      case "z-a":
        sortField = "name";
        sortOrder = "desc";
        break;
      case "price-low-high":
        sortField = "price";
        sortOrder = "asc";
        break;
      case "price-high-low":
        sortField = "price";
        sortOrder = "desc";
        break;
      default:
        sortField = "created";
        sortOrder = "desc";
    }

    if (searchTerm) {
      setFetchUrl(
        `${BASE_URL}${Venues}/search?sort=${sortField}&sortOrder=${sortOrder}&limit=${productsPerPage}&q=${searchTerm}&page=${pageCounter}`,
      );
    } else {
      setFetchUrl(
        `${BASE_URL}${Venues}?sort=${sortField}&sortOrder=${sortOrder}&page=${pageCounter}&limit=${productsPerPage}`,
      );
    }
  }, [meta, data, searchTerm, productsPerPage, pageCounter, filter]);

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

  const filteredProducts = data.data.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log(filteredProducts);

  const handleClearInput = () => {
    setSearchTerm("");
  };

  const handleNextPage = () => {
    console.log({ nextPage: meta.nextPage });
    setPageCounter(meta.nextPage);
  };

  const indexOfLastProduct = pageCounter * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const sortedData = data.data.sort((a, b) => new Date(b.created) - new Date(a.created));
  const newestVenues = sortedData.slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mb-6 flex w-full max-w-[990px] flex-col items-center bg-violet-700 p-8 md:my-6 md:mt-10 md:rounded-xl">
        <h1 className="mb-4 text-2xl font-medium capitalize text-white md:text-3xl">
          Find new Venue
        </h1>
        <div className="flex w-full items-center justify-center gap-4">
          <div className="relative flex w-full max-w-[600px] items-center rounded-xl bg-white shadow-md">
            <BiSearch
              size={24}
              className="absolute left-3 top-0 ml-2 mt-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border-0 py-2 pl-12 pr-16 focus:outline-none"
            />
            <IoCloseOutline
              size={30}
              onClick={handleClearInput}
              className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
            />
          </div>
          <div className="relative flex items-center">
          <div>
            <FilterDropdown filter={filter} setFilter={setFilter} />
        </div>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[990px] flex-wrap justify-center">
        <ProductCard venues={currentProducts} />
      </div>

      <div className="my-10 flex justify-center gap-4">
        <button
          onClick={() => setPageCounter(meta.previousPage)}
          className={`w-24 rounded-xl p-2 py-2 ${!meta.previousPage ? "cursor-not-allowed opacity-50 border border-zinc-300" : "bg-violet-700 text-white"}`}
          disabled={!meta.previousPage}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`w-24 rounded-xl p-2 py-2 ${!meta.nextPage ? "cursor-not-allowed opacity-50 border border-zinc-300" : "bg-violet-700 text-white hover:bg-violet-800"}`}
          disabled={!meta.nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
