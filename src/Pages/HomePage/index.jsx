import React from 'react';
import { BASE_URL, Venues } from '../../components/API';
import { useFetch } from '../../components/Hooks/useFetch';

const HomePage = () => {
  const { data, loading, error } = useFetch(BASE_URL + Venues);

  // Log the data, loading, and error states to check if they are being set correctly
  console.log("Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      {/* Render fetched data here */}
    </div>
  );
};

export default HomePage;

