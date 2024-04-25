import React from 'react';
import { BASE_URL, Venues } from '../../components/API';
import { useFetch } from '../../components/Hooks/useFetch';
import travelling  from '../../assets/travelling.jpg';
 
import { BiSearch } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import Spinner from '../../components/Spinner/Loader';





const HomePage = () => {
  const { data, loading, error } = useFetch(BASE_URL + Venues);

  // Log the data, loading, and error states to check if they are being set correctly
  console.log("Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) {
    return <div className='text-center text-2xl'><Spinner /></div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  

  return (
    <div className='max-w-screen-md mx-auto'>
      <h1>Home</h1>

  
      <img src={ travelling} alt=" travel stuff" style={{ width: '100%', height: '300px' }}/> 


      <div className='overflow-auto flex mt-10 ms-4' style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div className='flex justify-evenly bg-violet-600 text-white rounded-lg'>
        <p className='font-semibold w-24 m-2 p-1 mt-5'>Find and book your perfect stay</p>
        <div className='border rounded-lg w-24 m-3 p-2 flex flex-col items-center'>
          <p>Search for new places</p>
          <BiSearch size={30} className='mt-2'/>
        </div>
        <div className='border rounded-lg w-24 m-3 p-2 flex flex-col items-center'>
          <p>Sign up and save money</p>
          <BsCurrencyDollar size={30} className='mt-2'/>
        </div>
        <div className='border rounded-lg w-24 m-3 p-2 flex flex-col items-center'>
          <p>Explore available dates</p>
          <IoCalendarNumberOutline size={30} className='mt-2'/>
        </div>
      </div>
    </div>

    <div>
      
    </div> 

    </div>
  );
};

export default HomePage;

