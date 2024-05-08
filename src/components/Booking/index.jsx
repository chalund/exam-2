import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL, Venues } from "../API";
import formatDate from "../DateFormatter";

// Adjusted helper function to return both total cost and number of days
const calculateCostDetails = (dateFrom, dateTo, pricePerNight) => {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  // Calculate the difference in time
  const differenceInTime = endDate - startDate;

  // Convert the difference from milliseconds to days
  let numberOfDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  // Ensure a minimum charge of one day
  numberOfDays = Math.max(numberOfDays, 1);

  // Calculate the total cost
  const totalCost = numberOfDays * pricePerNight;

  return { numberOfDays, totalCost };
};

const VenueBookings = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${BASE_URL}${Venues}/${id}?_bookings=true`,
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

  console.log(data);

  const venueName = data.data.name;
  const pricePerNight = data.data.price;

  return (
    <div className="mt-6">
      <h1 className="text-center text-xl uppercase text-violet-600">
        {venueName} Bookings
      </h1>
      <ul>
        {data.data.bookings.length === 0 ? (
          <li className="text-center">No bookings yet in this venue.</li>
        ) : (
          data.data.bookings.map((booking) => {
            const { numberOfDays, totalCost } = calculateCostDetails(
              booking.dateFrom,
              booking.dateTo,
              pricePerNight,
            );

            return (
              <li key={booking.id} className="m-2 border border-black p-2">
                <p>Guest: {booking.customer.name}</p>
                <p>Date From: {formatDate(booking.dateFrom)}</p>
                <p>Date To: {formatDate(booking.dateTo)}</p>
                <p>Number of Nights: {numberOfDays}</p>
                <p>Number of Guests: {booking.guests}</p>
                <p>Price per Night: ${pricePerNight}</p>
                <p>Total Cost: ${totalCost}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default VenueBookings;
