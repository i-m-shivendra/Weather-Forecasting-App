import React, { useState, useEffect } from "react";
import CityAutoSuggest from "./CityAutoSuggest";
import WeatherDisplay from "./WeatherDisplay";
import Loader from "./Loader";
import ErrorMessage from "./Error"; 

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_KEY = "44648f810c5062baf0a7019a20e6384f";

    useEffect(() => {
        const fetchWeather = async () => {
            if (!city) return;

            setLoading(true);
            setError("");
            setWeatherData(null);

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error("City not found or API error"); // This Error will now work correctly
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) { // changed parameter from 'error' to 'err' to avoid conflict
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city, API_KEY]);

    return (
        <div className="text-center">
            <div className="text-center mb-4">
                <h1>Weather APP ☀️</h1>
            </div>

            <div
                className="w-100 p-4 bg-white shadow rounded"
                style={{ maxWidth: "500px", margin: "0 auto" }}
            >
                <CityAutoSuggest onCityChange={setCity} />
                {loading && <Loader />}
                {error && <ErrorMessage message={error} />}
                {weatherData && <WeatherDisplay data={weatherData} />}
            </div>
        </div>
    );
};

export default Weather;
