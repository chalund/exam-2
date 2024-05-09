import React from "react";
import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import Nyksund from "../../assets/nyksund.jpg";
import Lofoten from "../../assets/lofoten.jpg";
import GirlSun from "../../assets/girlInSun.jpg";
import Travel from "../../assets/travel.jpg";

import { BiSearch } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import Spinner from "../../components/Spinner/Loader";
import ProductCard from "../../components/card";
import LastTreeCards from "../../components/lastTreeCards";
import { Link } from "react-router-dom";

const HomePage = () => {
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

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="relative">
        <img
          src={Nyksund}
          alt="Nyksund, a small fisher village at the sea"
          style={{
            width: "100%",
            height: "300px",
            filter: "brightness(60%)", // Adjust the percentage as needed
          }}
          className="md:mt-6 md:rounded-xl"
        />

        <div className="absolute  bottom-0 left-10 top-2 flex  w-44 flex-col items-center justify-center uppercase">
          <h2 className="text-2xl font-bold text-white">
            Discover new amazing places to visit
          </h2>

          <button className="mt-8 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
            <Link to="/listings">Discover</Link>
          </button>
        </div>
      </div>

      <div className="m-4 overflow-auto  ">

      <LastTreeCards />
      </div>

      <div className="my-12 ml-3 lg:ml-0 flex overflow-auto">
        <div className="flex justify-evenly rounded-lg bg-violet-700 p-5 text-white">
          <p className="m-2 mt-5 w-80 md:w-1/4 p-1 text-xl font-semibold">
            Find and book your perfect stay
          </p>
          <div className="m-3 mx-6 w-1/2 flex md:w-1/4 flex-col items-center rounded-3xl border p-2 px-4">
            <p>Search for new exiting places</p>
            <BiSearch size={36} className="mt-2" />
          </div>
          <div className="m-3 mx-6 flex  w-1/2 md:w-1/4 flex-col items-center rounded-3xl border p-2 px-4">
            <p>Sign up and save money</p>
            <BsCurrencyDollar size={36} className="mt-2" />
          </div>
          <div className="m-3 mx-6 flex w-1/2 md:w-1/4 flex-col items-center rounded-3xl border p-2 px-4">
            <p>Explore available dates on venues</p>
            <IoCalendarNumberOutline size={36} className="mt-2" />
          </div>
        </div>
      </div>

      <div className="m-6 grid grid-cols-1 gap-4  md:grid-cols-4 lg:m-0">
  <div className="col-span-1 row-span-1 rounded-xl md:col-span-3 md:row-span-2">
    <div className="card rounded-xl border">
      <img
        src={Lofoten}
        alt="image from Reine in Lofoten"
        className="card-img-top h-56 md:h-96 rounded-xl object-cover w-full"
      />
      <div className="card-body p-2">
        <h5 className="card-title font-semibold">
          Explore Exciting New Destinations
        </h5>
        <h6 className="card-subtitle text-muted mb-2">
          Check out our latest places
        </h6>
      </div>
    </div>
  </div>
  <div className="col-span-1 rounded-xl md:col-span-1">
    <div className="card rounded-xl border bg-white">
      <img
        src={Travel}
        alt="Travelling things, passport, sunglasses and camera"
        className="card-img-top h-56 md:h-32 rounded-xl object-cover w-full"
      />
      <div className="card-body p-2">
        <h5 className="card-title font-semibold">
          Book your next vacay now
        </h5>
        <h6 className="card-subtitle text-muted mb-2">
          Find your holiday
        </h6>
      </div>
    </div>
  </div>
  <div className="col-span-1 rounded-xl md:col-span-1">
    <div className="card rounded-xl border md:mt-2 lg:mt-7">
      <img
        src={GirlSun}
        alt="girl standing in front of a sunset"
        className="card-img-top h-56 md:h-40 rounded-xl object-cover w-full"
      />
      <div className="card-body p-2">
        <h5 className="card-title mb-2 font-semibold">Travel Tips</h5>
      </div>
    </div>
  </div>
</div>




      <div className="md:my-12 md:rounded-xl bg-violet-700 py-8">
        <p className="text-center text-lg md:text-xl  font-semibold uppercase text-white">
          Subscribe our newsletter
        </p>
        <form action="">
          <div className="text-sm md:text-md text-center justify-center mt-3 ">
            <input
              type="email"
              placeholder="yourmail@example.com"
              className="md:mt-4 rounded-full border font-sm md:font-md md:px-14 py-2 p-4 md:pl-6 "
            />
            <button className=" text-sm md:text-md md:mb-5 md:ms-4 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
              subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
