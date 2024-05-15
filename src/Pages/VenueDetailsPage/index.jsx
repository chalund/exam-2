import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import { MdOutlineEmail } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaArrowLeft, FaBed, FaWifi, FaParking } from "react-icons/fa";
import { MdOutlinePets, MdBreakfastDining } from "react-icons/md";
import { useEffect, useState } from "react";
import StarRate from "../../components/StarRating";
import formatDate from "../../components/DateFormatter";

import NoImage from "../../assets/no_image.jpg";
import Spinner from "../../components/Spinner/Loader";
import BookingFormLink from "../../components/CreateBooking/BookingFormLink";
import BookingForm from "../../components/CreateBooking/BookingForm";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${BASE_URL}/venues/${id}?_owner=true&_bookings=true`,
  );
  const [isOwner, setIsOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const loggedInUserEmail = localStorage.getItem("userEmail"); // Assuming the user's email is stored in localStorage

  useEffect(() => {
    if (data && data.data) {
      const { owner } = data.data;
      setIsOwner(owner.email === loggedInUserEmail);
    }
  }, [data, loggedInUserEmail]);

  const handleFormSubmit = () => {
    setEditMode(false); // Exit edit mode after form submission
    window.location.reload(); // Refresh the page to reflect changes
  };

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  const {
    name,
    description,
    maxGuests,
    location,
    media,
    price,
    rating,
    created,
    updated,
    meta: { wifi, parking, breakfast, pets },
    owner: {
      name: ownerName,
      email: ownerEmail,
      avatar: { url: ownerAvatarUrl },
    },
  } = data.data;

  return (
    <div className="mx-auto max-w-screen-md rounded-xl border bg-white md:my-6">
      <div className="ms-2 mt-4 flex items-center gap-2">
        <FaArrowLeft />
        {isOwner ? (
          <Link to={`/profile`} className="underline">
            Back to Profile
          </Link>
        ) : (
          <Link to={`/listings`} className="underline">
            Back to List of Venues
          </Link>
        )}
      </div>

      <div className="py-4 md:px-6">
        {media && media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6">
            {media.length === 1 ? (
              <div className="col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full max-h-[300px] w-full md:rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = NoImage; // Set placeholder image
                  }}
                />
              </div>
            ) : (
              <div className="relative col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full max-h-[300px] w-full md:rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = NoImage; // Set placeholder image
                  }}
                />
                {media.length > 1 && (
                  <button className="absolute bottom-1 right-4 mb-5 rounded-full bg-white bg-gradient-to-r px-3 py-2 text-sm font-semibold uppercase text-violet-700 hover:from-orange-300 hover:to-orange-500 hover:text-white">
                    <Link to={`/venue/images/${id}`}>View all</Link>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {!media || media.length === 0 ? (
          <div className="relative col-span-2 flex items-center md:col-span-4">
            <img
              src={NoImage}
              alt="No Image"
              className="mx-auto max-h-[300px] border md:rounded-xl"
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-4 mt-4">
            <div className="flex gap-3">
              <h1 className="truncate text-lg font-bold">{name}</h1>
              <div className="flex items-center py-1">
                {rating ? (
                  <StarRate rating={rating} size={20} />
                ) : (
                  <StarRate size={20} />
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <IoCalendarNumberOutline />
              <p></p>
              <BookingFormLink venueId={id} />
            </div>

            <p className="mt-5 font-semibold">Description</p>
            <p className="mb-3">{description}</p>
            <div className="mt-1 flex items-center gap-1 truncate font-semibold">
              <FaBed size={24} />
              <p>{maxGuests} Guests</p>
            </div>

            {wifi || breakfast || parking || pets ? (
              <div className="mt-6">
                <p className="font-semibold">Facilities</p>
                <ul className="mt-2 flex gap-2">
                  {wifi && (
                    <li>
                      <FaWifi size={30} />
                    </li>
                  )}
                  {breakfast && (
                    <li>
                      <MdBreakfastDining size={30} />
                    </li>
                  )}
                  {parking && (
                    <li>
                      <FaParking size={30} />
                    </li>
                  )}
                  {pets && (
                    <li>
                      <MdOutlinePets size={30} />
                    </li>
                  )}
                </ul>
              </div>
            ) : null}

            <div className="mt-6">
              <p>
                Price: <strong>${price}</strong> pr night
              </p>
            </div>

            <div className="py-4 ">
              <p className="font-semibold">Location</p>
              <p className="truncate">Address: {location.address}</p>
              <p className="truncate">
                City: {location.zip} {location.city}
              </p>
              <p className="truncate">Country: {location.country}</p>
            </div>

            <div className="max-w-sm py-4 md:hidden">
              <p className="font-semibold">Hosted by</p>
              <div className="mt-2 flex items-center gap-4 rounded-xl border p-3">
                <img
                  src={ownerAvatarUrl}
                  alt="profile image of host"
                  className="h-20 w-20 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = NoImage; // Set placeholder image
                  }}
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{ownerName}</p>
                  <div className="flex items-center gap-1">
                    <MdOutlineEmail size={20} />
                    <p className="text-xs ">{ownerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-xs">Venue added: {formatDate(created)}</p>
              {created !== updated && (
                <p className="text-xs">Updated: {formatDate(updated)}</p>
              )}
            </div>
          </div>

          <div className="hidden grid-cols-6 p-2 md:block">
            {/* {!isOwner && isLoggedIn && ( */}
            {isLoggedIn && (
              <div className="mt-6 rounded-xl border bg-white p-4">
                <BookingForm price={price} venueId={id} />
              </div>
            )}
            {!isLoggedIn && (
              <div className="mt-6 rounded-xl border bg-white p-4">
                <p>
                  You need to{" "}
                  <Link to="/login" className="text-violet-700 underline">
                    log in
                  </Link>{" "}
                  to make a booking.
                </p>
              </div>
            )}

            <div className="mt-3 hidden py-4 md:block">
              <p className="font-semibold">Hosted by</p>
              <div className="mt-2 flex items-center gap-4 rounded-xl border p-3">
                <img
                  src={ownerAvatarUrl}
                  alt="profile image of host"
                  className="h-20 w-20 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = NoImage; // Set placeholder image
                  }}
                />
                <div>
                  <p
                    className="truncate font-semibold"
                    style={{ maxWidth: "200px" }}
                  >
                    {ownerName}
                  </p>
                  <div className="flex items-center gap-1">
                    <MdOutlineEmail size={20} />
                    <p className="truncate" style={{ maxWidth: "200px" }}>
                      {ownerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
