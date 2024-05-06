import React from "react";
import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import Nyksund from "../../assets/nyksund.jpg"
import Lofoten from "../../assets/lofoten.jpg"
import GirlSun from "../../assets/girlInSun.jpg"
import Travel from "../../assets/travel.jpg"

import { BiSearch } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import Spinner from "../../components/Spinner/Loader";
import ProductCard from "../../components/card";
import LastTreeCards from "../../components/lastTreeCards";



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

  // if (!Array.isArray(data.data) || data.data.length === 0) {
  //   // Handle the case where data.data is not an array or is empty
  //   return <div>Error: Data is not in the expected format or is empty</div>;
  // }
  
  
  
  // // Sort the array of venues based on the created timestamp
  // const sortedData = data.data.sort((a, b) => {
  //   return new Date(b.created) - new Date(a.created);
  // });

  // console.log("sorted date" ,sortedData)
  
  // // Get the first three newest venues
  // const newestVenues = sortedData.slice(0, 3);

  // console.log("newest venues " ,newestVenues)
  






  return (
    <div className="mx-auto max-w-screen-md">
 <div className="relative">
 <img
  src={Nyksund}
  alt="Nyksund, a small fisher village at the sea"
  style={{
    width: "100%",
    height: "300px",
    filter: "brightness(60%)" // Adjust the percentage as needed
  }}
  className="md:mt-6 md:rounded-xl"
/>

  <div className="absolute  top-2 left-10 bottom-0 w-44  flex flex-col justify-center items-center uppercase">
    <h2 className="text-white text-2xl font-bold">Discover new amazing places to visit</h2>
  
    <button
        className="mt-8 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
      >
       Discover
      </button>
  </div>
</div>

<LastTreeCards />








      <div className="my-12 flex overflow-auto">
        <div className="flex justify-evenly rounded-lg bg-gradient-to-t from-violet-500 to-violet-700 text-white p-3">
          <p className="m-2 mt-5 w-1/4 p-1 text-lg font-semibold">
            Find and book your perfect stay
          </p>
          <div className="m-3 flex w-1/4 flex-col items-center rounded-3xl border p-2 px-4 mx-6">
            <p>Search for new places</p>
            <BiSearch size={36} className="mt-2" />
          </div>
          <div className="m-3 flex w-1/4 flex-col items-center rounded-3xl border p-2 px-4 mx-6">
            <p>Sign up and save money</p>
            <BsCurrencyDollar size={30} className="mt-2" />
          </div>
          <div className="m-3 flex w-1/4  flex-col items-center rounded-3xl border p-2 px-4 mx-6">
            <p>Explore available dates</p>
            <IoCalendarNumberOutline size={30} className="mt-2" />
          </div>
        </div>
      </div>

      <div className="m-8 grid grid-cols-1 gap-4 px-10 md:m-0  md:grid-cols-4   md:px-0">
        <div className="col-span-1 row-span-1 rounded-xl md:col-span-3 md:row-span-2 ">
          <div className="card rounded-xl border">
            <img
              src={Lofoten}
              alt="image from Reine in Lofoten "
              className="card-img-top h-56 rounded-xl  object-cover md:h-96"
           
              style={{ width: "100%" }}
            />{" "}
            <div className="card-body p-2">
              <h5 className="card-title font-semibold">Explore Exciting New Destinations</h5>
              <h6 className="card-subtitle text-muted mb-2 ">Check out our latest places</h6>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-xl md:col-span-1">
          <div className="card rounded-xl border bg-white">
            <img
              src={Travel}
              alt="Travelling things, passport, sunglasses and camera"
              className="card-img-top h-56 rounded-xl object-cover md:h-32"
           
              style={{ width: "100%" }}
            />{" "}
            <div className="card-body p-2">
              <h5 className="card-title font-semibold">Book your next vacay now</h5>
              <h6 className="card-subtitle text-muted mb-2 ">Find your holiday</h6>
            </div>
          </div>
        </div>
        <div className=" col-span-1 rounded-xl md:col-span-1 ">
          <div className="card rounded-xl border md:mt-1">
            <img
              src={GirlSun}
              alt="girl standing infront of a sunset"
              className="card-img-top h-56 rounded-xl object-cover md:h-40"
            
              style={{ width: "100%" }}
            />{" "}
            <div className="card-body p-2">
              <h5 className="card-title font-semibold mb-2">Travel Tips</h5>
           
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 rounded-xl bg-violet-700 py-6">
        <p className="text-center text-lg font-semibold uppercase text-white">
          Subscribe our newsletter
        </p>
        <form action="">
          <div className="text-center">
            <input
              type="email"
              placeholder="yourmail@example.com"
              className="mt-4 rounded-full border px-10 py-1 pl-6 "
            />
            <button className="mb-5 ms-4 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
              subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
