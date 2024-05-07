import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL, Venues } from "../API";
import formatDate from "../DateFormatter";

const VenueBookings = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${BASE_URL}${Venues}/${id}?_bookings=true`
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || !data.data.bookings) {
    return <p>No bookings available for this venue.</p>;
  }

  if (data.data.bookings.length === 0) {
    return (
      <div className="bg-blue-100">
        <h1>Bookings in venue: {data.data.name}</h1>
        <p>No bookings yet in this venue.</p>
      </div>
    );
  }

  console.group(data)

  return (
    <div className="bg-blue-100">
        <h1>Bookings in venue: {data.data.name}</h1>
      <ul>
        {data.data.bookings.map((booking) => (
       
          <li key={booking.id} className="border border-black m-2">
  
            <p>Date From: {formatDate(booking.dateFrom)}</p>
            <p>Date To: {booking.dateTo}</p>
            <p>guest: {booking.customer.name}</p>
            {/* Render other booking details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueBookings;
