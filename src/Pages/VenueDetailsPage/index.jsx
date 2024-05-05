import { Link, useParams } from "react-router-dom";
import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";

import { MdOutlineEmail } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";

import { FaArrowLeft } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { MdBreakfastDining } from "react-icons/md";
import { useEffect } from "react";
import StarRate from "../../components/StarRating";
import formatDate from "../../components/DateFormatter";
import EditVenueLink from "../../components/Search/searchMobile";
import BookingForm from "../../components/BookingForm";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${BASE_URL}/venues/${id}?_owner=true`,
  );
  console.log("Data:", data);

  useEffect(() => {}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Check if data is available
  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  // Destructure the data object
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

  const handleEditLinkClick = () => {
    console.log("edit link clicked");
  };

  return (
    <div className="mx-auto max-w-screen-md rounded-xl border bg-white md:my-6">
      <div className="ms-2 mt-4 flex items-center gap-2">
        <FaArrowLeft />
        <Link to={`/listings`} className="underline">
          Back to List of Venues
        </Link>
      </div>

      <div className="py-4 md:px-6">
        {media && media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6 ">
            {media.length === 1 ? (
              <div className="col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full max-h-[300px] w-full  md:rounded-xl"
                />
              </div>
            ) : (
              <div className="relative col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full max-h-[300px] w-full  md:rounded-xl"
                />
                {media.length > 1 && (
                  <button className="absolute bottom-6 right-4 rounded-lg bg-orange-300 px-3 py-2 text-sm uppercase">
                    <Link to={`/venue/images/${id}`}>View all</Link>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-4 mt-4">
            <div className="flex gap-3">
              <h1 className="text-lg font-bold">{name}</h1>
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
              <EditVenueLink onClick={handleEditLinkClick} />
            </div>

            <p className="mt-5 font-semibold">Description</p>
            <p>{description}</p>
            <div className="mt-1 flex items-center gap-1">
              <FaBed size={20} />
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

            <div className="py-4">
              <p className="font-semibold">Location</p>
              <p>Address: {location.address}</p>
              <p>City: {location.city}</p>
              <p>Country: {location.country}</p>
            </div>

            <div className="max-w-sm py-4 md:hidden">
              <p className="font-semibold">Hosted by</p>
              <div className="mt-2 flex  items-center gap-4 rounded-xl border p-3">
                <img
                  src={ownerAvatarUrl}
                  alt="profile image of host"
                  className="h-20 w-20 rounded-full"
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

          <div className="hidden grid-cols-6 p-2 md:block ">
            <div className="mt-6 rounded-xl border bg-white p-4">
      
              <BookingForm price={price} />
              
              {/* <form action="">
                <div className="">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="check-in"
                      className="h-10 w-1/2 rounded-tl-xl border pl-2 text-sm uppercase focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="check-out"
                      className="h-10  w-1/2 rounded-tr-xl border pl-2 text-sm uppercase focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Guests"
                    className="h-10  w-full rounded-b-xl border pl-2 text-sm uppercase focus:outline-none"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="mb-5  w-full rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
                    Book now
                  </button>
                </div>
                <div className="mr-3 flex justify-between border-b pb-2">
                  <p>${price} x SELECTED NIGHTS</p>
                  <p>$total</p>
                </div>
                <div className="mr-3 mt-4 flex justify-between font-bold">
                  <p>total</p>
                  <p>$8888</p>
                </div>
              </form> */}
            </div>

            <div className="mt-3 hidden py-4 md:block">
              <p className="font-semibold">Hosted by</p>
              <div className="mt-2 flex items-center gap-4 rounded-xl border p-3">
                <img
                  src={ownerAvatarUrl}
                  alt="profile image of host"
                  className="h-20 w-20 rounded-full"
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
