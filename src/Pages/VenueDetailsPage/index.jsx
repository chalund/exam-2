import { Link, useParams } from 'react-router-dom';
import { BASE_URL, Venues } from '../../components/API';
import { useFetch } from '../../components/Hooks/useFetch';

import { MdOutlineEmail } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { MdBreakfastDining } from "react-icons/md";
import { useEffect } from 'react';
import StarRate from '../../components/StarRating';
import formatDate from '../../components/DateFormatter';

const VenueDetailsPage = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`${BASE_URL}/venues/${id}?_owner=true`);
    console.log("Data:", data);

    useEffect(() => {
    }, []);

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
      meta: { wifi, parking, breakfast, pets},
      owner: { name: ownerName, email: ownerEmail, avatar: { url: ownerAvatarUrl } } 
    } = data.data;


 

  
    return (
      <div className='mt-4'>
        <div className='flex items-center gap-2'>
          <FaArrowLeft />
          <Link to={`/listings`} className='underline'>Back to List of Venues</Link>
        </div>

            <div className='mt-4 border border-green-400'>
                {media && media.length > 0 && (
                    <img src={media[0].url} alt={media[0].alt} className='object-cover w-full h-48 ' />
                )}

                <div className='m-2'>
                  
                  <div className='flex justify-between'>
                    <h1 className='font-bold text-lg'>{name}</h1>
                    <div className="flex items-center py-1">
                      {rating ? <StarRate rating={rating} size={20} /> : <StarRate size={20} />}
                    </div>
                  </div>


                  <p className='mt-5 font-semibold'>Description</p>
                  <p>{description}</p>
                  <div className='flex items-center gap-1 mt-1'>
                    <FaBed size={20}/>
                    <p>{maxGuests} Guests</p>
                  </div>

                  <div className='py-3'>
                    <p>Facilities</p>
                    <ul className='flex gap-2'>
                      {wifi && <li><FaWifi size={30}/></li>}
                      {breakfast && <li><MdBreakfastDining size={30}/></li>}
                      {parking && <li><FaParking size={30} /></li>}
                      {pets && <li><MdOutlinePets size={30}/></li>}
                    </ul>
                  </div>

                  <p>Price: <strong>${price}</strong> pr night</p>

                  <div className='py-2'>
                    <p className=' font-semibold'>Location</p> 
                    <p>Address: {location.address}</p>
                    <p>City: {location.city} </p>
                    <p>Country: {location.country} </p>
                  </div>
                 
                  <button className='border p-2 bg-orange-300 uppercase'>Book now</button>

                  <p>Created: {formatDate(created)}</p>
                  <p>Updated: {formatDate(updated)}</p>

                  <div className='py-2'>
                    <p className='font-semibold'>Hosted by</p>
                    <div className='border rounded-xl flex gap-4 p-3 items-center mt-2'>
                      <img src={ownerAvatarUrl} alt="profile image of host" className='rounded-full w-20 h-20' />
                      <div>
                        <p className='font-semibold'>{ownerName}</p>
                        <div className='flex items-center gap-1'>
                          <MdOutlineEmail size={20}/>
                          <p>{ownerEmail}</p>
                        </div>
                     
                      </div>
                   
                    </div>

                  </div>


                </div>
               
                
             
            </div>
      </div>
    );
}

export default VenueDetailsPage;
