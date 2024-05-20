import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createApiKey } from "../../API/ApiKey";
import { createBooking } from "../../API/Bookings/createBookings";
import { getVenueById } from "../../API/Venue/getVenueById";
import { useNavigate } from "react-router-dom";

const BookingFormLink = ({ price, venueId }) => {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
  );
  const [guests, setGuests] = useState(2);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [maxGuests, setMaxGuests] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (isLoggedIn) {
          const apiKeyData = await createApiKey("User profile key");
          const apiKey = apiKeyData.data.key;
          const venueData = await getVenueById(venueId, apiKey);
          const { bookings, maxGuests } = venueData.data;

          setMaxGuests(maxGuests);

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

  useEffect(() => {}, [startDate, endDate, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        navigate("/profile");
        setIsModalOpen(false); // Close the modal after successful booking
      } else {
        console.log("User not logged in. Booking not allowed.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleGuestsChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= maxGuests) {
      setGuests(value);
    } else if (value < 1) {
      setGuests(1);
    } else {
      setGuests(maxGuests);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={openModal}
        className="uppercase text-violet-700 underline text-xl font-semibold"
      >
        Book your stay
      </button>
      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            className="modal-content"
            style={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <span
              className="close mt-5 flex cursor-pointer justify-end text-3xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <form onSubmit={handleSubmit} className="">
              <h2 className="mb-4 py-3 text-center text-lg font-bold uppercase text-violet-700">
                Book Your Stay
              </h2>
              <div className="m-3">
                <p>Select check-in</p>
                <div className="flex items-center gap-2 rounded-xl border py-1 pl-3">
                  <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (date >= endDate) {
                        const newEndDate = new Date(date);
                        newEndDate.setDate(newEndDate.getDate() + 1);
                        setEndDate(newEndDate);
                      }
                    }}
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
              <div className="m-3">
                <p>Select check-out</p>
                <div className="flex items-center gap-2 rounded-xl border py-1 pl-3">
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
              <div className="relative m-3">
                <p>Select number of Guests</p>
                <input
                  type="number"
                  placeholder="Guests"
                  value={guests}
                  onChange={handleGuestsChange}
                  min={1}
                  max={maxGuests}
                  className="flex h-10 w-full items-center rounded-xl border pl-40 pr-20 focus:outline-none"
                />
                <span className="absolute inset-y-0 left-3 top-6 flex items-center pr-2 text-gray-500">
                  (Max Guests {maxGuests}):
                </span>
              </div>
              <div className="flex justify-center">
                <button
                  className="my-5 w-44 rounded-xl bg-violet-700 py-2 text-lg uppercase text-white"
                  type="submit"
                >
                  Book now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFormLink;
