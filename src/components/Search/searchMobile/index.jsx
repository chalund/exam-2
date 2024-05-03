import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";

const EditVenueLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guest, setGuest] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("guests number", guest);
    // Add logic to save edited profile data
    // closeModal();
  };

  const handleEditVenueLink = async (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={openModal} className="text-violet-600 underline">
        Edit Link
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
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            <span
              className="close flex cursor-pointer justify-end text-2xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <form onSubmit={handleEditVenueLink} className="mx-6">
              <h2 className="py-3 text-center text-lg font-bold uppercase text-violet-600">
                Edit Search
              </h2>
              

              <div className="relative mb-4 flex items-center ">
  <div className="relative">
    <span className="absolute inset-y-0 left-2 flex items-center pl-2 text-gray-600">Guests:</span>
    <input
      value={guest}
      onChange={(e) => setGuest(e.target.value)}
      name="guests"
      type="number"
      placeholder="Enter number of guests"
      className="w-full rounded-xl border py-2 pl-20 pr-12 focus:outline-none"
    />
  </div>
</div>


              <button
                onClick={handleSave}
                className="mb-5 w-full rounded-xl bg-violet-600 py-2 text-lg uppercase text-white"
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

export default EditVenueLink;
