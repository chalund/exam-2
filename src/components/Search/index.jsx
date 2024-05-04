import { useState } from "react";
import { FaBed } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import EditGuestForm from "./editGuests";
import { AiOutlineUser } from "react-icons/ai";

const EditYourSearch = () => {
  const [isGuestFormVisible, setIsGuestFormVisible] = useState(false);

  const handleInputUserClick = () => {
    setIsGuestFormVisible(true);
  };

  return (
    <>
      {isGuestFormVisible ? (
        <EditGuestForm onClose={() => setIsGuestFormVisible(false)} />
      ) : (
        <div className="relative border bg-white">
          <form>
            <IoClose
              size={30}
              className="absolute right-0 top-0 mr-2 mt-2 cursor-pointer"
            />
            <h1 className="text-center text-lg font-bold text-violet-700">
              Edit your search
            </h1>

            <div className="relative mt-4 flex justify-center">
              <FaBed
                size={20}
                className="absolute left-16 top-1/2 -translate-y-1/2 transform text-gray-800"
              />
              <input
                type="text"
                className="w-3/4 cursor-pointer rounded-xl border border-gray-300 py-1 pl-8 pr-4 focus:outline-none"
              />
            </div>
            <div className="relative mt-4 flex justify-center">
              <AiOutlineUser
                size={20}
                className="absolute left-16 top-1/2 -translate-y-1/2 transform text-gray-800"
              />
              <input
                type="text"
                className="w-3/4 cursor-pointer rounded-xl border border-gray-300 py-1 pl-8 pr-4 focus:outline-none"
                onClick={handleInputUserClick}
              />
            </div>

            <button className="mx-auto mt-4 block w-3/4 rounded-xl border bg-violet-700 py-2 text-white">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditYourSearch;
