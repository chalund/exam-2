import { Link, useParams } from 'react-router-dom';
import { BASE_URL, Venues } from '../../components/API';
import { useFetch } from '../../components/Hooks/useFetch';

const VenueDetailsPage = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(BASE_URL + Venues + `/${id}`);

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
    const { name, description, location, media, price, rating } = data.data;
  
    return (
      <div className='mt-4'>
        <Link to="/venues" className='m-2 underline'>Back to List of Venues</Link>
            <div className='mt-4'>
                <h1>{name}</h1>
                <p>Description: {description}</p>
                <p>Location: {location.city}, {location.address}</p>
                <p>Price: ${price}</p>
                <p>Rating: {rating}</p>
          
            </div>
   
      </div>
    );
}

export default VenueDetailsPage;
