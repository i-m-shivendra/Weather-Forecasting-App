import React from 'react';

const WeatherDisplay = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, dt } = data;
    const date = new Date(dt * 1000).toLocaleString();

    return (
        <div className="card text-center shadow-lg p-3">
            <div className="card-body">
                <h3 className="card-title mb-3">{name}</h3>
                <p className="card-text text-capitalize">{weather[0].description}</p>
                <h4 className="card-text">Temperature: {main.temp} °C</h4>
                <h5 className="card-text">Humidity: {main.humidity} %</h5>
                <p className="card-text"><small>Time: {date}</small></p>
            </div>
        </div>
    );
};

export default WeatherDisplay;
