import { useEffect, useState } from "react";
import { createApiKey } from "../../../API/ApiKey";
import { createVenue } from "../../../API/Venue/createVenue";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { AiFillPlusCircle } from "react-icons/ai";

const CreateNewVenueForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState(""); 
  const [meta, setMeta] = useState([]);
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setprice] = useState("");
  const [rating, setRating] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");


  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    }
  }, [isModalOpen]);

  const handleCreateNewVenueForm = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (
      !name ||
      !description ||
      !address ||
      !postCode ||
      !city ||
      !country ||
      isNaN(price) ||
      isNaN(maxGuests)
    ) {
      alert("Please fill out all required fields");
      return;
    }

  

    // More advanced input validation can be added here

    let metaObject = {};
    meta.forEach((item) => {
      metaObject[item] = true;
    });

    let newData = {
      name,
      description,
      media,
      meta: metaObject,
      maxGuests: parseInt(maxGuests), // Parse maxGuests as a number
      price: parseFloat(price), // Parse price as a number
      rating,
      location: {
        address,
        postCode,
        city,
        country,
      },
    };

    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;

      await createVenue(newData, apiKey);
      console.log("Venue created successfully");
      console.log(newData);
    } catch (error) {
      console.error("Error creating new venue:", error);
      alert("Failed to create venue. Please try again later.");
    }
  };

  const handleClearField = (setter) => {
    setter("");
    console.log("clicked")
  };
  const handleClearMedia = (index) => {
    removeMediaAtIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("Save button clicked");
    // Add logic to save venue data
    // closeModal();
  };

  const handleCheckboxChangeMeta = (option) => {
    if (meta.includes(option)) {
      setMeta(meta.filter((item) => item !== option));
    } else {
      setMeta([...meta, option]);
    }
  };

  const handleMediaChangeAtIndex = (e, index) => {
    const newMediaUrl = e.target.value;
    const updatedMedia = [...media];
    updatedMedia[index] = { url: newMediaUrl };
    setMedia(updatedMedia);
  };

  const handleAddMedia = () => {
    if (newImageUrl.trim() !== "") {
      setMedia([...media, { url: newImageUrl }]);
      setNewImageUrl("");
    }
  };

  const removeMediaAtIndex = (index) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={openModal}
        className="flex items-center gap-1"
      >
        <AiFillPlusCircle size={30} className="text-violet-700"/>
  
        <p className="text-violet-700 hover:underline">add venue</p>
      </button>
     
      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            overflow: "auto", 
          }}
        >
          <div
            className="modal-content"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "600px",
              
              maxHeight: "100vh", 
              overflowY: "auto" // Enables scrolling within the modal content
            }}
          >
            <span
              className=" flex cursor-pointer justify-end text-3xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <form onSubmit={handleCreateNewVenueForm}>
              <h2 className=" mb-5 text-center text-xl font-semibold uppercase text-violet-700">
               Create a new venue
              </h2>
              <div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Title.."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                    <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setName)}
                    className="absolute right-3  cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="description"
                    placeholder="Description.."
                    className="w-full rounded-xl border py-2 pl-3 pr-10 focus:outline-none"
                  />
                           <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setDescription)}
                    className="absolute right-3 top-0  cursor-pointer text-gray-800"
                  />
                </div>

                <div>
                  {media.map((item, index) => (
                    <div
                      key={index}
                      className="mb-4 flex items-center justify-between"
                    >
                      <input
                        value={item.url}
                        onChange={(e) => handleMediaChangeAtIndex(e, index)}
                        type="url"
                        name={`url-${index}`}
                        placeholder="Image URL.."
                        className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                      />
                      
                      <button
                        type="button"
                        onClick={() => removeMediaAtIndex(index)}
                        className="rounded-full bg-gradient-to-t from-red-300 to-red-400 w-36 ms-2 py-1 font-semibold uppercase hover:from-red-400 hover:to-red-500 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="relative mb-4 flex items-center">
                    <input
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      type="url"
                      placeholder="New Image URL..."
                      className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                    />
               
                    <button
                      type="button"
                      onClick={handleAddMedia}
                      className="whitespace-nowrap rounded-full bg-gradient-to-t from-orange-300 to-orange-400  w-36 ms-2 py-1 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
                    >
                      Add Image
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex gap-5">
                    <div className="mb-4 flex items-center ">
                      <input
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        type="number"
                        name="price"
                        placeholder="Price.."
                        className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                      />
                    </div>
                    <div className="mb-4 flex items-center ">
                      <input
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        type="number"
                        name="maxGuests"
                        placeholder="Max guests.."
                        className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex flex-col">
                  <p>[x] This Venue offers</p>
                  <div className="mr-3 flex justify-between">
                    <div>
                      <input
                        type="checkbox"
                        id="wifi"
                        name="meta"
                        checked={meta.includes("wifi")}
                        onChange={() => handleCheckboxChangeMeta("wifi")}
                        className="mr-2"
                      />
                      <label htmlFor="wifi">Wifi</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="pets"
                        name="meta"
                        checked={meta.includes("pets")}
                        onChange={() => handleCheckboxChangeMeta("pets")}
                        className="mr-2"
                      />
                      <label htmlFor="pets">Pets</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="parking"
                        name="parking"
                        checked={meta.includes("parking")}
                        onChange={() => handleCheckboxChangeMeta("parking")}
                        className="mr-2"
                      />
                      <label htmlFor="parking">Parking</label>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        id="breakfast"
                        name="meta"
                        checked={meta.includes("breakfast")}
                        onChange={() => handleCheckboxChangeMeta("breakfast")}
                        className="mr-2"
                      />
                      <label htmlFor="breakfast">Breakfast</label>
                    </div>
                  </div>
                </div>

                <h3 className=" mb-2 text-lg font-semibold uppercase text-violet-700">
                  Location
                </h3>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    placeholder="Address..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                           <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setAddress)}
                    className="absolute right-3  cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    type="text"
                    name="postCode"
                    placeholder="Post code..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                           <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setPostCode)}
                    className="absolute right-3  cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    name="city"
                    placeholder="City..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                             <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setCity)}
                    className="absolute right-3  cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    name="country"
                    placeholder="Country..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                             <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(set)}
                    className="absolute right-3  cursor-pointer text-gray-800"
                  />
                </div>
                <div className="mb-4 flex flex-col text-lg">
                  <p>[x] Select your rating for the venue</p>
                  <div className="mr-3 flex justify-between">
                    <div>
                      <input
                        type="checkbox"
                        id="1"
                        name="rating"
                        checked={rating === 1}
                        onChange={() => setRating(1)}
                        className="mr-2"
                      />
                      <label htmlFor="rating">1</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="2"
                        name="rating"
                        checked={rating === 2}
                        onChange={() => setRating(2)}
                        className="mr-2"
                      />
                      <label htmlFor="rating">2</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="3"
                        name="rating"
                        checked={rating === 3}
                        onChange={() => setRating(3)}
                        className="mr-2"
                      />
                      <label htmlFor="rating">3</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="4"
                        name="rating"
                        checked={rating === 4}
                        onChange={() => setRating(4)}
                        className="mr-2"
                      />
                      <label htmlFor="rating">4</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="5"
                        name="rating"
                        checked={rating === 5}
                        onChange={() => setRating(5)}
                        className="mr-2"
                      />
                      <label htmlFor="rating">5</label>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: "relative", textAlign: "center" }}>
                <button
                  onClick={handleSave}
                  className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewVenueForm;
