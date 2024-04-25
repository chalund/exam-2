import React, { useState } from 'react';

const EditProfileButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
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
              <span className="close flex justify-end text-2xl cursor-pointer hover:text-3xl" onClick={closeModal}>&times;</span>
                <h2 className='py-3 uppercase text-violet-600 font-semibold'>Edit Profile</h2>


                <form action="">
                    <div>
                        <div className="flex items-center text-lg mb-4">
                            <input
                                type="url"
                                name='imageUrl'
                                placeholder='Image URL...'
                                className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                            />
                        </div>
                        <div className="flex items-center text-lg mb-4">
                            <input
                                type="text"
                                name='imageText'
                                placeholder='Image Text...'
                                className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                            />
                        </div>
                        <div className="flex items-center text-lg mb-4">
                            <input
                                type="url"
                                name='bannerUrl'
                                placeholder='Banner URL...'
                                className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                            />
                        </div>
                        <div className="flex items-center text-lg mb-4">
                            <input
                                type="text"
                                name='bannerText'
                                placeholder='Banner Text...'
                                className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                            />
                        </div>
                        <div className="flex items-center text-lg mb-4">
                            <textarea
                                name='bio'
                                placeholder='Update Bio'
                                className="border rounded-xl pl-3 py-2 focus:outline-none w-full" 
                            />
                        </div>
                        <div className="flex gap-4 mb-3">
                        <div>
                            <input type="radio" 
                                id="guestRadio" // Add unique IDs for the radio buttons
                                // checked={userType === "Guest"}  
                                // onChange={(e) => setUserType(e.target.value)} 
                                name="userType" // Use the same name for both radio buttons in the group
                                value="Guest" 
                                className="form-radio text-indigo-600"
                            />
                            <label htmlFor="guestRadio"> Guest</label> {/* Associate label with input using htmlFor */}
                        </div>
                        <div>
                        <input type="radio" 
                            id="venueManagerRadio" // Add unique IDs for the radio buttons
                            // checked={userType === "Venue Manager"}
                            // onChange={(e) => setUserType(e.target.value)}
                            name="userType" // Use the same name for both radio buttons in the group
                            value="Venue Manager" 
                        />
                        <label htmlFor="venueManagerRadio"> Venue Manager </label> {/* Associate label with input using htmlFor */}
                        </div>
                    </div>
                    </div>
                </form>

              <button onClick={handleSave} className='bg-gradient-to-t from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 hover:text-white px-8 py-2 rounded-full uppercase font-semibold mb-5'>Save</button>
            </div>
          </div>
        )}
      </div>
    );
};

export default EditProfileButton;
