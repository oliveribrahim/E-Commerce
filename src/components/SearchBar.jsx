import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

export default function SearchBar() {
    const [inputValue, setInputValue] = useState("");
    const { searchTerm, setSearchTerm } = useSearch();
    const navigate = useNavigate();

    // Sync input value with context searchTerm
    useEffect(() => {
        setInputValue(searchTerm);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            setSearchTerm(trimmedValue);
            navigate("/products");
        } else {
            setSearchTerm("");
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        // Real-time search - updates as you type
        setSearchTerm(value.trim());
    };

    const handleClear = () => {
        setInputValue("");
        setSearchTerm("");
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {/* Search Icon */}
                <svg 
                    className="absolute left-3 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                {/* Clear Button (shows when there's text) */}
                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
}