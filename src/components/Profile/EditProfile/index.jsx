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

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    }
  }, [isModalOpen]);

  const handleClearField = (setter) => {
    setter("");
    console.log("Field cleared");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Saving data...");

    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      const username = localStorage.getItem("username");

      let newData = {
        bio,
        userType,
        avatar: avatarUrl ? { url: avatarUrl, alt: avatarAlt } : undefined,
        banner: bannerUrl ? { url: bannerUrl, alt: bannerAlt } : undefined,
      };

      if (userType === "Venue Manager") {
        newData.venueManager = true;
      } else if (userType === "Guest") {
        newData.venueManager = false;
      }

      console.log("Data to be saved:", newData);
      await updateProfile(username, newData, apiKey);

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
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
      setBio(profile.data.bio);
      setUserType(profile.data.userType);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={openModal}
        className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:to-orange-500"
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
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <div
              className="modal-header flex items-center justify-between"
              style={{ marginBottom: "20px", position: "relative" }}
            >
              <h2 className="flex-1 py-3 text-center text-2xl font-semibold uppercase text-violet-700">
                Edit Profile
              </h2>
              <span
                className="close cursor-pointer text-3xl"
                onClick={closeModal}
                style={{ position: "absolute", right: "10px", top: "10px" }}
              >
                &times;
              </span>
            </div>

            <form onSubmit={handleSave}>
              <div>
                <div className="relative mb-4 flex items-center text-lg">
                  <input
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    type="url"
                    name="avatarUrl"
                    placeholder="Avatar URL..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none focus:bg-white  focus:border-violet-700"
                  />
                  <IoCloseOutline
                    size={24}
                    onClick={() => handleClearField(setAvatarUrl)}
                    className="absolute right-0 top-1 mr-3 mt-2  cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center text-lg">
                  <input
                    value={avatarAlt}
                    onChange={(e) => setAvatarAlt(e.target.value)}
                    type="text"
                    name="avatarAlt"
                    placeholder="Avatar Alt Text..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none focus:bg-white  focus:border-violet-700"
                  />
                  <IoCloseOutline
                    size={24}
                    onClick={() => handleClearField(setAvatarAlt)}
                    className="absolute right-0 top-1 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center text-lg">
                  <input
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    type="url"
                    name="bannerUrl"
                    placeholder="Banner URL..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none focus:bg-white  focus:border-violet-700"
                  />
                  <IoCloseOutline
                    size={24}
                    onClick={() => handleClearField(setBannerUrl)}
                    className="absolute right-0 top-1 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className=" relative mb-4 flex items-center text-lg">
                  <input
                    value={bannerAlt}
                    onChange={(e) => setBannerAlt(e.target.value)}
                    type="text"
                    name="bannerAlt"
                    placeholder="Banner Alt Text..."
                    className="w-full rounded-xl border py-2 pl-3 pr-12 focus:outline-none focus:bg-white  focus:border-violet-700"
                  />
                  <IoCloseOutline
                    size={24}
                    onClick={() => handleClearField(setBannerAlt)}
                    className="absolute right-0 top-1 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center text-lg">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    placeholder="Update Bio"
                    className="w-full rounded-xl border py-2 pl-3 pr-8 focus:outline-none focus:bg-white  focus:border-violet-700"
                  />
                  <IoCloseOutline
                    size={24}
                    onClick={() => handleClearField(setBio)}
                    className="absolute right-0 top-1 mr-3 mt-2 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="mb-3 flex gap-4">
                  <div>
                    <input
                      type="radio"
                      name="userType"
                      id="guestRadio"
                      checked={userType === "Guest"}
                      onChange={() => setUserType("Guest")}
                      className="mr-2 text-violet-700 checked:bg-violet-700 focus:ring-violet-700"
                    />
                    <label htmlFor="guestRadio">Guest</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="venueManagerRadio"
                      name="userType"
                      checked={userType === "Venue Manager"}
                      onChange={() => setUserType("Venue Manager")}
                      className="mr-2 text-violet-700 checked:bg-violet-700 focus:ring-violet-700"
                    />
                    <label htmlFor="venueManagerRadio">Venue Manager</label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 w-44 py-2 font-semibold uppercase hover:to-orange-500"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileForm;
