import { useState, useEffect } from "react";
import { updateProfile } from "../../API/Profile/updateUser";
import { createApiKey } from "../../API/ApiKey";
import { getProfile } from "../../API/Profile/getProfile";
import { IoCloseOutline } from "react-icons/io5";

const EditProfileForm = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [bio, setBio] = useState("");
  const [userType, setUserType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalBio, setOriginalBio] = useState("");

  const handleClearAvatarUrl = () => {
    setAvatarUrl("");
  };

  const handleClearAvatarAlt = () => {
    setAvatarAlt("");
  };

  const handleClearBannerUrl = () => {
    setBannerUrl("");
  };

  const handleClearBannerAlt = () => {
    setBannerAlt("");
  };

  const handleClearBio = () => {
    setBio("");
  };

  const handleEditForm = async (e) => {
    e.preventDefault();

    let newData = {
      bio: bio !== "" ? bio : originalBio,
      userType,
    };

    if (avatarUrl.trim() !== "") {
      newData.avatar = { url: avatarUrl };
      if (avatarAlt.trim() !== "") {
        newData.avatar.alt = avatarAlt;
      }
    }
    if (bannerUrl.trim() !== "") {
      newData.banner = { url: bannerUrl };
      if (bannerAlt.trim() !== "") {
        newData.banner.alt = bannerAlt;
      }
    }

    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;

      if (userType === "Venue Manager") {
        newData = { ...newData, venueManager: true };
      } else if (userType === "Guest") {
        newData = { ...newData, venueManager: false };
      }

      const username = localStorage.getItem("username");
      await updateProfile(username, newData, apiKey);
      console.log("Profile updated successfully");
      console.log(newData);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    }
  };

  const openModal = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        throw new Error("Username not found in local storage");
      }

      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      const profile = await getProfile(username, apiKey);

      setOriginalBio(profile.data.bio);
      setBio(profile.data.bio); // Set the bio to the current value from the profile

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload()
  };

  const handleSave = () => {
    console.log("Profile edited");
    // Add logic to save edited profile data


    
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
              className="close flex cursor-pointer justify-end text-2xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <form onSubmit={handleEditForm}>
              <h2 className="py-3 font-semibold uppercase text-violet-700">
                Edit Profile
              </h2>

              <div>
                <div className="relative mb-4 flex items-center text-lg">
                  <input
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    type="url"
                    name="avatarUrl"
                    placeholder="Avatar URL..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={handleClearAvatarUrl}
                    className="absolute right-0 top-0 mr-3 mt-2  cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center text-lg">
                  <input
                    value={avatarAlt}
                    onChange={(e) => setAvatarAlt(e.target.value)}
                    type="text"
                    name="avatarAlt"
                    placeholder="Avatar Alt Text..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={handleClearAvatarAlt}
                    className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center text-lg">
                  <input
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    type="url"
                    name="bannerUrl"
                    placeholder="Banner URL..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={handleClearBannerUrl}
                    className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className=" relative mb-4 flex items-center text-lg">
                  <input
                    value={bannerAlt}
                    onChange={(e) => setBannerAlt(e.target.value)}
                    type="text"
                    name="bannerAlt"
                    placeholder="Banner Alt Text..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={handleClearBannerAlt}
                    className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center text-lg">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    placeholder="Update Bio"
                    className="w-full rounded-xl border py-2 pl-3 pr-8 focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={handleClearBio}
                    className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="mb-3 flex gap-4">
                  <div>
                    <input
                      type="radio"
                      name="userType"
                      id="guestRadio"
                      checked={userType === "Guest"}
                      onChange={(e) => setUserType("Guest")}
                      className="form-radio mr-2"
                    />
                    <label htmlFor="guestRadio">Guest</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="venueManagerRadio"
                      name="userType"
                      checked={userType === "Venue Manager"}
                      onChange={(e) => setUserType("Venue Manager")}
                      className="form-radio mr-2"
                    />
                    <label htmlFor="venueManagerRadio">Venue Manager</label>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileForm;
