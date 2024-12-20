import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setSearchQuery }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault()
        setInputValue(e.target.value);


        const debounceTimer = setTimeout(() => {
            setSearchQuery(e.target.value);
        }, 0); // Delay of 300ms

        // Clear previous timer
        return () => clearTimeout(debounceTimer);
    };

    return (
        <div className="relative w-full md:w-1/2">
            <input
                type="text"
                placeholder="Search products..."
                value={inputValue}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute top-4 left-3 text-gray-500 text-xl" />
        </div>
    );
};

export default SearchBar;
