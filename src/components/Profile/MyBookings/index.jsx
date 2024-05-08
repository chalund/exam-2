import React from 'react';
import { Link } from 'react-router-dom';
import { GoSmiley } from 'react-icons/go';
import formatDate from '../../DateFormatter';

const MyBookingsProfilePage = ({ bookings, totalCount }) => {
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
          <GoSmiley size={0} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 border bg-white py-6 md:rounded-xl">
      <div className="flex items-baseline gap-4">
        <h2 className="ms-6 text-xl font-semibold uppercase text-violet-700 md:text-2xl">
          My bookings
        </h2>
        <p>({totalCount} bookings available)</p>
      </div>
      <ul>
        {bookings.map((booking) => (
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
    </div>
  );
};

export default MyBookingsProfilePage;

