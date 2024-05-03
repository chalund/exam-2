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
import EditVenueLink from "../../components/Search/searchMobile";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${BASE_URL}/venues/${id}?_owner=true`);
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
    owner: { name: ownerName, email: ownerEmail, avatar: { url: ownerAvatarUrl } },
  } = data.data;

  const handleEditLinkClick = () => {
    console.log( "edit link clicked")
  }

  return (
    <div className="mx-auto mt-4 max-w-screen-md">
      <div className="flex items-center gap-2">
        <FaArrowLeft />
        <Link to={`/listings`} className="underline">
          Back to List of Venues
        </Link>
      </div>

      <div className="my-6 border rounded-xl">
        {media && media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6 ">
            {media.length === 1 ? (
              <div className="col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full w-full max-h-[400px]  md:rounded-xl"
                />
              </div>
            ) : (
              <div className="relative col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full max-h-[400px] w-full  md:rounded-xl"
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
          <div className="m-2">
            <div className="flex gap-3">
              <h1 className="text-lg font-bold">{name}</h1>
              <div className="flex items-center py-1">
                {rating ? <StarRate rating={rating} size={20} /> : <StarRate size={20} />}
              </div>
            </div>

            <div className="flex gap-1">
            <p>date </p>
            <EditVenueLink onClick={handleEditLinkClick}/>
            </div>
            

            <p className="mt-5 font-semibold">Description</p>
            <p>{description}</p>
            <div className="mt-1 flex items-center gap-1">
              <FaBed size={20} />
              <p>{maxGuests} Guests</p>
            </div>

            <div className="py-6">
              <p>Facilities</p>
              <ul className="flex gap-2">
                {wifi && <li><FaWifi size={30} /></li>}
                {breakfast && <li><MdBreakfastDining size={30} /></li>}
                {parking && <li><FaParking size={30} /></li>}
                {pets && <li><MdOutlinePets size={30} /></li>}
              </ul>
            </div>

            <p>Price: <strong>${price}</strong> pr night</p>

            <div className="py-4">
              <p className="font-semibold">Location</p>
              <p>Address: {location.address}</p>
              <p>City: {location.city}</p>
              <p>Country: {location.country}</p>
            </div>

            <div className="py-4">
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
          <div className="">
              <p className="text-xs">Venue added: {formatDate(created)}</p>
              <p className="text-xs">Updated: {formatDate(updated)}</p>
            </div>
       


        
          </div>

          <div className="hidden md:block border bg-orange-100 grid-cols-6 p-2">

            <div className="border bg-blue-100 mt-6 p-4">
              <p>${price} per night</p>
              <form action="">
                <div className="bg-green-100 border">
                  <div className="flex">
                    <input type="text" className="border w-36 h-10" />
                    <input type="text" className="border w-36 h-10"/>
                  </div>
                  <input type="text" className="w-72 h-10"/>
                </div>
               
                <button
       
        className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
      >
        Edit Profile
      </button>
              </form>
            </div>
           
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
