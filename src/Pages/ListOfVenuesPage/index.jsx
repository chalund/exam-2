import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL, Venues } from '../../components/API';
import { useFetch } from '../../components/Hooks/useFetch';
import { FaMapMarkerAlt } from "react-icons/fa";
import Search from '../../components/Search/index.jsx';



const ListOfVenuesPage = () => {

  return (
    <div className='max-w-screen-md mx-auto'>
      <h1 className='text-center mt-3 text-xl text-violet-600'>List of Venues</h1>
      <Search />
    </div>
  );
};

export default ListOfVenuesPage;
