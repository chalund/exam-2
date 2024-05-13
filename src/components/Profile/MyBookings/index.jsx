import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoSmiley } from "react-icons/go";
import formatDate from "../../DateFormatter";

const MyBookingsProfilePage = ({ bookings, totalCount }) => {
  const [showExpired, setShowExpired] = useState(false);
  const today = new Date();

  const currentBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) >= today
  );

  const expiredBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) < today
  );

  if (totalCount === 0) {
    return (
      <div className="mt-6 border bg-white py-6 md:rounded-xl">
        <h2 className="ms-6 text-xl font-semibold uppercase text-violet-700 md:text-2xl">
          My bookings
        </h2>
        <p className="ms-6 mt-3 text-lg">No bookings available...</p>
        <div className="mt-1 flex items-center gap-1">
          <p className="ms-6">Find your next holiday</p>
          <Link to="/listings" className="text-violet-700 underline">
            here
          </Link>
          <GoSmiley size={20} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 border bg-white py-6 md:rounded-xl">
      <div className="flex justify-between items-baseline mr-8">
        <h2 className="ms-6 text-xl font-semibold uppercase text-violet-700 md:text-2xl">
          My bookings
        </h2>
        {expiredBookings.length > 0 && (
          <button
            onClick={() => setShowExpired(!showExpired)}
            className="text-violet-700 underline"
          >
            {showExpired ? "Hide expired bookings" : "View expired bookings"}
          </button>
        )}
      </div>

      {showExpired ? (
        <ul className="mt-4">
          {expiredBookings.map((booking) => (
            <li key={booking.id} className="m-2 flex gap-2 border">
              <p>{booking.venue.name}</p>
              <div>
                <p>Date From: {formatDate(booking.dateFrom)}</p>
                <p>Date To: {formatDate(booking.dateTo)}</p>
                <p>Number of Guests: {booking.guests}</p>
                <p>Price per night: {booking.venue.price}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {currentBookings.map((booking) => (
            <li key={booking.id} className="m-2 flex gap-2 border">
              <p>{booking.venue.name}</p>
              <div>
                <p>Date From: {formatDate(booking.dateFrom)}</p>
                <p>Date To: {formatDate(booking.dateTo)}</p>
                <p>Number of Guests: {booking.guests}</p>
                <p>Price per night: {booking.venue.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsProfilePage;
