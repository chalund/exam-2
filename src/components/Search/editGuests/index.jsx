import { useState } from "react";
import { IoClose } from "react-icons/io5";

const EditGuestForm = ({ onClose }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleIncrement = (type) => {
    switch (type) {
      case "adults":
        setAdults(adults + 1);
        break;
      case "children":
        setChildren(children + 1);
        break;
      case "rooms":
        setRooms(rooms + 1);
        break;
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case "adults":
        setAdults(adults > 0 ? adults - 1 : 0);
        break;
      case "children":
        setChildren(children > 0 ? children - 1 : 0);
        break;
      case "rooms":
        setRooms(rooms > 0 ? rooms - 1 : 0);
        break;
      default:
        break;
    }
  };

  const handleCloseButton = () => {
    console.log("Close button clicked");
    onClose();
  };

  return (
    <div className="relative border bg-white p-4">
      <form>
        <IoClose
          size={30}
          onClick={handleCloseButton}
          className="absolute right-0 top-0 mr-2 mt-2"
        />
        <h1 className="py-2 text-center text-lg font-bold text-violet-600">
          Edit guests
        </h1>
        <div className="flex justify-between py-1">
          <p>Adults</p>
          <div>
            <button
              type="button"
              className="rounded-full border border-violet-600 px-2"
              onClick={() => handleDecrement("adults")}
            >
              -
            </button>
            <input
              type="text"
              value={adults}
              readOnly
              className="mx-2 max-w-6 text-center focus:outline-none"
            />
            <button
              type="button"
              className="rounded-full border border-violet-600 px-2"
              onClick={() => handleIncrement("adults")}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between py-1">
          <p>Children</p>
          <div>
            <button
              type="button"
              className="rounded-full border border-violet-600 px-2"
              onClick={() => handleDecrement("children")}
            >
              -
            </button>
            <input
              type="text"
              value={children}
              readOnly
              className="mx-2 max-w-6 text-center focus:outline-none"
            />
            <button
              type="button"
              className="rounded-full border border-violet-600 px-2"
              onClick={() => handleIncrement("children")}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between py-1">
          <p>Rooms</p>
          <div>
            <button
              type="button"
              className="rounded-full border border-violet-600 px-2"
              onClick={() => handleDecrement("rooms")}
            >
              -
            </button>
            <input
              type="text"
              value={rooms}
              readOnly
              className="mx-2 max-w-6 text-center focus:outline-none"
            />
            <button
              type="button"
              className="rounded-full border border-violet-600 px-2"
              onClick={() => handleIncrement("rooms")}
            >
              +
            </button>
          </div>
        </div>
        <button className="mx-auto mt-4 block w-3/4 rounded-xl border bg-violet-600 py-2 text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditGuestForm;
