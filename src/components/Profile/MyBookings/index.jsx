import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../DateFormatter";
import { calculateDaysDifference } from "../../CalculateDays";

const MyBookingsProfilePage = ({ bookings, totalCount }) => {
  const [showExpired, setShowExpired] = useState(false);
  const today = new Date();

  const currentBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) >= today,
  );

  const expiredBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) < today,
  );

  const calculateTotalPrice = (pricePerNight, numberOfNights) => {
    return pricePerNight * numberOfNights;
  };

  if (totalCount === 0) {
    return (
      <div className="mt-6 border bg-white py-6 md:rounded-xl">
        <h2 className="ms-6 text-xl font-semibold uppercase text-violet-700 md:text-2xl">
          My bookings
        </h2>
        <p className="ms-6 mt-3 text-lg">
          {" "}
          You currently have no bookings available..
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 border bg-white py-6 md:rounded-xl">
      <div className="flex flex-col items-center md:mr-8 md:flex-row md:justify-between">
        <h2 className="text-xl font-semibold uppercase text-violet-700 md:ms-6 md:text-2xl">
          My bookings
        </h2>
        {expiredBookings.length > 0 && (
          <button
            onClick={() => setShowExpired(!showExpired)}
            className="mt-3 text-center text-violet-700 underline md:mt-0"
          >
            {showExpired ? "View upcoming bookings" : "View expired bookings"}
          </button>
        )}
      </div>

      {showExpired ? (
        <ul className="m-6">
          {expiredBookings.map((booking) => (
            <li
              key={booking.id}
              className="mb-3 flex flex-col rounded-xl border hover:bg-zinc-100 md:flex-row "
            >
              <div className="flex items-center justify-center py-4 md:justify-start md:px-6">
                {booking.venue.media && booking.venue.media.length > 0 && (
                  <Link
                    to={`/venue/${booking.venue.id}`}
                    key={booking.venue.id}
                    className="block"
                  >
                    <img
                      src={booking.venue.media[0].url}
                      alt={booking.venue.media[0].alt}
                      className="h-36 w-48 rounded-xl md:h-24 md:w-24"
                    />
                  </Link>
                )}
              </div>

              <div className="mx-auto my-2 md:mx-0">
                <p className="font-semibold">{booking.venue.name}</p>

                <div className="gap-3 md:flex">
                  <p>From: {formatDate(booking.dateFrom)}</p>
                  <p>To: {formatDate(booking.dateTo)}</p>
                </div>
                <p>
                  Number of Days:{" "}
                  {calculateDaysDifference(booking.dateFrom, booking.dateTo)}
                </p>

                <p>Guests: {booking.guests}</p>
                <div className="gap-3 md:flex">
                  <p>Price per night: ${booking.venue.price}</p>
                  <p>
                    Total Price: ${" "}
                    {calculateTotalPrice(
                      booking.venue.price,
                      calculateDaysDifference(booking.dateFrom, booking.dateTo),
                    )}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className=" m-6 ">
          {currentBookings.map((booking) => (
            <li
              key={booking.id}
              className="mb-3 flex flex-col rounded-xl border hover:bg-zinc-100 md:flex-row"
            >
              <div className="flex items-center justify-center py-4 md:justify-start md:px-6">
                {booking.venue.media && booking.venue.media.length > 0 && (
                  <Link
                    to={`/venue/${booking.venue.id}`}
                    key={booking.venue.id}
                    className="block"
                  >
                    <img
                      src={booking.venue.media[0].url}
                      alt={booking.venue.media[0].alt}
                      className="h-36 w-48 rounded-xl md:h-24 md:w-24"
                    />
                  </Link>
                )}
              </div>

              <div className="mx-auto my-2 md:mx-0">
                <p className="font-semibold">{booking.venue.name}</p>

                <div className="gap-3 md:flex">
                  <p>From: {formatDate(booking.dateFrom)}</p>
                  <p>To: {formatDate(booking.dateTo)}</p>
                </div>
                <p>
                  Number of Days:{" "}
                  {calculateDaysDifference(booking.dateFrom, booking.dateTo)}
                </p>

                <p>Guests: {booking.guests}</p>
                <div className="gap-3 md:flex">
                  <p>Price per night: ${booking.venue.price}</p>
                  <p>
                    Total Price: ${" "}
                    {calculateTotalPrice(
                      booking.venue.price,
                      calculateDaysDifference(booking.dateFrom, booking.dateTo),
                    )}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsProfilePage;
