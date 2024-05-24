import React from "react";
import { Link } from "react-router-dom";
import { calculateDaysDifference } from "../CalculateDays";
import formatDate from "../DateFormatter";
import { GoTrash } from "react-icons/go";
import { handleDeleteBooking } from "../API/Delete";

const BookingDetails = ({ booking, calculateTotalPrice, isUpcoming }) => {
  const handleDelete = () => {
    handleDeleteBooking(booking.id);
  };

  return (
    <li
      key={booking.id}
      className="mb-3 flex flex-col rounded-xl border p-3 md:hover:bg-zinc-100 md:flex-row"
    >
      <div className="mt-5 flex items-center justify-center md:mt-0 md:justify-start md:px-6">
        {booking.venue.media && booking.venue.media.length > 0 && (
          <img
            src={booking.venue.media[0].url}
            alt={booking.venue.media[0].alt}
            className=" h-52 w-52 md:h-40 md:w-40 rounded-xl"
          />
        )}
      </div>

      <div className="mx-auto mb-4 p-2 md:mx-0 md:mt-4 md:p-0">
        <p className="py-1 font-semibold text-lg">
          {booking.venue.name}
        </p>

        <div className="flex flex-col md:flex-row md:gap-3 md:mt-1">
          <p>From: {formatDate(booking.dateFrom)}</p>
          <p>To: {formatDate(booking.dateTo)}</p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-3">
          <p>
            Number of Nights:{" "}
            {calculateDaysDifference(booking.dateFrom, booking.dateTo)}
          </p>

          <p>Guests: {booking.guests}</p>
        </div>

        <div className="flex flex-col md:flex-row md:gap-3">
          <p>Price per night: ${booking.venue.price}</p>
          <p>
            Total Price: ${" "}
            {calculateTotalPrice(
              booking.venue.price,
              calculateDaysDifference(booking.dateFrom, booking.dateTo),
            )}
          </p>
        </div>
        {isUpcoming && (
         <div className="flex flex-col md:flex-row md:gap-3 mt-2 items-center md:items-start">
            <div>
              <Link
                to={`/venue/${booking.venue.id}`}
                key={booking.venue.id}
                className="block"
              >
                <button className="mt-3 w-48 md:w-44  rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 md:text-xs font-semibold uppercase hover:to-orange-500 hover:font-bold">
                  view venue
                </button>
              </Link>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="mt-3 flex w-48  md:w-44 items-center gap-1 rounded-full bg-gradient-to-t from-red-400 to-red-700 px-4 py-2 md:text-xs font-semibold uppercase text-white hover:from-red-500 hover:to-red-900 hover:font-bold"
              >
                <GoTrash size={16} />
                Delete Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default BookingDetails;
