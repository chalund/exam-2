import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createApiKey } from "../API/ApiKey"; // Ensure this import is correct
import { createBooking } from "../API/Bookings/createBookings";
import { getVenueById } from "../API/Venue/getVenueById";
import { Link } from "react-router-dom";

const BookingForm = ({ price, venueId }) => {
  // Check for authentication by looking for a specific token or key in local storage
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [total, setTotal] = useState(0);
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (isLoggedIn) {
          const apiKeyData = await createApiKey("User profile key");
          const apiKey = apiKeyData.data.key;
          const venueData = await getVenueById(venueId, apiKey);
          const { bookings } = venueData.data;

          if (bookings && Array.isArray(bookings)) {
            const bookedDates = bookings
              .map((booking) => {
                const range = [];
                let currentDate = new Date(booking.dateFrom);
                const endDate = new Date(booking.dateTo);

                while (currentDate <= endDate) {
                  range.push(new Date(currentDate));
                  currentDate.setDate(currentDate.getDate() + 1);
                }

                return range;
              })
              .flat();

            setUnavailableDates(bookedDates);
          }
        }
      } catch (error) {
        console.error("Error fetching venue bookings:", error);
      }
    };

    if (venueId) {
      fetchBookings();
    }
  }, [venueId, isLoggedIn]);

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return (end - start) / (1000 * 60 * 60 * 24);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const days = calculateDays();
    const pricePerDay = price || 1;
    const totalPrice = pricePerDay * days;

    const newVenueId = venueId.startsWith("/venue/")
      ? venueId.substring(7)
      : venueId;

    const newData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: Number(guests),
      venueId: newVenueId,
    };

    try {
      if (isLoggedIn) {
        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;

        await createBooking(newData, apiKey);
        console.log("Booking successful", newData);
      } else {
        console.log("User not logged in. Booking not allowed.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }

    setTotal(days === 0 ? pricePerDay : totalPrice);
  };

  // Calculate startDate + 1 day
  const nextDay = new Date(startDate);
  nextDay.setDate(nextDay.getDate() + 1);

  if (!isLoggedIn) {
    return (
      <div className="m-4">
        <h2 className="mb-2 text-lg font-bold text-violet-700 hover:underline">
          <Link to="/login">Log in or Register</Link>
        </h2>
        <p>A registered user account is required to make a booking.</p>
      </div>
    );
  }

  return (
    <div className="m-4">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-3">
            <p>Select check-in</p>
            <div className="flex items-center gap-2 rounded-xl border py-1 pl-3">
              <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                excludeDates={unavailableDates}
                dayClassName={(date) => {
                  const formattedDate = date.toISOString().split("T")[0];
                  return unavailableDates.some(
                    (unavailableDate) =>
                      unavailableDate.toISOString().split("T")[0] ===
                      formattedDate,
                  )
                    ? "bg-red-500 text-white"
                    : undefined;
                }}
                minDate={new Date()}
                className="focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-3">
            <p>Select check-out</p>
            <div className=" flex items-center gap-2 rounded-xl border py-1 pl-3">
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                excludeDates={unavailableDates}
                dayClassName={(date) => {
                  const formattedDate = date.toISOString().split("T")[0];
                  return unavailableDates.some(
                    (unavailableDate) =>
                      unavailableDate.toISOString().split("T")[0] ===
                      formattedDate,
                  )
                    ? "redDate"
                    : undefined;
                }}
                minDate={startDate}
                className="focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min={1}
            className="h-10 w-full rounded-xl border pl-36 pr-12 focus:outline-none"
          />
          <span className="absolute inset-y-0 left-3 flex items-center pr-2 text-gray-500">
            Select guests:
          </span>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="mb-5 w-full rounded-full bg-gradient-to-t from-violet-500 to-violet-700 px-8 py-2 font-semibold uppercase text-white hover:from-violet-600 hover:to-violet-900 hover:font-bold"
          >
            Book now
          </button>
        </div>
      </form>
      <div className="mr-3 flex justify-between border-b pb-2">
        <p>
          ${price} per day x {calculateDays()} days
        </p>
        <p>${total}</p>
      </div>
      <div className="mr-3 mt-4 flex justify-between font-bold">
        <p>Total</p>
        <p>${total}</p>
      </div>
    </div>
  );
};

export default BookingForm;
