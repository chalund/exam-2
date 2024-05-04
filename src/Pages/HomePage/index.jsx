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
      <div>
        
      </div>
  

      <img
        src={travelling}
        alt=" travel stuff"
        style={{ width: "100%", height: "300px" }}
        className="mt-6 mb-24 rounded-xl"
      />

      <div
        className="my-10 flex overflow-auto"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <div className="flex justify-evenly rounded-lg bg-violet-600 text-white">
          <p className="m-2 mt-5 w-1/4 p-1 font-semibold">
            Find and book your perfect stay
          </p>
          <div className="m-3 flex w-1/4 flex-col items-center rounded-lg border p-2">
            <p>Search for new places</p>
            <BiSearch size={30} className="mt-2" />
          </div>
          <div className="m-3 flex w-1/4 flex-col items-center rounded-lg border p-2">
            <p>Sign up and save money</p>
            <BsCurrencyDollar size={30} className="mt-2" />
          </div>
          <div className="m-3 flex w-1/4  flex-col items-center rounded-lg border p-2">
            <p>Explore available dates</p>
            <IoCalendarNumberOutline size={30} className="mt-2" />
          </div>
        </div>
      </div> 




     



      
      <div className="grid grid-cols-1 m-8 px-10 md:px-0 md:m-0 md:grid-rows-4 md:grid-cols-4 gap-4  md:h-screen mt-4">
  <div className="col-span-1 md:col-span-3 row-span-1 md:row-span-2 rounded-xl ">
    <div className="card border rounded-xl">
    <img
  src="https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  className="card-img-top rounded-xl object-cover  h-56 md:h-96"
  alt="..."
  style={{ width: "100%" }}
/>      <div className="card-body p-2">
        <h5 className="card-title font-semibold">Card title</h5>
        <h6 className="card-subtitle mb-2 text-muted ">Card subtitle</h6>
      </div>
    </div>
  </div>
  <div className="col-span-1 md:col-span-1 rounded-xl">
    <div className="card border bg-white rounded-xl" >
    <img
  src="https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  className="card-img-top rounded-xl object-cover h-56 md:h-32"
  alt="..."
  style={{ width: "100%" }}
/>      <div className="card-body p-2">
        <h5 className="card-title font-semibold">Card title</h5>
        <h6 className="card-subtitle mb-2 text-muted ">Card subtitle</h6>
      </div>
    </div>
  </div>
  <div className=" col-span-1 md:col-span-1 rounded-xl ">
    <div className="card border rounded-xl md:mt-1" >
    <img
  src="https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  className="card-img-top rounded-xl object-cover h-56 md:h-40"
  alt="..."
  style={{ width: "100%" }}
/>      <div className="card-body p-2">
        <h5 className="card-title font-semibold">Card title</h5>
        <h6 className="card-subtitle mb-2 text-muted ">Card subtitle</h6>
      </div>
    </div>
  </div>
</div>

<div className="bg-violet-600 py-6 rounded-xl">
  <p className="text-white font-semibold text-lg uppercase text-center">Subscribe our newsletter</p>
  <form action="">
    <div className="text-center">
    <input
    type="email"
    placeholder="yourmail@example.com"
    className="border rounded-full py-1 px-10 mt-4 "/>
         <button
     
        className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 ms-4 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
      >
       subscribe
      </button>
    </div>
 
  </form>
</div>




    </div>
  );
};

export default HomePage;
