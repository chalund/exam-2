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
                <div className="border bg-white relative">
                    <form>
                        <IoClose size={30} className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer" />
                        <h1 className="text-center text-violet-600 font-bold text-lg">Edit your search</h1>

                        <div className="relative flex justify-center mt-4">
                            <FaBed size={20} className="absolute top-1/2 transform -translate-y-1/2 left-16 text-gray-800" />
                            <input
                                type="text"
                                className="border border-gray-300 rounded-xl pl-8 pr-4 py-1 w-3/4 focus:outline-none cursor-pointer"
                                
                            />
                        </div>
                        <div className="relative flex justify-center mt-4">
                            <AiOutlineUser size={20} className="absolute top-1/2 transform -translate-y-1/2 left-16 text-gray-800" />
                            <input
                                type="text"
                                className="border border-gray-300 rounded-xl pl-8 pr-4 py-1 w-3/4 focus:outline-none cursor-pointer"
                                onClick={handleInputUserClick}
                            />
                        </div>
                    
                        <button className="border rounded-xl bg-violet-600 text-white py-2 w-3/4 mt-4 mx-auto block">Save</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditYourSearch;
