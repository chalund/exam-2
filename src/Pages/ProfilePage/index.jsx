import React, { useEffect, useState } from 'react';
import { BASE_URL, Profile } from '../../components/API';
import { createApiKey } from '../../components/API/ApiKey';

async function getProfile(username, apiKey) {
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

  return (
    <div>
      <h1>My Profile</h1>
      {profileData && (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* Render other profile data as needed */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
