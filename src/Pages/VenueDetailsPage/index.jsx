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
    <div className="mx-auto mt-4 max-w-screen-md ">
      <div className="flex items-center gap-2">
        <FaArrowLeft />
        <Link to={`/listings`} className="underline">
          Back to List of Venues
        </Link>
      </div>

      <div className="mt-4 border">
     
{media && media.length > 0 && (
  <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6 ">
    {media.length === 1 ? (
      <div className="flex items-center col-span-2 md:col-span-4">
        <img
          src={media[0].url}
          alt={`Image 1`}
          className=" h-full w-full object-cover md:rounded-xl"
          
        />
      </div>
    ) : (
      <div className="relative flex items-center col-span-2 md:col-span-3">
        <img
          src={media[0].url}
          alt={`Image 1`}
          className=" h-full w-full object-cover md:rounded-xl"
        />
        {media.length > 1 && (
          <button className="absolute bottom-6 right-4 rounded-lg bg-orange-300 px-3 py-2 text-sm uppercase  md:hidden">
              <Link to={`/venue/images/${id}`}>View all</Link>
          </button>
        )}
      </div>
    )}
    {media.length > 2 && (
      <div className="hidden md:flex-col md:gap-4 md:col-span-1 md:flex">
        <div className="relative w-full" style={{ height: "calc(50% - 2px)" }}>
          <img
            src={media[1].url}
            alt={`Image 2`}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
        <div className="relative w-full" style={{ height: "calc(50% - 2px)" }}>
          <img
            src={media[2].url}
            alt={`Image 3`}
            className="h-full w-full rounded-xl object-cover"
          />
          <button className="absolute bottom-2 right-3 rounded-lg bg-orange-300 px-3 py-2 text-xs uppercase">
            <Link to={`/venue/images/${id}`}>View all</Link>
          </button>
        </div>
      </div>
    )}
  </div>
)}




       

        <div className="m-2">
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
