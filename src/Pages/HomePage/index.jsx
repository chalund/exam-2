import React from "react";
import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import travelling from "../../assets/travelling.jpg";

import { BiSearch } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import Spinner from "../../components/Spinner/Loader";

const HomePage = () => {
  const { data, loading, error } = useFetch(BASE_URL + Venues);

  // Log the data, loading, and error states to check if they are being set correctly
  console.log("Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);

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

  return (
    <div className="mx-auto max-w-screen-md">
      <h1>Home</h1>

      <img
        src={travelling}
        alt=" travel stuff"
        style={{ width: "100%", height: "300px" }}
      />

      <div
        className="ms-4 mt-10 flex overflow-auto"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <div className="flex justify-evenly rounded-lg bg-violet-600 text-white">
          <p className="m-2 mt-5 w-24 p-1 font-semibold">
            Find and book your perfect stay
          </p>
          <div className="m-3 flex w-24 flex-col items-center rounded-lg border p-2">
            <p>Search for new places</p>
            <BiSearch size={30} className="mt-2" />
          </div>
          <div className="m-3 flex w-24 flex-col items-center rounded-lg border p-2">
            <p>Sign up and save money</p>
            <BsCurrencyDollar size={30} className="mt-2" />
          </div>
          <div className="m-3 flex w-24 flex-col items-center rounded-lg border p-2">
            <p>Explore available dates</p>
            <IoCalendarNumberOutline size={30} className="mt-2" />
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default HomePage;
