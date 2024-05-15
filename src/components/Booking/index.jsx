import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL, Venues } from "../API";
import formatDate from "../DateFormatter";
import { calculateDaysDifference } from "../CalculateDays";

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

  // Sort bookings by date
  const sortedBookings = data.data.bookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
  );

  const venueName = data.data.name;
  const pricePerNight = data.data.price;

  return (
    <div className="mt-6 md:mb-12 max-w-screen-md">
      <h1 className="text-center text-2xl mb-6 uppercase text-violet-700">
        {venueName} Bookings
      </h1>
      <ul>
        {sortedBookings.length === 0 ? (
          <li className="text-center">No bookings yet in this venue.</li>
        ) : (
          sortedBookings.map((booking) => {
            return (
              <li
                key={booking.id}
                className="m-2 flex border rounded-xl bg-white p-4 gap-3 items-center"
              >
                <img
                  src={booking.customer.avatar.url}
                  alt={booking.customer.avatar.alt}
                  className="h-36 w-48 rounded-full md:h-24 md:w-24"
                />

                <div>
                  <p>Name of Guest: {booking.customer.name}</p>
                  <p>Date From: {formatDate(booking.dateFrom)}</p>
                  <p>Date To: {formatDate(booking.dateTo)}</p>
                  <p>
                    Number of Days:{" "}
                    {calculateDaysDifference(
                      booking.dateFrom,
                      booking.dateTo
                    )}
                  </p>
                  <p>Number of Guests: {booking.guests}</p>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default VenueBookings;
