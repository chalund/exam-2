import React, { useEffect, useState } from 'react';
import { BASE_URL, Profile } from '../../components/API';
import { createApiKey } from '../../components/API/ApiKey';
import EditProfileButton from '../../components/EditProfile';

export async function getProfile(username, apiKey) {
  const accessToken = localStorage.getItem('accessToken');
  const getProfileUrl = `${BASE_URL}${Profile}/${username}`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey
    }
  };
   
  try {
    const response = await fetch(getProfileUrl, options);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState('');



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          throw new Error('Username not found in local storage');
        }

        // Create API key first
        const apiKeyData = await createApiKey('User profile key');
        const apiKey = apiKeyData.data.key;

        // Fetch profile with the created API key
        const profile = await getProfile(username, apiKey);
        console.log('Profile data:', profile); // Add this line to check profileData
        setProfileData(profile.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle error
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfileClick = () => {
    console.log('Edit profile button clicked');
    // Add code to handle the edit profile action
  };
  

  return (
    <div className='max-w-screen-md mx-auto'>
    <div className='border border-black md:rounded-xl  bg-white'>
      {profileData && (
        <div>
         <div className="relative">
          {/* Banner image */}
          <img src={profileData.banner.url} alt="" className="h-40 w-full object-cover rounded-t-xl" />



          {/* Profile image */}
          <img
            src={profileData.avatar.url}
            alt=""
            className="absolute inset-1/2 transform -translate-x-1/2 translate-y-1/5 rounded-full border-4 border-white w-32 h-32"

          />
        </div>
        <div className='text-center mt-16'>
          <p className='font-semibold'>{profileData.name}</p>
          <p>{profileData.email}</p>
          <p>{profileData.bio}</p>
          <div className='flex gap-1 justify-center items-center py-2'>
            <p className='rounded-full bg-violet-600 h-5 w-5 '></p>
            <p className='uppercase'>{profileData.venueManager ? 'Venue Manager' : 'Guest'}</p>
          </div>
          <EditProfileButton onClick={handleEditProfileClick}/>

        </div>
    
 
          {/* Render other profile data as needed */}
        </div>
      )}
    </div>

    <div className='border border-black my-8 bg-white'>
      <h2>My bookings</h2>
    </div>

    <div className='border border-black my-8 bg-white'>
      <h2>My Venues</h2>
    </div>

    <div className='border border-black my-8 bg-white'>
      <h2>Venues Bookings</h2>
    </div>

    </div>

  );
};

export default ProfilePage;
