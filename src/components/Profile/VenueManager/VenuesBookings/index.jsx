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
    `${BASE_URL}/venues/${id}?_bookings=true`
  );
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [showAllBookings, setShowAllBookings] = useState(false); 

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
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || !data.data.bookings) {
    return <p>No bookings available for this venue.</p>;
  }

  const today = new Date();

  const currentBookings = data.data.bookings.filter(
    (booking) => new Date(booking.dateTo) >= today
  );

  const expiredBookings = data.data.bookings.filter(
    (booking) => new Date(booking.dateTo) < today
  );

  const sortedCurrentBookings = currentBookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
  );

  const sortedExpiredBookings = expiredBookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
  );

  const venueName = data.data.name;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowAllBookings(false);
  };

  const handleToggleBookings = () => {
    setShowAllBookings(!showAllBookings); 
  };

  const renderBookings = (bookings) => {
    return (
      <ul className="mt-4 md:m-6">
        {bookings.map((booking) => (
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
                {calculateDaysDifference(booking.dateFrom, booking.dateTo)}
              </p>
              <p>Number of Guests: {booking.guests}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-12 mb-6  bg-white  md:rounded-xl">
      <h1 className="text-center text-2xl uppercase text-violet-700 mb-6">
        {venueName} Bookings
      </h1>
      <div className="tab-section backdrop-filter  backdrop-blur-lg bg-opacity-40 mt-6">
        <div className="flex flex-wrap">
          <button
            className={`text-xs md:text-lg md:p-4 border-gray-300 hover:bg-gray-300 hover:bg-opacity-40 uppercase flex-grow ${
              activeTab === 'current' ? 'font-bold border-l border-r border-t text-violet-700' : ''
            }`}
            onClick={() => handleTabClick('current')}
          >
            Current Bookings
          </button>
          <button
            className={`text-xs md:text-lg p-4 hover:bg-zinc-200 hover:bg-opacity-40 uppercase flex-grow ${
              activeTab === 'expired' ? 'font-bold border-l border-r border-t  text-violet-700' : ''
            }`}
            onClick={() => handleTabClick('expired')}
          >
            Expired Bookings
          </button>
        </div>
        <div>
          {activeTab === 'current' && (
            <div id="current" className="tab-content bg-white text-gray-700 p-3 md:p-6 border rounded-b-xl">
              <div className="md:ms-6 md:text-lg">
                You have {sortedCurrentBookings.length} current bookings
              </div>
              {showAllBookings ? renderBookings(sortedCurrentBookings) : renderBookings(sortedCurrentBookings.slice(0, 3))}
              {sortedCurrentBookings.length > 2 && (
                <div className="text-center mt-4">
                  <button className=" rounded-full bg-gradient-to-t from-violet-500 to-violet-700 px-4 py-2 mt-4 uppercase text-white hover:to-violet-900 hover:font-semibold" onClick={handleToggleBookings}>
                    {showAllBookings ? "Show Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          )}
          {activeTab === 'expired' && (
            <div id="expired" className="tab-content bg-white text-gray-700 p-3 md:p-6 border rounded-b-xl">
              <div className="ms-6 text-red-700 md:text-lg">
                You have {sortedExpiredBookings.length} expired bookings
              </div>
              {showAllBookings ? renderBookings(sortedExpiredBookings) : renderBookings(sortedExpiredBookings.slice(0, 3))}
              {sortedExpiredBookings.length > 2 && (
                <div className="text-center mt-4">
                  <button className=" rounded-full bg-gradient-to-t from-violet-500 to-violet-700 px-4 py-2 mt-4 uppercase text-white hover:to-violet-900 hover:font-semibold" onClick={handleToggleBookings}>
                    {showAllBookings ? "Show Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueBookings;
