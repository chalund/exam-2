import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApiKey } from "../../../API/ApiKey";
import { getProfile } from "../../../API/Profile";
import { useFetch } from "../../../Hooks/useFetch";
import { BASE_URL } from "../../../API";
import formatDate from "../../../DateFormatter";
import { calculateDaysDifference } from "../../../CalculateDays";
import Spinner from "../../../Spinner/Loader";

const VenueBookings = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${BASE_URL}/venues/${id}?_bookings=true`,
  );
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username not found in local storage");
        }

        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;
        const profile = await getProfile(username, apiKey);
        setProfileData(profile.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || !data.data.bookings) {
    return <p>No bookings available for this venue.</p>;
  }

  const sortedBookings = data.data.bookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
  );

  const venueName = data.data.name;

  return (
    <div className="mt-6 max-w-screen-md md:mb-12">
      <h1 className="mb-6 text-center text-2xl uppercase text-violet-700">
        {venueName} Bookings
      </h1>
      {profileData ? (
        <>
          {profileData.bookings.length === 0 ? (
            <p className="ms-6 mt-3 text-lg">Your venue has no bookings</p>
          ) : null}
          <ul>
            {sortedBookings.length === 0 ? (
              <li className="text-center">No bookings yet in this venue.</li>
            ) : (
              sortedBookings.map((booking) => {
                return (
                  <li
                    key={booking.id}
                    className="m-5 mx-10 flex flex-col md:flex-row items-center gap-4 rounded-xl border bg-white p-4"
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
                          booking.dateTo,
                        )}
                      </p>
                      <p>Number of Guests: {booking.guests}</p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default VenueBookings;
