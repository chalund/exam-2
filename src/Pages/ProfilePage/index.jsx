import EditProfileButton from "../../components/Profile/EditProfile";
import MyVenues from "../../components/Profile/VenueManager/MyVenues";
import MyBookings from "../../components/Profile/MyBookings";
import Spinner from "../../components/Spinner/Loader";
import useFetchProfile from "../../components/Hooks/useFetchProfile";
import NoImage from "../../assets/no_image.jpg"; // Assuming you have a placeholder image

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

  const sortedBookings = profileData.bookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
  );

  return (
    <div className="mx-auto max-w-screen-md mb-10 p- md:py-10">
      <div className="border bg-white  md:rounded-xl">
        {profileData && (
          <div>
            <div className="relative">
              <img
                src={profileData.banner?.url || NoImage}
                alt="Banner"
                className="h-40 w-full object-cover md:rounded-t-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = NoImage;
                }}
              />
              <img
                src={profileData.avatar?.url || NoImage}
                alt="Avatar"
                className="translate-y-1/5 absolute inset-1/2 h-32 w-32 -translate-x-1/2 transform rounded-full border-4 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = NoImage;
                }}
              />
            </div>
            <div className="mt-16 text-center">
              <p className="font-semibold">{profileData.name}</p>
              <p>{profileData.email}</p>
              {profileData.bio && (
                <p className="mt-3">Bio: "{profileData.bio}"</p>
              )}
              <div className="flex items-center justify-center gap-1 py-2">
                <p
                  className={`h-5 w-5 rounded-full ${
                    profileData.venueManager ? "bg-violet-700" : "bg-orange-400"
                  }`}
                ></p>
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
        <MyBookings
          bookings={sortedBookings}
          totalCount={profileData._count.bookings}
        />
      )}

      {profileData && profileData.venueManager && (
        <div className="mt-6 border bg-white py-6 md:mb-12 md:rounded-xl">
          <MyVenues />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
