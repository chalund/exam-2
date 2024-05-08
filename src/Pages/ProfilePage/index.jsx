// ProfilePage.js

import EditProfileButton from "../../components/Profile/EditProfile";
import MyVenues from "../../components/Profile/VenueManager/MyVenues";
import MyBookings from "../../components/Profile/MyBookings";
import Spinner from "../../components/Spinner/Loader";
import useFetchProfile from "../../components/Hooks/useFetchProfile";

const ProfilePage = () => {
  const { profileData, isLoading, error } = useFetchProfile();

  console.log(profileData)

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
  const sortedBookings = profileData.bookings.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="border bg-white md:mt-10 md:rounded-xl">
        {profileData && (
          <div>
            <div className="relative">
              <img
                src={profileData.banner.url}
                alt=""
                className="h-40 w-full object-cover md:rounded-t-xl"
              />
              <img
                src={profileData.avatar.url}
                alt=""
                className="translate-y-1/5 absolute inset-1/2 h-32 w-32 -translate-x-1/2 transform rounded-full border-4 border-white"
              />
            </div>
            <div className="mt-16 text-center">
              <p className="font-semibold">{profileData.name}</p>
              <p>{profileData.email}</p>
              <p className="mt-3">Bio: "{profileData.bio}"</p>
              <div className="flex items-center justify-center gap-1 py-2">
                <p className="h-5 w-5 rounded-full bg-violet-700 "></p>
                <p className="uppercase">
                  {profileData.venueManager ? "Venue Manager" : "Guest"}
                </p>
              </div>
              <div className="mt-3">
                <EditProfileButton />
              </div>
            </div>
          </div>
        )}
      </div>

      {profileData && (
        <MyBookings bookings={sortedBookings} totalCount={profileData._count.bookings} />
      )}

      {profileData && profileData.venueManager && (
        <div className="my-6 border bg-white py-6 md:rounded-xl">
          <MyVenues />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
