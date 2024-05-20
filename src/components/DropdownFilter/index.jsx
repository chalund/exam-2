import React, { useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FilterDropdown = ({ filter, setFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (value) => {
        setFilter(value);
        setIsOpen(false);
    };

    const options = [
   
        { value: 'newest', label: 'Sort by Newest' },
        { value: 'oldest', label: 'Sort by Oldest' },
        { value: 'price-low-high', label: 'Sort by Price: Low to High' },
        { value: 'price-high-low', label: 'Sort by Price: High to Low' },
        { value: 'a-z', label: 'Sort From: A to Z' },
        { value: 'z-a', label: 'Sort From: Z to A' },
    ];

    return (
        <div className="relative inline-block text-left">
           <div className="flex items-center">
                <button
                    onClick={toggleDropdown}
                    className="py-2 px-4 bg-white rounded-lg flex items-center focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                    {options.find(option => option.value === filter)?.label || 'Filter'}
                    {!isOpen ? (
                        <IoIosArrowDown className='ml-3' />
                    ) : (
                        <IoIosArrowUp className='ml-3' />
                    )}
                </button>
            </div>
            {isOpen && (
                <div ref={dropdownRef} className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-1">
                        {options.map((option, index) => (
                            <li key={index} className={`px-4 py-2 cursor-pointer ${option.disabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-orange-400'}`}
                                onClick={() => !option.disabled && handleOptionClick(option.value)}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
