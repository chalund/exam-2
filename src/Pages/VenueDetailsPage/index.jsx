import { Link, useParams } from "react-router-dom";
import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";

import { MdOutlineEmail } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { MdBreakfastDining } from "react-icons/md";
import { useEffect } from "react";
import StarRate from "../../components/StarRating";
import formatDate from "../../components/DateFormatter";

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

  return (
    <div className="mx-auto max-w-screen-md mt-4 ">
      <div className="flex items-center gap-2">
        <FaArrowLeft />
        <Link to={`/listings`} className="underline">
          Back to List of Venues
        </Link>
      </div>

      <div className="mt-4 border border-green-400">
        {/* {media && media.length > 0 && (
          <img
            src={media[0].url}
            alt={media[0].alt}
            className="h-48 w-full object-cover "
          />
        )} */}

{media && media.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 md:h-screen ">
    {media.length === 1 ? (
      <div className="col-span-2 md:col-span-4 flexitems-center">
        <img
          src={media[0].url}
          alt={`Image 1`}
          className="max-h-96 w-full object-cover mb-2 md:rounded-xl"
        />
      </div>
    ) : (
      <div className="col-span-2 md:col-span-3 relative">
        <img
          src={media[0].url}
          alt={`Image 1`}
          className="max-h-96 md:h-2/5 w-full object-cover mb-2 rounded-xl"
        />
        {/* Conditionally render the button */}
        {media.length > 1 && (
          <button className="absolute bottom-6 right-4 px-3 py-2 bg-white text-gray-700 rounded-lg uppercase text-sm md:hidden">
            View All
          </button>
        )}
      </div>
    )}
    {media.length > 1 && (
      <div className="hidden col-span-1 md:col-span-1 md:flex flex-col gap-2">
        <img
          src={media[1].url}
          alt={`Image 2`}
          className="h-1/6 w-full object-cover mb-5 rounded-xl"
        />
        <div className="relative h-1/5 w-full">
          <img
            src={media[2].url}
            alt={`Image 3`}
            className="h-full w-full object-cover rounded-xl"
          />
          {/* Conditionally render the button */}
          <button className="absolute bottom-2 right-2 px-3 py-1 bg-white text-gray-700 rounded-lg uppercase text-xs">
            View All
          </button>
        </div>
      </div>
    )}
  </div>
)}




        <div className="m-2">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">{name}</h1>
            <div className="flex items-center py-1">
              {rating ? (
                <StarRate rating={rating} size={20} />
              ) : (
                <StarRate size={20} />
              )}
            </div>
          </div>

          <p className="mt-5 font-semibold">Description</p>
          <p>{description}</p>
          <div className="mt-1 flex items-center gap-1">
            <FaBed size={20} />
            <p>{maxGuests} Guests</p>
          </div>

          <div className="py-3">
            <p>Facilities</p>
            <ul className="flex gap-2">
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

          <p>
            Price: <strong>${price}</strong> pr night
          </p>

          <div className="py-2">
            <p className=" font-semibold">Location</p>
            <p>Address: {location.address}</p>
            <p>City: {location.city} </p>
            <p>Country: {location.country} </p>
          </div>

          <button className="border bg-orange-300 p-2 uppercase">
            Book now
          </button>

          <p>Created: {formatDate(created)}</p>
          <p>Updated: {formatDate(updated)}</p>

          <div className="py-2">
            <p className="font-semibold">Hosted by</p>
            <div className="mt-2 flex items-center gap-4 rounded-xl border p-3">
              <img
                src={ownerAvatarUrl}
                alt="profile image of host"
                className="h-20 w-20 rounded-full"
              />
              <div>
                <p className="font-semibold">{ownerName}</p>
                <div className="flex items-center gap-1">
                  <MdOutlineEmail size={20} />
                  <p>{ownerEmail}</p>
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
