import EditProfileButton from "../../components/Profile/EditProfile";
import MyVenues from "../../components/Profile/VenueManager/MyVenues";

import { Link } from "react-router-dom";
import { GoSmiley } from "react-icons/go";

import Spinner from "../../components/Spinner/Loader";
import formatDate from "../../components/DateFormatter";
import useFetchProfile from "../../components/Hooks/useFetchProfile";

const ProfilePage = () => {
  const { profileData, isLoading, error } = useFetchProfile();

  if (isLoading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{`Error: ${error}`}</div>;
  }

  // Sort bookings by dateFrom in ascending order
  const sortedBookings = profileData.bookings.sort((a, b) => {
    return new Date(a.dateFrom) - new Date(b.dateFrom);
  });

  const handleEditProfileClick = () => {
    console.log("Edit profile button clicked");
    // Add code to handle the edit profile action
  };

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="border bg-white md:mt-10 md:rounded-xl">
        {profileData && (
          <div>
            <div className="relative">
              {/* Banner image */}
              <img
                src={profileData.banner.url}
                alt=""
                className="h-40 w-full object-cover md:rounded-t-xl"
              />

              {/* Profile image */}
              <img
                src={profileData.avatar.url}
                alt=""
                className="translate-y-1/5 absolute inset-1/2 h-32 w-32 -translate-x-1/2 transform rounded-full border-4 border-white"
              />
            </div>
            <div className="mt-16 text-center">
              <p className="font-semibold">{profileData.name}</p>
              <p>{profileData.email}</p>
              <p>{profileData.bio}</p>
              <div className="flex items-center justify-center gap-1 py-2">
                <p className="h-5 w-5 rounded-full bg-violet-700 "></p>
                <p className="uppercase">
                  {profileData.venueManager ? "Venue Manager" : "Guest"}
                </p>
              </div>
              <div className="mt-3">
                <EditProfileButton onClick={handleEditProfileClick} />
              </div>
            </div>

            {/* Render other profile data as needed */}
          </div>
        )}
      </div>

      {profileData && profileData._count.bookings === 0 ? (
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
      ) : (
        <div className="mt-6 border bg-white py-6 md:rounded-xl">
          <div className="flex items-baseline gap-4">
            <h2 className="ms-6 text-xl font-semibold uppercase text-violet-700 md:text-2xl">
              My bookings
            </h2>
            <p>({profileData._count.bookings} bookings available)</p>
          </div>

          {profileData && sortedBookings.length > 0 ? (
            <ul>
              {sortedBookings.map((booking) => (
                <li key={booking.id} className="m-2 flex gap-2 border">
                  {/* <img src={booking.venue.media[0].url} alt="" className="h-20 w-20" /> */}
                  <p>{booking.venue.name}</p>
                  <div>
                    <p>Date From: {formatDate(booking.dateFrom)}</p>
                    <p>Date To: {formatDate(booking.dateTo)}</p>
                    <p>Number of Guests: {booking.guests}</p>
                    <p>Price per night: {booking.venue.price}</p>
                  </div>
                  {/* Render other booking details as needed */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings available.</p>
          )}
        </div>
      )}

      {profileData && profileData.venueManager && (
        <div className="my-6 border bg-white py-6  md:rounded-xl">
          <MyVenues />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
