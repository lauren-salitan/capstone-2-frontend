import React, { useState } from 'react';
import axios from 'axios';
import Thermometer from './Thermometer'; 

function WeatherForm() {
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCoordinates({ ...coordinates, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!coordinates.latitude || !coordinates.longitude) {
            setError('Please enter valid coordinates.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.get(`/api/weather?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
            setWeather(response.data);
        } catch (err) {
            setError('Failed to fetch weather data');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="latitude"
                    value={coordinates.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                />
                <input
                    type="text"
                    name="longitude"
                    value={coordinates.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                />
                <button type="submit">Get Weather</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h3>Weather Data</h3>
                    <p>Temperature: {weather.temperature}°F</p>
                    <Thermometer latitude={coordinates.latitude} longitude={coordinates.longitude} temperature={weather.temperature} />
                </div>
            )}
        </div>
    );
}

export default WeatherForm;
