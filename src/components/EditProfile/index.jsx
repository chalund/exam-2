import { useState } from "react"
import { updateProfile } from "../Hooks/updateUser";
import { createApiKey } from "../API/ApiKey";

const EditProfileForm = () => {

    const [avatarUrl, setAvatarUrl] = useState('')
    const [avatarSrc, setAvatarSrc] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [bannerSrc, setBannerSrc] = useState('')
    const [bio, setBio] = useState('')
    const [userType, setUserType] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditForm = async (e) => {
        e.preventDefault();
        let newData = { avatarUrl, bannerUrl, bio, userType }; // Create an object with updated data

        try {
            // Call the createApiKey function to get the API key
            const apiKeyData = await createApiKey('User profile key');
            const apiKey = apiKeyData.data.key;

            if (userType === "Venue Manager") {
                newData = { ...newData, venueManager: true };
            }
            if (userType === "Guest") {
                newData = { ...newData, venueManager: false};
            }
    
            // Call the updateProfile function with the username, new data, and API key
            const username = localStorage.getItem('username');
            await updateProfile(username, newData, apiKey);
            console.log('Profile updated successfully');
           console.log(newData)
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload();
      };
    
      const handleSave = () => {
        // Add logic to save edited profile data
        console.log('Profile edited');
        closeModal();
      };

  

      return (
        <div style={{ position: 'relative' }}>
          <button onClick={openModal} className='bg-gradient-to-t from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 hover:text-white px-8 py-2 rounded-full uppercase font-semibold mb-5'>
            Edit Profile
          </button>
          {isModalOpen && (
            <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
              <div className="modal-content" style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '80%' }}>
                <span className="close flex justify-end text-2xl cursor-pointer" onClick={closeModal}>&times;</span>
            
  
        <form onSubmit={handleEditForm}>
        <h2 className='py-3 uppercase text-violet-600 font-semibold'>Edit Profile</h2>

        <div>
            <div className="flex items-center text-lg mb-4">
                <input
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    type="url"
                    name='avatarUrl'
                    placeholder='Avatar URL...'
                    className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                />
            </div>
            <div className="flex items-center text-lg mb-4">
                <input
                    value={avatarSrc}
                    onChange={(e) => setAvatarSrc(e.target.value)}
                    type="text"
                    name='imageText'
                    placeholder='Avatar Text...'
                    className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                />
            </div>
            <div className="flex items-center text-lg mb-4">
                <input
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    type="url"
                    name='bannerUrl'
                    placeholder='Banner URL...'
                    className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                />
            </div>
            <div className="flex items-center text-lg mb-4">
                <input
                    value={bannerSrc}
                    onChange={(e) => setBannerSrc(e.target.value)}
                    type="text"
                    name='bannerText'
                    placeholder='Banner Text...'
                    className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                />
            </div>
            <div className="flex items-center text-lg mb-4">
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    name='bio'
                    placeholder='Update Bio'
                    className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                />
            </div>
            <div className="flex gap-4 mb-3">
            <div>
                <input 
                    type="radio" 
                    name="userType" 
                    id="guestRadio" 
                    checked={userType === "Guest"}  
                    onChange={(e) => setUserType("Guest")} // Use setUserType to update the user type state
                    className="form-radio text-indigo-600"
                />
                <label htmlFor="guestRadio">Guest</label>
            </div>
            <div>
                <input 
                    type="radio" 
                    id="venueManagerRadio" 
                    name="userType" 
                    checked={userType === "Venue Manager"} // Set checked value based on userType
                    onChange={(e) => setUserType("Venue Manager")} // Use setUserType to update the user type state
                    className="form-radio text-indigo-600"
                />
                <label htmlFor="venueManagerRadio">Venue Manager</label>
            </div>

        </div>
        </div>
        <button onClick={handleSave} className='bg-gradient-to-t from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 hover:text-white px-8 py-2 rounded-full uppercase font-semibold mb-5'>Save</button>

        </form>

</div>
</div>
)}
</div>
);
};

export default EditProfileForm
