import { useState } from "react";

const CreateNewVenueForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [meta, setMeta] = useState([]);
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setprice] = useState("");
  const [rating, setRating] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleCreateNewVenueForm = async (e) => {
    e.preventDefault();

    let newData = {
      name,
      description,
      imageUrls,
      meta,
      maxGuests,
      price,
      rating,
      address,
      postCode,
      city,
      country,
    };
    console.log(newData);
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

  const handleAddImageUrl = () => {
    // Clone the existing imageUrls array and append an empty string for a new URL
    setImageUrls([...imageUrls, ""]);
  };

  const handleImageUrlChange = (index, value) => {
    // Update the corresponding image URL in the array
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = value;
    setImageUrls(updatedImageUrls);
  };

  const handleCheckboxChangeMeta = (option) => {
    if (meta.includes(option)) {
      setMeta(meta.filter((item) => item !== option));
    } else {
      setMeta([...meta, option]);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={openModal}
        className="mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-2 py-2 text-sm font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
      >
        Create new venue
      </button>
      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "140vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            className="modal-content"
            style={{
              position: "absolute",
              top: "36%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <span
              className="close flex cursor-pointer justify-end text-2xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <form onSubmit={handleCreateNewVenueForm}>
              <h2 className=" mb-2 text-center text-xl font-semibold uppercase text-violet-600">
                Create new venue
              </h2>
              <div>
                <div className="mb-4 flex items-center">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Title.."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="description"
                    placeholder="Description.."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                </div>
                <div>
                  <div className="flex flex-col ">
                    <div className="mb-4 flex items-center justify-between">
                      <label>
                        Upload images{" "}
                        <p className="text-xs">
                          (ex. https://images.unsplash.com/photo-1579 )
                        </p>
                      </label>
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-1 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
                      >
                        Add
                      </button>
                    </div>

                    <div className="mb-3">
                      {imageUrls.map((url, index) => (
                        <input
                          key={index}
                          value={url}
                          onChange={(e) =>
                            handleImageUrlChange(index, e.target.value)
                          }
                          type="url"
                          placeholder={`Image URL ${index + 1}`}
                          className="mb-2 w-full rounded-xl border py-1 pl-3 focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-5">
                    <div className="mb-4 flex items-center ">
                      <input
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        type="text"
                        name="price"
                        placeholder="Price.."
                        className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                      />
                    </div>
                    <div className="mb-4 flex items-center ">
                      <input
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        type="text"
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

                <h3 className="mb-2 text-lg font-semibold uppercase text-violet-600">
                  Location
                </h3>
                <div className="mb-4 flex items-center">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    placeholder="Address..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    type="text"
                    name="postCode"
                    placeholder="Post code..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    name="city"
                    placeholder="City..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    name="country"
                    placeholder="Country..."
                    className="w-full rounded-xl border py-1 pl-3 focus:outline-none"
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
                        checked={rating === "1"}
                        onChange={() => setRating("1")}
                        className="mr-2"
                      />
                      <label htmlFor="rating">1</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="2"
                        name="rating"
                        checked={rating === "2"}
                        onChange={() => setRating("2")}
                        className="mr-2"
                      />
                      <label htmlFor="rating">2</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="3"
                        name="rating"
                        checked={rating === "3"}
                        onChange={() => setRating("3")}
                        className="mr-2"
                      />
                      <label htmlFor="rating">3</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="4"
                        name="rating"
                        checked={rating === "4"}
                        onChange={() => setRating("4")}
                        className="mr-2"
                      />
                      <label htmlFor="rating">4</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="5"
                        name="rating"
                        checked={rating === "5"}
                        onChange={() => setRating("5")}
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
