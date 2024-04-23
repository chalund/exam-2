import { Link, useParams } from 'react-router-dom';
import { BASE_URL, Venues } from '../../components/API';
import { useFetch } from '../../components/Hooks/useFetch';

import { FaArrowLeft } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { MdBreakfastDining } from "react-icons/md";
import { useEffect } from 'react';

const VenueDetailsPage = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(BASE_URL + Venues + `/${id}`);
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
    const { name, description, maxGuests, location, media, price, rating, created, updated, meta: { wifi, parking, breakfast, pets } } = data.data;

  
    return (
      <div className='mt-4'>
        <div className='flex items-center gap-2'>
          <FaArrowLeft />
          <Link to={`/listings`} className='underline'>Back to List of Venues</Link>
        </div>

            <div className='mt-4'>
                {media && media.length > 0 && (
                    <img src={media[0].url} alt={media[0].alt} className='object-cover w-full h-48 ' />
                )}

                <div>
                  <h1>{name}</h1>
                  <p>Rating: {rating}</p>
                  calendar, date edit
                  <p>Description: {description}</p>
                  <div className='flex items-center gap-1'>
                    <FaBed />
                    <p>{maxGuests}</p>
                  </div>
                  <div className='py-2'>
                    <p>Facilities</p>
                    <ul className='flex gap-2'>
                      {wifi && <li><FaWifi size={30}/></li>}
                      {breakfast && <li><MdBreakfastDining size={30}/></li>}
                      {parking && <li><FaParking size={30} /></li>}
                      {pets && <li><MdOutlinePets size={30}/></li>}
                    </ul>
                  </div>

                
                </div>
               
                
                <p>Location: {location.city}, {location.address}</p>
                <p>Price: ${price}</p>
                <button className='border p-2 bg-orange-300 uppercase'>Book now</button>
                <p>{created}</p>



               
          
            </div>
   
      </div>
    );
}

export default VenueDetailsPage;
