// import { useState } from 'react';

// export function useUpdateProfile() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function updateProfile(username, apiKey, newData) {
//     setLoading(true);
//     setError(null);

//     const accessToken = localStorage.getItem('accessToken');
//     const getProfileUrl = `${BASE_URL}${Profile}/${username}`;

//     const options = {
//       method: 'PUT', // Adjust the method based on your API
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'X-Noroff-API-Key': apiKey,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newData),
//     };

//     try {
//       const response = await fetch(getProfileUrl, options);
//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }
//       setLoading(false);
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//     }
//   }

//   return { updateProfile, loading, error };
// }
