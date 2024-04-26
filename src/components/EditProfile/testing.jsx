import React, { useState } from "react";

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
    console.log("Profile edited");
    closeModal();
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={openModal}
        className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
      >
        Edit Profile
      </button>
      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            className="modal-content"
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
            }}
          >
            <span
              className="close flex cursor-pointer justify-end text-2xl hover:text-3xl"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="py-3 font-semibold uppercase text-violet-600">
              Edit Profile
            </h2>

            <form action="">
              <div>
                <div className="mb-4 flex items-center text-lg">
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="Image URL..."
                    className="w-full rounded-xl border py-2 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center text-lg">
                  <input
                    type="text"
                    name="imageText"
                    placeholder="Image Text..."
                    className="w-full rounded-xl border py-2 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center text-lg">
                  <input
                    type="url"
                    name="bannerUrl"
                    placeholder="Banner URL..."
                    className="w-full rounded-xl border py-2 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center text-lg">
                  <input
                    type="text"
                    name="bannerText"
                    placeholder="Banner Text..."
                    className="w-full rounded-xl border py-2 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center text-lg">
                  <textarea
                    name="bio"
                    placeholder="Update Bio"
                    className="w-full rounded-xl border py-2 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-3 flex gap-4">
                  <div>
                    <input
                      type="radio"
                      id="guestRadio" // Add unique IDs for the radio buttons
                      // checked={userType === "Guest"}
                      // onChange={(e) => setUserType(e.target.value)}
                      name="userType" // Use the same name for both radio buttons in the group
                      value="Guest"
                      className="form-radio text-indigo-600"
                    />
                    <label htmlFor="guestRadio"> Guest</label>{" "}
                    {/* Associate label with input using htmlFor */}
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="venueManagerRadio" // Add unique IDs for the radio buttons
                      // checked={userType === "Venue Manager"}
                      // onChange={(e) => setUserType(e.target.value)}
                      name="userType" // Use the same name for both radio buttons in the group
                      value="Venue Manager"
                    />
                    <label htmlFor="venueManagerRadio"> Venue Manager </label>{" "}
                    {/* Associate label with input using htmlFor */}
                  </div>
                </div>
              </div>
            </form>

            <button
              onClick={handleSave}
              className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileButton;
