import { useState } from "react";
import { IoClose } from "react-icons/io5";


const EditGuestForm = ({ onClose }) => {
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    const handleIncrement = (type) => {
        switch (type) {
            case 'adults':
                setAdults(adults + 1);
                break;
            case 'children':
                setChildren(children + 1);
                break;
            case 'rooms':
                setRooms(rooms + 1);
                break;
            default:
                break;
        }
    };

    const handleDecrement = (type) => {
        switch (type) {
            case 'adults':
                setAdults(adults > 0 ? adults - 1 : 0);
                break;
            case 'children':
                setChildren(children > 0 ? children - 1 : 0);
                break;
            case 'rooms':
                setRooms(rooms > 0 ? rooms - 1 : 0);
                break;
            default:
                break;
        }
    };

    const handleCloseButton = () => {
        console.log('Close button clicked');
        onClose(); 
     
    }

    

    return (
        <div className='bg-white border relative p-4'>
            <form>
                <IoClose size={30} 
                onClick={handleCloseButton}
                className="absolute top-0 right-0 mt-2 mr-2"
                />
                <h1 className="text-center py-2 text-violet-600 text-lg font-bold">Edit guests</h1>
                <div className="flex justify-between py-1">
                    <p>Adults</p>
                    <div>
                        <button type="button" className='border border-violet-600 rounded-full px-2' onClick={() => handleDecrement('adults')}>-</button>
                        <input type="text" value={adults} readOnly className='max-w-6 text-center mx-2 focus:outline-none'/>
                        <button type="button" className='border border-violet-600 rounded-full px-2' onClick={() => handleIncrement('adults')}>+</button>
                    </div>
                </div>
                <div className="flex justify-between py-1">
                    <p>Children</p>
                    <div>
                        <button type="button" className='border border-violet-600 rounded-full px-2' onClick={() => handleDecrement('children')}>-</button>
                        <input type="text" value={children} readOnly className='max-w-6 text-center mx-2 focus:outline-none' />
                        <button type="button" className='border border-violet-600 rounded-full px-2' onClick={() => handleIncrement('children')}>+</button>
                    </div>
                </div>
                <div className="flex justify-between py-1">
                    <p>Rooms</p>
                    <div>
                        <button type="button" className='border border-violet-600 rounded-full px-2' onClick={() => handleDecrement('rooms')}>-</button>
                        <input type="text" value={rooms} readOnly className='max-w-6 text-center mx-2 focus:outline-none'/>
                        <button type="button" className='border border-violet-600 rounded-full px-2' onClick={() => handleIncrement('rooms')}>+</button>
                    </div>
                </div>
                <button className="border rounded-xl bg-violet-600 text-white py-2 w-3/4 mt-4 mx-auto block">Save</button>
            </form>
        </div>
     
    );
};

export default EditGuestForm;
