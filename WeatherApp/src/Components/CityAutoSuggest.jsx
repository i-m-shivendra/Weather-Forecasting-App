import React, { useEffect, useState } from 'react';
import axios from 'axios'; // You missed importing axios!

const API_KEY = "44648f810c5062baf0a7019a20e6384f";

const CityAutoSuggest = ({ onCityChange }) => {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            if (!input) return;

            if (input.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
                );

                setSuggestions(response.data);
            } catch (error) {
                console.log("Error fetching city suggestions:", error);
            }
        };

        const timer = setTimeout(() => {
            fetchCities();
        }, 500);

        return () => clearTimeout(timer);
    }, [input]);

    const handleSelect = (city) => {
        setInput(city.name);
        setSuggestions([]);
        onCityChange(city.name);
    };

    return (
        <div className="mb-3 position-relative">
            <input
                type="text"
                className="form-control"
                placeholder="Enter city name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 10 }}>
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSelect(city)}
                            style={{ cursor: 'pointer' }}
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CityAutoSuggest;
