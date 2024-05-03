import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberOutline } from "react-icons/io5";

const EditVenueLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guest, setGuest] = useState(2);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("guests number", guest);
    console.log("start date", startDate);
    console.log("end date", endDate);
    // Add logic to save edited profile data
    // closeModal();
  };

  const handleEditVenueLink = async (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={openModal}
        className="uppercase text-violet-600 underline"
      >
        Book your stay
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
              maxWidth: "500px",
            }}
          >
            <span
              className="close flex cursor-pointer justify-end text-2xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <form onSubmit={handleEditVenueLink} className="">
              <h2 className="mb-4 py-3 text-center text-lg font-bold uppercase text-violet-600">
                Edit Search
              </h2>
              <div className="mb-3 flex items-center justify-between">
                <p>Select check-in</p>
                <div className="w-46 flex items-center gap-2 rounded-xl border py-1 pl-3">
                  <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <p>Select check-out</p>
                <div className="w-46 flex items-center gap-2 rounded-xl border py-1 pl-3">
                  <DatePicker
                    showIcon
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <p>Number of Guests</p>
                <input
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                  name="guests"
                  type="number"
                  className="w-46 rounded-xl border py-2 pl-5 pr-7"
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="my-5 w-44 rounded-xl bg-violet-600 py-2 text-lg uppercase text-white"
                  onClick={handleSave}
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

export default EditVenueLink;
